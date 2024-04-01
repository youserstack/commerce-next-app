import logError from "lib/client/log/logError";
import logResponse from "lib/client/log/logResponse";
import { setCredentials } from "lib/client/store/authSlice";
import { setLoading } from "lib/client/store/loadingSlice";
import { getData, postData } from "lib/client/utils/fetchData";
import { signIn, signOut } from "next-auth/react";

// signin
const signinWithJWT = async (dispatch: any, data: any) => {
  const response = await postData("v2/auth/signin", data);
  const { user, accessToken } = response.data;
  dispatch(setCredentials({ user, accessToken }));
};

const signinWithNextauthCredentials = async (data: any) => {
  const { email, password } = data;
  const response: any = await signIn("credentials", {
    email,
    password,
    redirect: false,
    // callbackUrl: callbackUrl || "/",
  });
  console.log({ response });
};

const signinWithNextauthOauth = async () => {
  // await signIn("naver", { redirect: false });
  await signIn("naver", { redirect: true, callbackUrl: "/my/account" });
};
const signinWithKakao = async () => {
  await signIn("kakao", { redirect: true, callbackUrl: "/my/account" });
};

export const signin = async (dispatch: any, method: any, data: any) => {
  dispatch(setLoading(true));
  try {
    switch (method) {
      case "general-jwt":
        signinWithJWT(dispatch, data);
        break;
      case "nextauth-credentials":
        signinWithNextauthCredentials(data);
        break;
      case "nextauth-oauth":
        signinWithNextauthOauth();
        break;
      case "kakao":
        signinWithKakao();
        break;

      default:
        break;
    }
  } catch (error) {
    console.log({ error });
  }
  dispatch(setLoading(false));
};

// refresh
export const refreshAuth = async (dispatch: any) => {
  dispatch(setLoading(true));
  try {
    const response = await getData("v2/auth/refresh");
    const { user, accessToken } = response.data;
    dispatch(setCredentials({ user, accessToken }));
  } catch (error) {
    logError(error);
  }
  dispatch(setLoading(false));
};

// signout
export const signout = async (dispatch: any, auth: any) => {
  const { session, token } = auth;

  dispatch(setLoading(true));
  try {
    if (session) {
      await signOut({ redirect: false });
      // signOut({ callbackUrl: "/auth/signin" });
    } else if (token) {
      const response = await getData("v3/auth/signout");
      logResponse(response);
    }
    dispatch(setCredentials(null));
  } catch (error: any) {
    logError(error);
  }
  dispatch(setLoading(false));
};
