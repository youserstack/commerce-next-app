import ProductReview from "@/components/product/ProductReview";
import styled from "styled-components";

interface Props {
  product: any;
  reviews: [];
}

export default function ProductReviews({ product, reviews }: Props) {
  return (
    <Box className="product-reviews">
      {reviews.map((review: any) => (
        <ProductReview product={product} review={review} key={review._id} />
      ))}
    </Box>
  );
}

const Box = styled.ul`
  display: flex;
  /* flex-direction: column; */
  flex-direction: column-reverse;
  gap: 1rem;
`;
