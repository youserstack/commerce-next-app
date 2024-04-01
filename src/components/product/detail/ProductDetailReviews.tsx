import { setModal } from "lib/client/store/modalSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Stars from "@/components/product/Stars";

import ProductReviews from "@/components/product/ProductReviews";
import ProductDetailReviewsImages from "@/components/product/detail/ProductDetailReviewsImages";

export default function ProductDetailReviews({ product }: any) {
  // external
  const { reviews } = product;
  const { user } = useSelector((store: any) => store.auth);
  const dispatch = useDispatch();

  // internal
  const [reviewRatingsAverage, setReviewRatingsAverage]: any = useState();

  const handleWriteReview = () => {
    dispatch(setModal({ active: true, type: "CREATE_PRODUCT_REVIEW", id: product._id }));
  };

  useEffect(() => {
    const reviewRatingsAverage =
      reviews.reduce((a: any, v: any) => a + v.rating, 0) / reviews.length;
    // console.log({ reviewRatingsAverage });
    setReviewRatingsAverage(reviewRatingsAverage);
  }, [reviews]);

  return (
    <Box className="product-detail-reviews box">
      <div className="reviews-info">
        <h1>Customer Reviews</h1>
        <div className="reviews-ratings">
          {reviews.length && reviewRatingsAverage ? (
            <>
              <p>{product.ratings}</p>
              <Stars number={Math.round(product.ratings)} />
              <p>{"( " + reviews.length + " )"}</p>
            </>
          ) : (
            <p>No reviews</p>
          )}
        </div>
        <div className="partition" />
        {user?.role === "user" && (
          <div className="write-a-review">
            <p>You can write this product&apos;s review</p>
            <button className="create-button" onClick={handleWriteReview}>
              Write a review
            </button>
          </div>
        )}
      </div>
      <div className="reviews-outer">
        <ProductDetailReviewsImages product={product} />
        <div className="partition" />
        <h1>Reviews</h1>
        <ProductReviews product={product} reviews={reviews} />
      </div>
    </Box>
  );
}

const Box = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem;

  .partition {
    border-bottom-width: 1px;
    border-bottom-style: solid;
    margin: 1rem 0;
  }

  .reviews-info {
    width: 30%;
    display: flex;
    flex-direction: column;

    .reviews-ratings {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
  }

  .reviews-outer {
    width: 70%;
    display: flex;
    flex-direction: column;
    /* gap: 1rem; */
  }

  .slick-track {
    .slick-slide {
      padding: 0 0.5rem;
    }
  }
`;
