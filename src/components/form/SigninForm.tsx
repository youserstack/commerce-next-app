import { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { styled } from "styled-components";
import { SiNaver } from "react-icons/si";
import { signIn } from "next-auth/react";
import { setLoading } from "lib/client/store/loadingSlice";
import { postData } from "lib/client/utils/fetchData";
import { setCredentials } from "lib/client/store/authSlice";
import Image from "next/image";

export default function SigninForm() {
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    setFocus,
    formState: { errors },
  } = useForm();

  useEffect(() => setFocus("email"), [setFocus]);

  const signin = async (data: any) => {
    dispatch(setLoading(true));
    const response = await postData("v2/auth/signin", data);
    const { user, accessToken } = response.data;
    if (!accessToken) {
      console.error("No accessToken");
      dispatch(setLoading(false));
      return;
    }
    dispatch(setCredentials({ user, accessToken }));
    router.push("/my/ordered-list");
    dispatch(setLoading(false));
  };

  const signinWithCredentials = async (data: any) => {
    dispatch(setLoading(true));
    const { email, password } = data;
    const response: any = await signIn("credentials", {
      email,
      password,
      callbackUrl: "/my/ordered-list",
    });
    // console.log({response})
    dispatch(setLoading(false));
  };

  const signinWithOauth = async (e: any, method: any) => {
    e.preventDefault();
    dispatch(setLoading(true));
    switch (method) {
      case "naver":
        await signIn("naver", { redirect: true, callbackUrl: "/my/ordered-list" });
        break;
      case "kakao":
        await signIn("kakao", { redirect: true, callbackUrl: "/my/ordered-list" });
        break;

      default:
        break;
    }
    dispatch(setLoading(false));
  };

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

        <button className="signin" onClick={handleSubmit(signin)}>
          Sign in
        </button>

        <button className="signin-with-credentials" onClick={handleSubmit(signinWithCredentials)}>
          Sign in with Credentials
        </button>
      </form>

      <div className="partition" />

      <button className="signin-with-naver" onClick={(e) => signinWithOauth(e, "naver")}>
        <SiNaver size={16} />
        Sign in with Naver
      </button>

      <button className="signin-with-kakao" onClick={(e) => signinWithOauth(e, "kakao")}>
        {/* <SiKakaotalk size={16} /> */}
        <Image src={"/images/kakao.svg"} alt="" width={100} height={100} />
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
    background-color: #fee500;
    color: #191919;
    &:hover {
      background-color: #000;
      color: #fff;
    }
    &:hover img {
      filter: invert();
    }

    img {
      width: 18px;
    }
  }
`;
