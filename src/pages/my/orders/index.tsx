import Orders from "@/components/order/Orders";
import axios from "axios";
import styled from "styled-components";
import useSWR from "swr";

export default function Page() {
  // fetched from server : swr fetch library
  const fetcher = (url: any) => axios.get(url).then((res: any) => res.data);
  const { data, error, isLoading } = useSWR("/api/v2/orders", fetcher);

  if (isLoading) return null;

  console.log({ data });

  const { orders } = data;
  console.log({ orders });

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
    <Main>
      <section>
        <div className="orders-outer">
          <h1 className="my-orders-title box">Order List</h1>
          <Orders orders={orders} />
        </div>
      </section>
    </Main>
  );
}

const Main = styled.main`
  .orders-outer {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    /* border: 1px solid; */

    .my-orders-title {
      height: 3rem;
      border-radius: 5px;
      padding: 1rem;
      display: flex;
      align-items: center;
    }
  }

  @media (max-width: 800px) {
    .order-main {
      flex-direction: column;

      .partition {
        margin: 1rem 0;
      }
    }
  }
`;
