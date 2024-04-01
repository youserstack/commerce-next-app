// import { useSession } from "next-auth/react";
import Stars from "@/components/product/Stars";
import { addToCart, deleteItemFromCart } from "lib/client/store/cartSlice";
import { setModal } from "lib/client/store/modalSlice";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { setProductIds } from "lib/client/store/productManagerSlice";

function UserButton({ product, isDuplicated, dispatch }: any) {
  const { _id, name, stock, price } = product;

  return (
    <button
      className={isDuplicated ? "delete-button" : "add-button"}
      disabled={stock === 0}
      onClick={() => {
        if (isDuplicated) return dispatch(deleteItemFromCart({ _id }));

        const newItem = { item: name, price: price, quantity: 1 };
        dispatch(addToCart({ ...product, options: [newItem] }));
      }}
    >
      {isDuplicated ? "Remove from cart" : "Add to cart"}
    </button>
  );
}

function AdminButton({ product, dispatch }: any) {
  const { _id } = product;

  return (
    <button
      className="delete-button"
      onClick={() => dispatch(setModal({ active: true, type: "DELETE_PRODUCT", id: _id }))}
    >
      Delete
    </button>
  );
}

export default function Product({ product }: any) {
  // external
  const { _id, category, name, description, seller, price, stock, ratings, images, reviews } =
    product;
  const session = useSession();
  const auth = useSelector((store: any) => store.auth);
  const cart = useSelector((store: any) => store.cart);
  const { ids } = useSelector((store: any) => store.productManager); // admin
  const dispatch = useDispatch();

  // cart.products : root state : redux store data (application의 지속가능한 데이터)
  // products : external props : fetched data (server로부터 가져온 증발가능한 데이터)
  const isDuplicated = cart.products.find((v: any) => v._id === product._id);

  // internal
  const checkRef: any = useRef(null);

  // const handleSelect = (e: any) => {
  //   e.target.checked
  //     ? dispatch(
  //         setProductIds((state: any) => {
  //           // const test = state.ids.push(_id);
  //           const copy = [...state.ids, _id];
  //           return copy;
  //         })
  //       )
  //     : dispatch(
  //         setProductIds((state: any) => {
  //           // state.ids.filter((id: any) => id !== _id);
  //           const copy = state.ids.filter((id: any) => id !== _id);
  //           return copy;
  //         })
  //       );
  // };
  const handleSelect = (e: any) => {
    const newId = _id;
    e.target.checked
      ? dispatch(setProductIds([...ids, newId]))
      : dispatch(setProductIds(ids.filter((id: any) => id !== newId)));
  };

  // useEffect(() => {
  //   // if (!selectedProductIds || !checkRef.current) return;
  //   // if (selectedProductIds.length === 0) checkRef.current.checked = false;
  //   // selectedProductIds.map((selectedProductId: any) => {
  //   //   if (selectedProductId === _id) checkRef.current.checked = true;
  //   // });
  // }, [selectedProductIds]);

  if (auth.user?.role === "admin") {
    return (
      <Box className="product box">
        <div className="image">
          <input
            ref={checkRef}
            className="checkbox"
            type="checkbox"
            onChange={handleSelect}
            // checked={selectedProductIds.find((id: any) => id === _id)}
          />
          <Link href={`/products/${_id}`}>
            <Image
              src={images[0].url || images[0].secure_url}
              alt={images[0].url}
              width={200}
              height={200}
              priority
            />
          </Link>
        </div>
        <div className="description">
          <div className="left">
            <div className="top">
              <h3>{name}</h3>
            </div>
            <div className="middle">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde similique ex sed at
              adipisci nostrum? Obcaecati illo minima corporis maiores dolores ut, magnam accusamus
              dicta natus eum, soluta nisi laborum?
            </div>
          </div>
          <Partition className="partition" />
          <div className="right">
            {/* <div className="stock">{stock > 0 ? <h6>Stock ({stock}) </h6> : <h6>Sold Out</h6>}</div> */}
            <h3 className="price">${price}</h3>
            {ratings === 0 ? (
              <p>No reviews</p>
            ) : (
              <div className="ratings">
                <small>{ratings}</small>
                <small>
                  <Stars number={Math.round(ratings)} />
                </small>
              </div>
            )}
            <AdminButton product={product} dispatch={dispatch} />
          </div>
        </div>
      </Box>
    );
  }

  return (
    <Box className="product box">
      <div className="image">
        <Link href={`/products/${_id}`}>
          <Image
            src={images[0].url || images[0].secure_url}
            alt={images[0].url}
            width={200}
            height={200}
            priority
          />
        </Link>
      </div>
      <div className="description">
        <div className="left">
          <div className="top">
            <h3>{name}</h3>
          </div>
          <div className="middle">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde similique ex sed at
            adipisci nostrum? Obcaecati illo minima corporis maiores dolores ut, magnam accusamus
            dicta natus eum, soluta nisi laborum?
          </div>
        </div>
        <Partition className="partition" />
        <div className="right">
          {/* <div className="stock">{stock > 0 ? <h6>Stock ({stock}) </h6> : <h6>Sold Out</h6>}</div> */}
          <h3 className="price">${price}</h3>
          {ratings === 0 ? (
            <p>No reviews</p>
          ) : (
            <div className="ratings">
              <small>{ratings}</small>
              <small>
                <Stars number={Math.round(ratings)} />
              </small>
            </div>
          )}
          <UserButton product={product} isDuplicated={isDuplicated} dispatch={dispatch} />
        </div>
      </div>
    </Box>
  );
}

const Partition = styled.div``;

const Box = styled.li`
  height: 10rem;
  border: 1px solid;
  border-radius: 10px;

  display: flex;
  overflow: hidden;

  .image {
    width: 10rem;
    position: relative;
    .checkbox {
      position: absolute;
      top: 1rem;
      left: 1rem;
    }
    > a > img {
      object-position: center;
      /* object-position: top; */
    }
  }
  .partition {
    border-left: 1px solid;
    margin: 0 1rem;
  }
  .description {
    flex: 1;
    display: flex;
    padding: 1rem;
    > * {
      /* border: 2px solid hotpink; */
    }
    > .left {
      flex: 1;
      > .top {
        display: flex;
      }
    }
    > .right {
      min-width: 7rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      /* border-left: 1px solid; */
      padding-left: 1rem;
      .price {
        text-align: end;
      }
      .ratings {
        place-self: flex-end;
        display: flex;
        justify-content: flex-end;
        gap: 0.5rem;
      }
      .stock {
        color: #d25d5d;
      }
      button {
        padding: 0.5rem;
        border-radius: 3px;
      }
    }
  }
  button {
    width: 8rem;
    &:disabled {
      opacity: 0.5;
    }
  }
`;
