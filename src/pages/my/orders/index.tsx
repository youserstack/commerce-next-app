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
