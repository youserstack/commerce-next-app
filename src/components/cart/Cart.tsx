import { increaseQuantity, decreaseQuantity, deleteItemFromCart } from "lib/client/store/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { setModal } from "lib/client/store/modalSlice";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { setOrderSheet } from "lib/client/store/orderSheetSlice";

export default function Cart({ product }: any) {
  // exteranl
  const { _id, name, price, images, seller, stock, quantity, options } = product;
  const { data: session } = useSession();
  const { user } = useSelector((store: any) => store.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  // internal
  const [paymentAmount, setPaymentAmount]: any = useState(0);

  // handle
  const handleOpenModal = () => dispatch(setModal({ type: "DELETE_CART_ITEM", id: _id }));
  const handleIncreaseQuantity = (item: any) => dispatch(increaseQuantity({ _id, item }));
  const handleDecreaseQuantity = (item: any) => dispatch(decreaseQuantity({ _id, item }));
  const handleMoveToNextStep = () => {
    if (!session && !user) {
      return router.push("/auth/signin");
    }

    const orderSheet = {
      User: user._id,
      productInfo: { productId: _id, imageUrl: images[0].url, options: options },
      payInfo: { total: paymentAmount },
    };
    console.log({ orderSheet });
    dispatch(setOrderSheet(orderSheet));
    router.push("/order-sheet");
  };

  // caculate the total payment amount
  useEffect(() => {
    const paymentAmount = options.reduce((a: any, v: any) => a + v.price * v.quantity, 0);
    setPaymentAmount(paymentAmount);
  }, [options]);

  return (
    <Box className="cart box">
      <div className="cart-content-header">
        <h1>Seller : {seller}</h1>
        <button className="delete-button" onClick={handleOpenModal}>
          Delete
        </button>
      </div>

      <div className="partition" />

      <div className="cart-content-main">
        <div className="cart-content-info">
          <Link href={`/products/${_id}`}>
            <div className="image">
              <Image
                src={images[0].url || images[0].secure_url}
                alt={images[0].url || images[0].secure_url}
                width={1000}
                height={1000}
              />
            </div>
            <div className="description">
              <p>{name}</p>
              <small>stock : {stock}</small>
            </div>
          </Link>
        </div>

        <div className="partition" />

        <ul className="options">
          {options.map((option: any, index: number) => (
            <li className="option" key={option.item}>
              <p>{option.item}</p>
              <p>
                ${option.price} X {option.quantity} = ${option.price * option.quantity}
              </p>
              <div className="buttons">
                <button
                  onClick={() => handleDecreaseQuantity(option.item)}
                  disabled={option.quantity === 1}
                >
                  -
                </button>
                <button
                  onClick={() => handleIncreaseQuantity(option.item)}
                  // disabled={option.quantity === stock}
                  disabled={index === 0 ? option.quantity === stock : option.quantity === 5}
                >
                  +
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="partition" />

      <div className="cart-content-footer">
        <h3>paymentAmount (주문금액) : ${paymentAmount}</h3>
        <button className="pay-button" onClick={handleMoveToNextStep}>
          Order Now (주문)
        </button>
      </div>
    </Box>
  );
}

const Box = styled.li`
  border: 1px solid;
  border-radius: 5px;
  padding: 1rem;
  background-color: #333;

  .cart-content-header {
    display: flex;
    justify-content: space-between;

    .delete-button {
      /* background-color: #ea5b5b; */
      padding: 0.5rem 1rem;
      &:hover {
        background-color: #ea5b5b;
      }
    }
  }

  .cart-content-main {
    display: flex;

    .cart-content-info {
      flex: 1;

      .image {
        width: 10rem;
      }
      .description {
        flex: 1;
        small {
          color: #ea5b5b;
        }
      }
    }

    .partition {
      border-right-width: 1px;
      border-right-style: solid;
      margin: 0 1rem;
    }

    .options {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      .option {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
        /* border: 1px solid; */
        border-width: 1px;
        border-style: solid;
        padding: 0.3rem;

        .buttons {
          display: flex;
          gap: 0.5rem;

          > button {
            width: 1.2rem;
            height: 1.2rem;
            background-color: #999;
            display: flex;
            justify-content: center;
            align-items: center;
            &:disabled {
              cursor: not-allowed;
              /* background-color: #222;
              color: inherit; */
              opacity: 0.5;
            }
          }
        }
      }
    }
  }

  .cart-content-footer {
    /* text-align: end; */
    display: flex;
    justify-content: end;
    align-items: center;
    gap: 1rem;
  }

  .partition {
    border-bottom-width: 1px;
    border-bottom-style: solid;
    margin: 1rem 0;
  }

  a {
    height: 100%;
    display: flex;
    gap: 1rem;
  }
`;
