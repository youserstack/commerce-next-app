import Head from "next/head";
import styled from "styled-components";
import SigninForm from "@/components/form/SigninForm";

export default function Page() {
  return (
    <>
      <Head>
        <title>signin</title>
      </Head>
      <Main className="signin-page">
        <section>
          <SigninForm />
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
