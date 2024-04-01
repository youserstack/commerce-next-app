import { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { styled } from "styled-components";
import { SiKakaotalk, SiNaver } from "react-icons/si";
import { signin } from "lib/client/utils/authUtils";
import Image from "next/image";

export default function SigninForm() {
  // external
  const dispatch = useDispatch();

  // internal
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    setFocus,
    formState: { errors },
  } = useForm();

  useEffect(() => setFocus("email"), [setFocus]);

  return (
    <Box className="signin-form box">
      <h1>Sign In</h1>
      <div className="partition" />

      <form className="traditional-signin">
        <input {...register("email", { required: true })} type="text" placeholder="email" />
        <input
          {...register("password", { required: true })}
          type="password"
          placeholder="password"
        />
        <button
          className="signin"
          onClick={handleSubmit((data) => {
            signin(dispatch, "general-jwt", data);
            router.push("/my/account");
          })}
        >
          Sign in without Library
        </button>
        <button
          className="signin-with-credentials"
          onClick={handleSubmit((data) => {
            signin(dispatch, "nextauth-credentials", data);
            router.push("/my/account");
          })}
        >
          Sign in with Credentials
        </button>
      </form>
      <div className="partition" />

      <button
        className="signin-with-naver"
        onClick={(e) => {
          e.preventDefault();
          signin(dispatch, "nextauth-oauth", null);
          router.push("/my/account");
        }}
      >
        <SiNaver size={14} />
        Sign in with Naver
      </button>
      <button
        className="signin-with-kakao"
        onClick={(e) => {
          e.preventDefault();
          signin(dispatch, "kakao", null);
          router.push("/my/account");
        }}
      >
        {/* <SiKakaotalk size={14} /> */}
        Sign in with Kakao
      </button>
    </Box>
  );
}

const Box = styled.div`
  width: 50%;
  max-width: 500px;
  min-width: 300px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;

  border: 1px solid green;
  border-radius: 10px;
  padding: 3rem 1rem;
  background-color: #222;

  button {
    width: 200px;
    border-radius: 5px;
    padding: 0.7rem;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;

    background-color: inherit;
    color: #fff;
    &:hover {
      background-color: #000;
    }
  }

  > div,
  > button,
  > .traditional-signin {
    width: 200px;
  }

  .partition {
    border-bottom-width: 1px;
    border-bottom-style: solid;
    margin: 1rem 0;
  }

  .traditional-signin {
    display: flex;
    flex-direction: column;
    gap: 10px;

    > input {
      width: 200px;
      padding: 8px;
      outline: none;
      border: 3px solid royalblue;
      border-radius: 5px;
      :hover,
      :focus {
        border: 3px solid green;
      }
    }

    .signin {
      background-color: gray;
    }

    .signin-with-credentials {
      background-color: #007aff;
    }
  }

  .signin-with-naver {
    background-color: #03c75a;
  }
  .signin-with-kakao {
    background-color: #d6bd00;
  }
`;
