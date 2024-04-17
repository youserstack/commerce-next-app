import logError from "lib/client/log/logError";
import logResponse from "lib/client/log/logResponse";
import { setCredentials } from "lib/client/store/authSlice";
import { setLoading } from "lib/client/store/loadingSlice";
import { getData } from "lib/client/utils/fetchData";
import { signOut } from "next-auth/react";

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
