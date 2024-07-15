import Head from "next/head";
import styled from "styled-components";
import SignupForm from "@/components/form/SignupForm";

export default function Page() {
  return (
    <>
      <Head>
        <title>Sign Up</title>
      </Head>

      <Main className="signup-page">
        <section>
          <SignupForm />
        </section>
      </Main>
    </>
  );
}

const Main = styled.main`
  padding: initial;

  section {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
