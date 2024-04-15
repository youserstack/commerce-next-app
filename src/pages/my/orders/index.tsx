import Orders from "@/components/order/Orders";
import styled from "styled-components";

export default function Page() {
  return (
    <Main>
      <section>
        <div className="orders-outer">
          <h1 className="my-orders-title box">Order List</h1>
          <Orders />
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

// import { setOrderedList } from "lib/client/store/orderedListSlice";
// import { getData } from "lib/client/utils/fetchData";
// import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// const orders = useSelector((store: any) => store.orderedList.orders);
// const dispatch = useDispatch();
// useEffect(() => {
//   const fetchData: any = async () => {
//     if (!auth.accessToken) return;
//     try {
//       const response = await getData("v2/orders", null, auth.accessToken);
//       const { orders } = response.data;
//       console.log({ response });
//       dispatch(setOrderedList(orders));
//     } catch (error) {
//       console.log({ error });
//     }
//   };

//   fetchData();
// }, [auth.accessToken]);
