import { setModal } from "lib/client/store/modalSlice";
import { deleteOrder } from "lib/client/store/ordersSlice";
import { deleteData } from "lib/client/utils/fetchData";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "styled-components";

export default function Order({ order }: any) {
  // external
  const { productInfo, deliveryInfo, payInfo } = order;
  const { productId, imageUrl, options } = productInfo;
  // const { isDelivered } = deliveryInfo;
  const { method, isPaid, total } = payInfo;
  const { accessToken: token } = useSelector((store: any) => store.auth);
  const dispatch = useDispatch();

  // internal
  // const [expanded, setExpanded]: any = useState(false);

  const handleDeleteOrder = () => {
    const modalAction = async () => {
      try {
        const response = await deleteData(`v2/orders/${order._id}`, null, token);
        console.log({ data: response.data });
        dispatch(deleteOrder({ _id: response.data.deletedOrder._id }));
      } catch (error) {
        console.log({ error });
      }
    };
    dispatch(setModal({ active: true, type: "DELETE_ITEM", modalAction }));
  };

  return (
    <Box className="order box">
      <div className="order-header">
        <h3>
          Order Number : {order._id} ({order.createdAt.slice(0, 10)})
        </h3>
        {!isPaid && (
          <button className="delete-button" onClick={handleDeleteOrder}>
            Delete
          </button>
        )}
      </div>

      <div className="partition" />

      <div className="order-main">
        <div className="order-image">
          <Link href={`/products/${productId}`}>
            <Image src={imageUrl} alt={imageUrl} width={1000} height={1000} />
          </Link>
        </div>

        <div className="partition" />

        <div className="product-info">
          <p>Product Information</p>
          {options.map((option: any) => {
            const { item, price, quantity } = option;
            return (
              <pre key={item}>
                {item} : ${price} X {quantity} = ${price * quantity}
              </pre>
            );
          })}
        </div>

        <div className="partition" />

        <div className="delivery-info">
          <p>Delivery Information</p>
          <p>State : {deliveryInfo?.isDelivered ? "delivered" : "not delivered"}</p>
        </div>

        <div className="partition" />

        <div className="pay-info">
          <p>Payment Information</p>
          <p>Method : {method}</p>
          <p>State : {isPaid ? "paid" : "not paid"}</p>
          <p>Total : ${total}</p>
        </div>
      </div>
      {/* {expanded ? (
        <ul className="order-list">
          {order.cart.map((item: any) => (
            <li key={item._id} className="product-something">
              <div className="product-info-image">
                <Link href={`/products/${item._id}`}>
                  <Image
                    src={item.images[0].url || item.images[0].secure_url}
                    alt={item.images[0].url || item.images[0].secure_url}
                    width={1000}
                    height={1000}
                  />
                </Link>
              </div>
              <div className="product-info">
                <strong>{item.name}</strong>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <ul className="order-list">
          <li key={product._id} className="product-something">
            <div className="product-info-image">
              <Link href={`/products/${product._id}`}>
                <Image
                  src={product.images[0].url || product.images[0].secure_url}
                  alt={product.images[0].url || product.images[0].secure_url}
                  width={1000}
                  height={1000}
                />
              </Link>
            </div>
            <div className="product-info">
              <strong>{product.name}</strong>
            </div>
          </li>
        </ul>
      )} */}
      {/* {order.cart.length >= 2 && (
        <button className="expand-button" onClick={() => setExpanded(!expanded)}>
          View all the products
        </button>
      )} */}
    </Box>
  );
}

const Box = styled.li`
  border: 1px solid;
  border-radius: 5px;
  padding: 1rem;
  background-color: #333;

  .order-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .partition {
    border-top: 1px solid;
    margin: 1rem 0;
  }

  .order-main {
    display: flex;
    font-size: 14px;

    img {
      width: 10rem;
      height: 10rem;
    }

    pre {
      font-family: none !important;
    }

    .partition {
      border-right-width: 1px;
      border-right-style: solid;
      margin: 0 1rem;
    }

    .product-info,
    .delivery-info,
    .pay-info {
      flex: 1;
    }
  }

  /* > .expand-button {
    padding: 1rem;
    display: block;
    margin: auto;
    border-radius: 5px;
  } */
`;
