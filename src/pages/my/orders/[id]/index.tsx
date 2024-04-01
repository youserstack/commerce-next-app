import Paypal from "@/components/button/Paypal";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import axios from "axios";
import Order from "lib/server/models/Order";
import User from "lib/server/models/User";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import useSWR from "swr";

// export async function getServerSideProps({ req, res, query }: any) {
//   console.log(`\x1b[33m\n[serverside]:::[${req.url}]:::[${req.method}]\x1b[30m`);
//   console.log({ query });

//   // get the User id from session
//   const session = await getServerSession(req, res, authOptions);
//   if (!session) {
//     return {
//       redirect: {
//         destination: "/auth/signin",
//         permanent: false,
//       },
//     };
//   }
//   const { _id }: any = session.user;

//   // find the Order
//   const order = await Order.findById(query.id);

//   return { props: { order: JSON.parse(JSON.stringify(order)) } };
// }

export default function Page() {
  // const order = useSelector((store: any) => store.order);
  const auth = useSelector((store: any) => store.auth);
  const router = useRouter();
  const { id } = router.query;
  // const { product } = order;
  // find the order
  // const order = orders.find((order: any) => order._id === id);
  // console.log("order : ", order);

  const fetcher = (url: any) =>
    axios.get(url, { params: router.query }).then((res: any) => res.data);
  const { data, error, isLoading } = useSWR("/api/v2/orders", fetcher);

  if (isLoading) return null;
  // if (!auth.accessToken || !order) return null;
  return (
    <Main className="order-[id]-page">
      <section>
        <div>
          <button onClick={() => router.back()}>Go Back</button>
          {/* <div className="order">
            <h3 className="title">Order Number : {order.product._id}</h3>
            <div className="delivery-info">
              <h3>Delivery Information</h3>
              <p>
                Delivered Status : {order.delivered ? "delivered" : "Not delivered"}
                {auth.role === "user" && <button>Change to Delivered</button>}
              </p>
            </div>
            <div className="product-info">
              <h3>Product Information</h3>
              <div className="product-something" key={product?._id}>
                <Link href={`/commerce/product/${product?._id}`}>
                  <Image src={product?.images[0]?.url} alt="alt" width={300} height={300} />
                </Link>
                <div>
                  <p>Product Number : {product?._id}</p>
                  <p>
                    {product?.quantity} X ${product?.price} = ${product?.quantity * product?.price}
                  </p>
                </div>
              </div>
            </div>
            <div className="payment">
              <h3>Payment</h3>
              <p>Payment Status : {order.paid ? "Paid" : "Not paid"}</p>
            </div>
          </div> */}
          {/* {!order.paid && auth.user.role === "user" && (
                <>
                  <p>Total : ${order.total}</p>
                  <Paypal order={order} />
                </>
              )}
              {order.paid && (
                <>
                  <p>Payment Method : {order.method}</p>
                  <p>Payment ID : {order.paymentId}</p>
                </>
              )} */}
        </div>
      </section>
    </Main>
  );
}

const Main = styled.main`
  > section {
    > div {
      border: 2px solid green;
      padding: 1rem;
      > button {
        padding: 1rem;
        border-radius: 5px;
      }
      .order {
        display: grid;
        grid-template-areas:
          "title payment"
          "delivery-info payment"
          "product-info payment";
        grid-template-columns: 2fr 1fr;
        gap: 1rem;
        > * {
          border: 2px solid;
          padding: 1rem;
          /* flex: 1; */
          border-radius: 5px;
        }
        .title {
          grid-area: title;
        }
        .delivery-info {
        }
        .product-info {
          /* flex: 1; */
          .product {
            border: 2px solid;
            display: flex;
            gap: 1rem;
            padding: 1rem;
            a {
              width: initial;
              img {
                width: 5rem;
              }
            }
          }
        }
        .payment {
          grid-area: payment;
        }
      }
    }
  }
`;
