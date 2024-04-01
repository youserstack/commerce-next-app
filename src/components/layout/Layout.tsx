import Background from "@/components/layout/Background";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Loading from "@/components/layout/Loading";
import Modal from "@/components/layout/Modal";
import NavSideAccountMenu from "@/components/layout/NavSideAccountMenu";
import NavSideProductMenu from "@/components/layout/NavSideProductMenu";
import { GlobalStyled } from "@/styles/global.styled";
import { setCredentials } from "lib/client/store/authSlice";
import { reloadCart } from "lib/client/store/cartSlice";
import { refreshAuth } from "lib/client/utils/authUtils";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { ThemeProvider } from "styled-components";

export default function Layout({ children }: any) {
  const router = useRouter();
  const dispatch = useDispatch();

  // theme
  const [theme, setTheme]: any = useState("dark");
  const toggleTheme = () => {
    const newState = theme === "dark" ? "light" : "dark";
    setTheme(newState);
    localStorage.setItem("theme", newState);
  };
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") setTheme("dark");
    if (theme === "light") setTheme("light");
  }, []);

  // auth
  const { data: session } = useSession();
  const { user, accessToken: token } = useSelector((store: any) => store.auth);
  // nextauth library를 사용한 인증(jwt, oauth)
  // general authentication & authorization (jwt)ㅔ
  // set the credentials from session (nextauth)
  useEffect(() => {
    if (!session) return;
    // console.log({ session });
    const { user } = session;
    const credentials = { user };
    dispatch(setCredentials(credentials));
  }, [session, dispatch]);
  // if no token, refresh the token (general)
  useEffect(() => {
    if (session) return;
    if (!token) refreshAuth(dispatch);
  }, [token, dispatch]);

  // cart
  const cart = useSelector((store: any) => store.cart);
  useEffect(
    // storage > store
    () => {
      const getCartFromStorage = () => {
        const serializedCart: any = localStorage.getItem("cart");
        const parsedCart = JSON.parse(serializedCart);
        // if (!serializedCart || !parsedCart.products.length)
        //   return console.log("No cached cart data");
        return parsedCart;
      };

      // get the cart data from storage
      const cart = getCartFromStorage();
      if (!cart || !cart.products.length) return;

      // set the store
      dispatch(reloadCart(cart));
    },
    [dispatch]
  );
  useEffect(
    // store > storage
    () => {
      if (!cart.products?.length) return localStorage.removeItem("cart");

      // set the storage
      const serializedCart: any = JSON.stringify(cart);
      localStorage.setItem("cart", serializedCart);
    },
    [cart]
  );

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Head>

      <GlobalStyled theme={theme} />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      {router.pathname === "/" ? null : <Loading />}
      <Background />
      <NavSideProductMenu />
      <NavSideAccountMenu theme={theme} toggleTheme={toggleTheme} />
      {/* {router.pathname === "/auth/signin" ? null : <Header />} */}

      <Modal />

      <Header />
      {children}
      <Footer />
    </>
  );
}
