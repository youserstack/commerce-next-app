import { setLoading } from "lib/client/store/loadingSlice";
import { postData } from "lib/client/utils/fetchData";

export const prepay = async (dispatch: any, order: any, token: any) => {
  dispatch(setLoading(true));
  try {
    const response = await postData("v2/order", { order }, token);
    // const { order } = response.data;
    // console.log({ order });
    // dispatch(clearCart());
    // router.push(`/order/${order._id}`);
  } catch (error: any) {
    console.log({ error });
    // toast.error(error.message);
  }
  dispatch(setLoading(false));
};
