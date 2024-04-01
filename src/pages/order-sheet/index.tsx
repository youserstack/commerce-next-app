import styled from "styled-components";
import OrderSheetForm from "@/components/form/OrderSheetForm";

export default function Page() {
  return (
    <Main className="order-page">
      <section>
        <OrderSheetForm />
      </section>
    </Main>
  );
}

const Main = styled.main`
  section {
    padding: 1rem;
  }

  @media (max-width: 700px) {
    .order-sheet-form {
      .order-info {
        flex-direction: column;

        .delivery-info {
          input {
            width: 100%;
          }
        }

        .partition {
          border-top: 1px solid;
          margin: 1rem 0;
        }
      }
    }
  }
`;
