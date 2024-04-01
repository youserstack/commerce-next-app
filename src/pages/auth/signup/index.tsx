import Head from "next/head";
import styled from "styled-components";
import SignupForm from "@/components/form/SignupForm";

export default function Page() {
  // useEffect(() => {
  //   setFocus("name", { shouldSelect: true });
  // }, [setFocus]);

  // const nameErrorMessages = (
  //   <>
  //     {errors.name && errors.name.type === "required" && <small>This field is required.</small>}
  //     {errors.name && errors.name.type === "maxLength" && (
  //       <small>Max Length is 20 character.</small>
  //     )}
  //   </>
  // );
  // const emailErrorMessages = errors.email && <small>This field is required.</small>;
  // const passwordErrorMessages = (
  //   <>
  //     {errors.password && errors.password.type === "required" && (
  //       <small>This field is required.</small>
  //     )}
  //     {errors.password && errors.password.type === "maxLength" && (
  //       <small>Password max length is 20 characters.</small>
  //     )}
  //   </>
  // );
  // const passwordConfirmErrorMessages = (
  //   <>
  //     {errors.passwordConfirm && errors.passwordConfirm.type === "required" && (
  //       <small>This field is required.</small>
  //     )}
  //     {errors.passwordConfirm && errors.passwordConfirm.type === "validate" && (
  //       <small>The password is not matched.</small>
  //     )}
  //   </>
  // );

  // useEffect(() => console.log({ errors }), [errors]);

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
