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
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

export default function Layout({ children }: any) {
  const router = useRouter();
  const dispatch = useDispatch();

  // theme
  const [theme, setTheme]: any = useState("light");
  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") setTheme("dark");
    if (theme === "light") setTheme("light");
  }, []);
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  // auth
  const { data: session } = useSession();
  const { user, accessToken: token } = useSelector((store: any) => store.auth);
  useEffect(() => {
    if (!session) return;
    const { user } = session;
    const credentials = { user };
    dispatch(setCredentials(credentials));
  }, [session, dispatch]);
  // if no token, refresh the token (general)
  // useEffect(() => {
  //   if (session) return;
  //   console.log({ token });
  //   if (!token) refreshAuth(dispatch);
  // }, [token, dispatch]);

  // cart
  const cart = useSelector((store: any) => store.cart);
  useEffect(() => {
    // 로컬스토리지에서 카트정보를 가져와서
    const serializedCart = localStorage.getItem("cart");
    if (!serializedCart) return;
    const parsedCart = JSON.parse(serializedCart);
    if (!parsedCart.products.length) {
      return;
    }

    // 리덕스스토어에 저장한다.
    dispatch(reloadCart(parsedCart));
  }, [dispatch]);
  useEffect(() => {
    // 리덕스스토어에서 카트정보를 가져와서
    if (!cart.products?.length) return localStorage.removeItem("cart");
    const serializedCart: any = JSON.stringify(cart);

    // 로컬스토리지에 저장한다.
    localStorage.setItem("cart", serializedCart);
  }, [cart]);

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
