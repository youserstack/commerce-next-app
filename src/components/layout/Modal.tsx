import logResponse from "lib/client/log/logResponse";
import { deleteItemFromCart } from "lib/client/store/cartSlice";
import { setModal } from "lib/client/store/modalSlice";
import { deleteData } from "lib/client/utils/fetchData";
import { useRouter } from "next/router";
import { FaCircleUser } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import styled from "styled-components";
import CreateProductForm from "@/components/form/CreateProductForm";
import CreateProductReviewForm from "@/components/form/CreateProductReviewForm";
import Stars from "@/components/product/Stars";
import { useSession } from "next-auth/react";

const Reviewer = ({ data }: any) => {
  return (
    <div className="review">
      <div className="review-content">
        <div className="review-user">
          <FaCircleUser />
        </div>
        <div className="review-info">
          <div className="review-ratings">
            <Stars number={data.rating} />
          </div>
          <div className="review-user-id">
            <small>User***</small>
          </div>
          <div className="review-comment">
            <h4>review id : {data._id}</h4>
            <p>{data.comment}</p>
          </div>
        </div>
      </div>
      {data.images?.length > 0 && (
        <div className="review-image">
          <Image src={data.images[0].url} alt="alt" width={500} height={500} />
        </div>
      )}
    </div>
  );
};

export default function Modal() {
  const { data: session } = useSession();
  const { accessToken: token } = useSelector((store: any) => store.auth);
  const { type, data, id, ids } = useSelector((store: any) => store.modal);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleClose = () => dispatch(setModal(null));
  const handleDeleteItem = async () => {
    const deleteProduct = async () => {
      const response = await deleteData(`v2/products/${id}`, null, token);
      logResponse(response);
    };
    const deleteProducts = async () => {
      const response = await deleteData(`v2/products/${id}`, ids, token);
      logResponse(response);
    };
    const deleteProductReviews = async () => {
      const response = await deleteData(`v2/products/${id}/review`, { ids }, token);
      logResponse(response);
    };
    switch (type) {
      case "DELETE_ITEMS":
        break;

      // Cart
      case "DELETE_CART_ITEM":
        dispatch(deleteItemFromCart({ _id: id }));
        // router.push({ pathname: router.asPath });

        break;

      // Product
      case "DELETE_PRODUCT":
        console.log("DELETE_PRODUCT");
        // await deleteProduct();
        // router.push({ pathname: router.asPath });
        break;
      case "DELETE_PRODUCTS":
        console.log("DELETE_PRODUCTS");
        // await deleteProducts();
        // router.push({ pathname: router.asPath });
        break;

      // Product Review
      case "DELETE_PRODUCT_REVIEWS":
        console.log("DELETE_PRODUCT_REVIEWS");
        // await deleteProductReviews();
        // router.push({ pathname: router.asPath });
        break;

      default:
        break;
    }
    handleClose();
  };

  if (!type) return null;

  return (
    <Background onClick={handleClose}>
      <Box onClick={(e) => e.stopPropagation()}>
        {type === "VIEW" && (
          <Image className="image" src={data} alt="alt" width={500} height={500} />
        )}
        {type === "REVIEW" && <Reviewer data={data} />}
        {type === "CREATE_PRODUCT" && <CreateProductForm />}
        {type === "CREATE_PRODUCT_REVIEW" && <CreateProductReviewForm />}
        {type.split("_")[0] === "DELETE" && (
          <>
            <div className="top">
              <h1>{type || "undefined type"}</h1>
            </div>
            <div className="middle">
              <p>
                {type === "DELETE_CART_ITEM" && "Do you want to delete this item?"}
                {type === "DELETE_ITEMS" && "Do you want to delete these items?"}
                {type === "DELETE_PRODUCT" && "Do you want to delete this product?"}
                {type === "DELETE_PRODUCTS" && "Do you want to delete these products?"}
              </p>
            </div>
            <div className="bottom">
              <button className="delete-button" onClick={handleDeleteItem}>
                Delete
              </button>
              <button className="cancel-button" onClick={handleClose}>
                Cancel
              </button>
            </div>
          </>
        )}
      </Box>
    </Background>
  );
}

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;

  .view-image {
    width: 70vw;
    height: 70vh;
  }
`;

const Box = styled.div`
  background-color: #eee;
  color: #000;
  border: 5px solid;
  border-radius: 10px;
  padding: 1rem;

  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .image {
    max-height: 80vh;
  }

  > .top {
    > hr {
      border-top: 1px solid;
    }
  }
  > .middle {
    flex: 1;
  }
  > .bottom {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
    > .delete-button,
    > .cancel-button,
    > .close-button {
      padding: 1rem;
      border-radius: 5px;
    }
  }

  /* review */
  .review {
    max-height: 700px;
    flex: 1;
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    .review-content {
      display: flex;
      gap: 1rem;
    }
    .review-image {
      img {
      }
    }
  }

  @media (max-width: 500px), (width <= 500px) {
    width: 90vw;
  }
`;
