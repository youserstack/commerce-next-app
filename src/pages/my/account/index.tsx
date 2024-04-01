import { styled } from "styled-components";
import AccountForm from "@/components/form/AccountForm";

export default function Page() {
  return (
    <Main className="my-account-page">
      <section>
        <div className="account-form-outer">
          <h1 className="my-account-title box">My Account</h1>
          <AccountForm />
        </div>
      </section>
    </Main>
  );
}

const Main = styled.main`
  .account-form-outer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    padding: 1rem;

    .my-account-title {
      width: 100%;
      height: 3rem;

      padding: 1rem;
      border-radius: 5px;
      display: flex;
      align-items: center;
    }
  }

  @media (max-width: 500px) {
    .account-form {
      grid-template-areas: "area1 area1" "area2 area2";
    }
  }
`;
