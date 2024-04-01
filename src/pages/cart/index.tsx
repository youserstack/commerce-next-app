import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reloadCart } from "lib/client/store/cartSlice";
import { getData } from "lib/client/utils/fetchData";
import styled from "styled-components";
import { toast } from "react-toastify";
import Cart from "@/components/cart/Cart";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export async function getServerSideProps({ req, res, query }: any) {
  console.log(`\x1b[32m\n[serverside]:::[${req.url}]:::[${req.method}]\x1b[30m`);

  // get the User id from session
  const session = await getServerSession(req, res, authOptions);
  // if (!session) {
  //   return {
  //     redirect: {
  //       destination: "/auth/signin",
  //       permanent: false,
  //     },
  //   };
  // }

  return { props: { session } };
}

export default function Page({ session }: any) {
  // external
  const dispatch = useDispatch();
  const auth = useSelector((store: any) => store.auth);
  const cart = useSelector((store: any) => store.cart);

  // internal
  const router = useRouter();
  const [total, setTotal]: any = useState(0);

  // const handleOrder = (e: any) => {
  //   e.preventDefault();
  //   if (!auth.accessToken) {
  //     toast.error("You have to log in");
  //     return router.push("/auth/signin");
  //   }
  //   // const { address, mobile } = data;
  //   // const payload = {
  //   //   address,
  //   //   mobile,
  //   //   cart,
  //   //   total,
  //   // };
  //   // dispatch(addOrder(payload));
  //   router.push("/order");
  // };

  useEffect(() => {
    const getCartFromStorage = () => {
      const serializedCart: any = localStorage.getItem("cart");
      const parsedCart = JSON.parse(serializedCart);
      return parsedCart;
    };
    const fetchLatestData = async (products: any) => {
      let latestProducts: any = [];

      for (const product of products) {
        try {
          const response = await getData(`products/${product._id}`);
          const latestProduct = response.data.product;
          if (!latestProduct) return toast.error("No product");

          // in stock
          if (latestProduct.stock)
            latestProducts.push({ ...latestProduct, options: product.options });
          // out stock
          else toast.error(`${latestProduct.name} product is out stock.`);
        } catch (error: any) {
          toast.error(error.message);
        }
      }

      return latestProducts;
    };

    // 로컬스토리지에서 리덕스스토어로 데이터를 채운다.
    const cart = getCartFromStorage();
    if (!cart || !cart.products.length) return;

    // 최신화된 데이터를 서버에서 가져온다.
    fetchLatestData(cart.products)
      // 서버로부터 최신화된 데이터를 클라이언트 리덕스스토어에 저장한다.
      .then((latestProducts: any) => {
        dispatch(reloadCart({ products: latestProducts }));
      });
  }, []);

  useEffect(() => {
    const handleSetTotal = () => {
      if (cart.products?.length)
        setTotal(
          cart.products.reduce((a: any, v: any) => {
            const optionsTotal = v.options.reduce((a: any, v: any) => a + v.price * v.quantity, 0);
            return a + optionsTotal;
          }, 0)
        );
    };
    handleSetTotal();
  }, [cart]);

  const handleLog = () => {
    if (cart.products?.length) console.log({ "cart.products": cart.products });
  };
  useEffect(handleLog, [cart.products]);

  // useEffect(() => {
  //   // console.log({ session });
  //   // console.log({ isSession: session ? true : false });
  // }, [session]);

  if (!cart.products?.length) {
    return (
      <Main className="cart-page">
        <section>
          <div className="cart">
            <h1>No cart items</h1>
          </div>
        </section>
      </Main>
    );
  }

  return (
    <Main className="cart-page">
      <section>
        <div className="cart-list-outer">
          <h1 className="cart-title box">Shopping Cart</h1>
          <ul className="cart-list">
            {cart.products.map((product: any, index: number) => (
              <Cart key={index} product={product} />
            ))}
          </ul>
          <h3 className="cart-total box">Total (총합) : ${total}</h3>
        </div>
      </section>
    </Main>
  );
}

const Main = styled.main`
  .cart-list-outer {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .cart-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .cart-title,
    .cart-total {
      height: 3rem;

      display: flex;
      align-items: center;

      border-width: 1px;
      border-style: solid;
      border-radius: 5px;

      padding: 1rem;
    }

    .cart-total {
      justify-content: flex-end;
    }
  }

  @media (max-width: 800px), (width <= 800px) {
    .cart-content-main {
      flex-direction: column;

      .partition {
        border-bottom: 1px solid #689f38;
        margin: 1rem 0;
      }
    }
  }

  @media (max-width: 500px), (width <= 500px) {
    .cart-content-main {
      .cart-content-info a {
        display: flex;
        flex-direction: column;
        .image {
          width: 100%;
        }
      }
    }
  }
`;
