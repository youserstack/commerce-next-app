import styled from "styled-components";
import ProductDetail from "@/components/product/detail/ProductDetail";
import Product from "lib/server/models/Product";
import connectDB from "lib/server/config/connectDB";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setProductId, setReviewIds } from "lib/client/store/productManagerSlice";

export async function getStaticPaths() {
  console.log("[pages/products/[id]] 정적 경로 수집중...");
  await connectDB();

  const products = await Product.find({}).select("_id").exec();
  const productIds = products.map((product) => product._id.toString());
  const paths = productIds.map((productId: any) => ({ params: { id: productId } }));
  // console.log({ productIds });

  return { paths, fallback: true };
  // fallback: false,
  // fallback: "blocking",
}

export async function getStaticProps(context: any) {
  await connectDB();
  const { id } = context.params;
  console.log(`[pages/products/${id}] 정적 프로퍼티 생성중...`);

  const product = await Product.findById(id);

  // const response = await getData(`v2/products/${id}`);
  // const { product } = response.data;

  return { props: { product: JSON.parse(JSON.stringify(product)) } };
}

export default function Page({ product }: any) {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log({ product });
    return () => {
      dispatch(setProductId(null));
      dispatch(setReviewIds([]));
    };
  }, []);

  if (!product) return null;

  return (
    <Main className="products-id">
      <section>
        <ProductDetail product={product} />
      </section>
    </Main>
  );
}

const Main = styled.main`
  @media (max-width: 800px), (width <= 800px) {
    .product-detail-reviews {
      flex-direction: column;

      .reviews-info,
      .reviews-outer {
        width: 100%;
      }
    }
  }

  @media (max-width: 500px), (width <= 500px) {
    .product-review {
      flex-direction: column;
      height: initial;
      .review-image {
        width: 100%;
        display: flex;
        /* height: initial; */
      }
    }
  }
`;
