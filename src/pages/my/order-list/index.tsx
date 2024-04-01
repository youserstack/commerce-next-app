import Orders from "@/components/order/Orders";
import logError from "lib/client/log/logError";
import logResponse from "lib/client/log/logResponse";
import { getData } from "lib/client/utils/fetchData";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "styled-components";

export default function Page() {
  const auth = useSelector((store: any) => store.auth);
  const orders = useSelector((store: any) => store.orders);
  const dispatch = useDispatch();

  const fetchData: any = async () => {
    try {
      const response = await getData("order", auth.accessToken);
      logResponse(response);
      const { orders } = response.data;
    } catch (error) {
      logError(error);
    }
  };

  useEffect(() => fetchData(), [auth.user]);

  if (!orders || !orders.length) return null;
  return (
    <>
      <Head>
        <title>Order List Page</title>
      </Head>
      <Main className="my-order-list-page">
        <section>
          <div className="orders">
            <h1>Order List</h1>
            <Orders orders={orders} />
          </div>
        </section>
      </Main>
    </>
  );
}

const Main = styled.main`
  > section {
    > .orders {
      border: 2px solid green;
      padding: 1rem;
      > h1 {
        margin-bottom: 1rem;
      }
    }
  }
`;
