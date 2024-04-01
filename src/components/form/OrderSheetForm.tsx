import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { setLoading } from "lib/client/store/loadingSlice";
import { addOrder } from "lib/client/store/ordersSlice";
import { clearCart } from "lib/client/store/cartSlice";
import { toast } from "react-toastify";
import { postData } from "lib/client/utils/fetchData";
import { useSession } from "next-auth/react";
import Paypal from "@/components/button/Paypal";
import { setOrderSheet } from "lib/client/store/orderSheetSlice";

export default function OrderSheetForm() {
  // external
  const { data: session } = useSession();
  const { user, accessToken: token } = useSelector((store: any) => store.auth);
  const orderSheet = useSelector((store: any) => store.orderSheet);
  const dispatch = useDispatch();
  const router = useRouter();

  // internal
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [payType, setPayType]: any = useState("prepay");
  const [isPayNowClicked, setIsPayNowClicked] = useState(false);

  // handle
  const handleOrder = async (data: any) => {
    // integrate the order data
    const { name, email, address, mobile } = data;
    const order = {
      ...orderSheet,
      // User: user._id,
      // productInfo: orderSheet.productInfo,
      deliveryInfo: { name, email, address, mobile },
      payInfo: { ...orderSheet.payInfo, payType },
    };
    console.log({ order });
    // console.log({ payType });

    // prepay
    if (payType === "prepay") {
      dispatch(setOrderSheet(order));
      setIsPayNowClicked(true);
      return;
    }

    // postpay
    dispatch(setLoading(true));
    try {
      const response = await postData("v2/order", order, token);
      console.log({ order: response.data });
      // router.push(`/orders/${order._id}`);
    } catch (error) {
      console.log({ error });
    }
    dispatch(setLoading(false));
  };

  if (!session && !token) return null;
  return (
    <Box className="order-sheet-form box">
      <div className="order-info">
        <div className="delivery-info">
          <h3>Delivery Information</h3>
          <button>주문자와 동일</button>
          <label>
            <p>Receiver Name : </p>
            <input {...register("name")} type="text" defaultValue={user?.username || "tom"} />
          </label>
          <label>
            <p>Receiver Email : </p>
            <input {...register("email")} type="email" defaultValue={user?.email || "tom@tom"} />
          </label>
          <label>
            <p>Receiver Address : </p>
            <input {...register("address")} type="text" />
          </label>
          <label>
            <p>Receiver Mobile : </p>
            <input {...register("mobile")} type="text" />
          </label>
        </div>

        <div className="partition" />

        <div className="payment-info">
          <h3>Payment Information</h3>
          <p>Total : ${orderSheet.payInfo?.total}</p>
          <p>Payment Method (결제방식)</p>
          <div className="payment-method">
            <label className="box">
              <input
                {...register("payType")}
                type="radio"
                value="prepay"
                defaultChecked
                onChange={(e) => setPayType(e.target.value)}
              />
              선불결제(prepay)
            </label>
            <label className="box">
              <input
                {...register("payType")}
                type="radio"
                value="postpay"
                onChange={(e) => setPayType(e.target.value)}
              />
              후불결제(postpay)
            </label>
          </div>
        </div>
      </div>

      <div className="partition" />

      <div className="pay-for-order">
        {payType === "prepay" && (
          <div>
            <button className="pay-button" onClick={handleSubmit(handleOrder)}>
              Pay Now
            </button>
            {isPayNowClicked && <Paypal orderSheet={orderSheet} />}
          </div>
        )}
        {payType === "postpay" && (
          <button className="pay-button" onClick={handleSubmit(handleOrder)}>
            Pay Later
          </button>
        )}
      </div>
    </Box>
  );
}

const Box = styled.form`
  border: 1px solid;
  border-radius: 10px;
  padding: 1rem;
  background-color: #333;

  .order-info {
    display: flex;

    .delivery-info {
      flex: 1;

      input {
        width: 70%;
      }
    }

    .partition {
      border-right-width: 1px;
      border-right-style: solid;
      margin: 0 1rem;
    }

    .payment-info {
      flex: 1;

      .payment-method {
        display: flex;
        gap: 1rem;

        label {
          padding: 1rem;
          border-width: 1px;
          border-style: solid;
          cursor: pointer;
        }
      }
    }
  }

  .partition {
    border-bottom-width: 1px;
    border-bottom-style: solid;
    margin: 1rem 0;
  }

  .pay-for-order {
    text-align: end;
  }

  .paypal {
    display: flex;
    justify-content: end;
  }
`;
