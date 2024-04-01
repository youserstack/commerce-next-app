import { PayPalButtons } from "@paypal/react-paypal-js";
import logError from "lib/client/log/logError";
import logResponse from "lib/client/log/logResponse";
import { setLoading } from "lib/client/store/loadingSlice";
import { postData } from "lib/client/utils/fetchData";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

export default function Paypal({ orderSheet }: any) {
  const { accessToken: token } = useSelector((store: any) => store.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  const createOrder = (data: any, actions: any) => {
    // console.log({ createOrder: "createOrder", data, actions });
    const order = actions.order.create({
      purchase_units: [{ amount: { value: orderSheet.payInfo.total } }],
    });
    // console.log({ order });
    return order;
  };

  const onApprove = (data: any, actions: any) => {
    // console.log({ onApprove: "onApprove", data, actions });

    // capture : 결제금액을 판매자에게 전달하는 작업
    const capturedDetail = actions.order.capture().then((details: any) => {
      console.log({ details });

      const createOrder = async () => {
        dispatch(setLoading(true));
        try {
          const copiedOrderSheet = { ...orderSheet };
          console.log({ copiedOrderSheet });
          copiedOrderSheet.payInfo = {
            ...copiedOrderSheet.payInfo,
            payerId: details.payer.payer_id,
            isPaid: true,
            method: "paypal",
            dateOfPayment: new Date(),
            // dateOfPayment: new Intl.DateTimeFormat("ko-KR", {
            //   timeZone: "Asia/Seoul",
            //   dateStyle: "full",
            //   timeStyle: "full",
            // }).format(new Date()),
          };
          console.log({ payInfo: copiedOrderSheet.payInfo });

          // const payload = { _id: orderSheet._id, paymentId: details.payer.payer_id };
          const response = await postData("v2/order", copiedOrderSheet, token);
          console.log({ response });
          // router.push(`/my/orders/${response.data.order._id}`);
          router.push("/my/orders");
        } catch (error) {
          console.log({ error });
        }
        dispatch(setLoading(false));
      };
      createOrder();

      // console.log("onApprove action.order.capture:resolved.details : ", details);
      // alert(`Transaction completed by ${name}`);
      // const name = details.payer.name.given_name;
      // const paylaod = { ...cart, details };
    });

    return capturedDetail;
  };

  return (
    <Box className="paypal box">
      <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
    </Box>
  );
}

const Box = styled.div``;
