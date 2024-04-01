import { setModal } from "lib/client/store/modalSlice";
import { setProductId, setReviewIds } from "lib/client/store/productManagerSlice";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { FaCirclePlus, FaMinus, FaPlus } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

export default function ProductManagerFixed() {
  // exteranl
  const { data: session } = useSession();
  const { accessToken: token } = useSelector((store: any) => store.auth);
  const { reviewIds } = useSelector((store: any) => store.productManager);
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    const settings = { active: true, type: "DELETE_PRODUCT_REVIEWS" };
    dispatch(setModal(settings));
  };

  const handleUnselectAll = () => dispatch(setReviewIds([]));

  // internal
  const [isVisible, setIsVisible] = useState(false);

  const handleMoveInScreen = () => setIsVisible(!isVisible);

  useEffect(() => console.log({ reviewIds }), [reviewIds]);

  if (!session && !token) return null;

  return (
    <Box>
      <div className={`product-manager ${isVisible ? "visible" : ""}`}>
        <h4>Product Manager</h4>
        <hr />
        <button
          className="delete-button"
          disabled={reviewIds.length === 0}
          onClick={handleOpenModal}
        >
          Delete the selected items
        </button>
        <button className="cancel-button" onClick={handleUnselectAll}>
          Unselect all the items
        </button>
      </div>

      <div className="product-manager-nav">
        <button onClick={handleMoveInScreen}>{isVisible ? <FaMinus /> : <FaPlus />}</button>
      </div>
    </Box>
  );
}

const Box = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  /* background-color: rgba(0, 77, 0, 0.3); */
  pointer-events: none;

  .product-manager {
    min-width: 12rem;

    border: 1px solid green;
    border-radius: 10px;
    padding: 1rem;
    background-color: #555;

    position: fixed;
    /* top: 120px; */
    left: -15rem;
    bottom: 3%;

    transition: all 0.3s;

    display: flex;
    flex-direction: column;
    gap: 1rem;

    pointer-events: initial;

    &.visible {
      left: 3%;
    }

    h4 {
      text-align: center;
    }
    hr {
      place-self: stretch;
    }

    button {
      /* &:hover {
        outline: 3px solid yellow;
      } */

      &:disabled {
        opacity: 0.5;
      }
    }
  }

  .product-manager-nav {
    button {
      width: 3rem;
      height: 3rem;
      background-color: green;
      border-radius: 50%;
      padding: 0;

      position: fixed;
      /* left: 3%; */
      right: 3%;
      bottom: 3%;

      display: flex;
      justify-content: center;
      align-items: center;

      &:hover {
        background-color: black;
      }

      > * {
        /* border: 1px solid red; */
      }
    }

    pointer-events: initial;
  }
`;
