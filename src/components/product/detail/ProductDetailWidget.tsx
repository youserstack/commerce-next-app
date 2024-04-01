import ImageViewer from "@/components/product/ImageViewer";
import Stars from "@/components/product/Stars";
import Option from "@/components/product/Option";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { addToCart } from "lib/client/store/cartSlice";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { FaCartPlus } from "react-icons/fa6";
import { MdPayment } from "react-icons/md";

interface Props {
  product?: any;
}

// static variable
const options = [
  {
    item: "option1",
    price: 3,
  },
  {
    item: "option2",
    price: 5,
  },
  {
    item: "option3",
    price: 7,
  },
];

export default function ProductDetailWidget({ product }: Props) {
  // external
  const { name, price, description, category, seller, stock, ratings, images, reviews } = product;
  const cart = useSelector((store: any) => store.cart);
  const dispatch = useDispatch();

  // internal
  const [total, setTotal]: any = useState(0);
  const [selectedOptions, setSelectedOptions]: any = useState([]);

  useEffect(() => {
    if (selectedOptions.length) console.log({ selectedOptions });
  }, [selectedOptions]);

  useEffect(
    () => setTotal(selectedOptions.reduce((a: any, v: any) => a + v.price * v.quantity, 0)),
    [selectedOptions]
  );

  // useEffect(() => {
  //   // if (total) console.log({ total });
  // }, [total]);
  // useEffect(() => {
  //   if (cart.products.length) console.log({ cart });
  // }, [cart]);

  return (
    <Box className="product-detail-widget box">
      <ImageViewer images={images} />

      <div className="product-detail-info">
        <div className="product-titles">
          <div className="product-name-and-price">
            <h1>{name}</h1>
            <p>price : ${price}</p>
          </div>
          <div className="ratings-and-reviews">
            <div className="ratings">
              {ratings === 0 ? (
                <div>
                  <h5>No reviews</h5>
                </div>
              ) : (
                <div>
                  <span>{ratings}</span>
                  <Stars number={Math.round(ratings)} />
                </div>
              )}
            </div>
          </div>
        </div>
        <hr className="partition" />

        <div className="description">
          <p>category : {category}</p>
          <p>seller : {seller}</p>
          <p>stock : {stock ? stock : "out stock"}</p>
          {/* <p>stock : {stock ? "in stock" : "out stock"}</p> */}
        </div>
        <hr className="partition" />

        <div className="delivery">
          <p>Delivery : Free Shipping (CJ 대한통운)</p>
          <small>제주,도서지역 추가 3,000원 / 도서산간지역 추가배송비 발생됩니다</small>
        </div>
        <hr className="partition" />

        <Option
          product={product}
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
          options={options}
        />
        {selectedOptions.length ? (
          <div className="total">
            <strong>총 상품금액 : ${total}</strong>
            <hr className="partition" />
          </div>
        ) : null}

        <div className="controller">
          <button
            className="add-button"
            onClick={() => {
              const duplicate = cart.products.find((v: any) => v._id === product._id);
              if (duplicate) return toast.error("Already added it");
              if (!selectedOptions.length)
                return alert(
                  "You do not have a option. please select the option.\n(옵션을 선택하지 않으셨습니다. 옵션을 선택해주세요.)"
                );
              dispatch(addToCart({ ...product, options: selectedOptions }));
            }}
          >
            <FaCartPlus size={20} />
            Add to Cart
          </button>
          <button
            className="buy-button"
            // disabled={selectedOptions.length === 0}
            onClick={(e) => {
              if (!selectedOptions.length)
                return alert(
                  "You do not have a option. please select the option.\n(옵션을 선택하지 않으셨습니다. 옵션을 선택해주세요.)"
                );
            }}
          >
            <MdPayment size={20} />
            Buy
          </button>
        </div>
      </div>
    </Box>
  );
}

const Box = styled.div`
  display: flex;
  gap: 1rem;

  .image-viewer {
    flex: 1;
  }

  .product-detail-info {
    flex: 1;
    display: flex;
    flex-direction: column;

    .partition {
      /* border-top: 1px solid; */
      margin: 1rem 0;
    }

    > .product-titles {
      > .product-name-and-price {
        display: flex;
        justify-content: space-between;
        align-items: end;
      }
      > .ratings-and-reviews {
        > .ratings {
          display: flex;
          gap: 0.5rem;
        }
      }
    }
    > .description {
      .stock-outer {
        display: flex;
        justify-content: space-between;
      }
    }
    .controller {
      flex: 1;
      display: flex;
      justify-content: end;
      align-items: end;
      gap: 1rem;
      padding: 1rem 0 0 0;
      button {
        padding: 1rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        &:disabled {
          cursor: not-allowed;
          opacity: 0.5;
        }
      }
    }
  }

  .total {
    margin-top: 1rem;
  }

  @media (max-width: 800px), (width <= 800px) {
    flex-direction: column;
    .description {
    }
  }
`;
