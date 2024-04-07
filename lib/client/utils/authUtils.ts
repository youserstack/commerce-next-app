import logError from "lib/client/log/logError";
import logResponse from "lib/client/log/logResponse";
import { setCredentials } from "lib/client/store/authSlice";
import { setLoading } from "lib/client/store/loadingSlice";
import { getData, postData } from "lib/client/utils/fetchData";
import { signIn, signOut } from "next-auth/react";

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
