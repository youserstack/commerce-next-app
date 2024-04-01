import Orders from "@/components/order/Orders";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getData } from "lib/client/utils/fetchData";
import connectDB from "lib/server/config/connectDB";
import Order from "lib/server/models/Order";
import User from "lib/server/models/User";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import styled from "styled-components";

export async function getServerSideProps({ req, res, query }: any) {
  console.log(`\x1b[33m\n[serverside]:::[${req.url}]:::[${req.method}]\x1b[30m`);
  // console.log({ "Object.keys(req)": Object.keys(req) });
  // console.log({ "Object.entries(req)": Object.entries(req) });

  await connectDB();

  // get the User id from session
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }
  const { _id }: any = session.user;

  // find the User
  const foundUser = await User.findOne({ _id }).exec();
  // console.log({ foundUser });

  // find the Orders by User ID
  // const foundOrders = await Order.findOne({ user: foundUser._id });
  const orders = await Order.find({ ordererInfo: _id })
    .populate({
      path: "ordererInfo",
    })
    // .populate("ordererInfo")
    .exec();

  return { props: { orders: JSON.parse(JSON.stringify(orders)) } };
}

export default function Page({ orders }: any) {
  console.log({ orders });
  // useEffect(() => {
  //   const fetchData: any = async () => {
  //     try {
  //       const response = await getData("v2/orders", null, auth.accessToken);
  //       const { orders } = response.data;
  //       console.log({ orders });
  //     } catch (error: any) {
  //       toast.error(error.message);
  //       console.log({ error });
  //     }
  //   };
  //   if (auth.accessToken) fetchData();
  // }, [auth.accessToken]);

  // if (!orders.length) return null;
  if (!orders.length) {
    return (
      <Main className="my-orders-page">
        <section>
          <div>
            <h1>No ordered products</h1>
          </div>
        </section>
      </Main>
    );
  }
  return (
    <Main className="my-orders-page">
      <section>
        <div>
          <h1>Ordered List</h1>
          {/* <Orders orders={orders} /> */}
        </div>
      </section>
    </Main>
  );
}

const Main = styled.main``;
