import styled from "styled-components";
import { getData } from "lib/client/utils/fetchData";
import ProductDetail from "@/components/product/detail/ProductDetail";
import Product from "lib/server/models/Product";
import connectDB from "lib/server/config/connectDB";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setProductId, setReviewIds } from "lib/client/store/productManagerSlice";
import { setLoading } from "lib/client/store/loadingSlice";

export async function getStaticPaths(context: any) {
  console.log(`\x1b[33m\n[pages/products/[id]]:::[getStaticPaths]\x1b[30m`);

  await connectDB();

  const products = await Product.find({}).select("_id").exec();
  const productIds = products.map((product) => product._id.toString());
  // console.log({ productIds });
  const paths = productIds.map((productId: any) => ({ params: { id: productId } }));

  return {
    // paths: [{ params: { id: "123" } }],
    paths,
    fallback: true,
    // fallback: false,
    // fallback: "blocking",
  };
}

export async function getStaticProps(context: any) {
  const { id } = context.params;
  console.log(`\x1b[33m\n[pages/products/${id}]:::[getStaticProps]\x1b[30m`);

  await connectDB();

  const product = await Product.findById(id);

  // const response = await getData(`v2/products/${id}`);
  // const { product } = response.data;
  // console.log({ product });

  return { props: { product: JSON.parse(JSON.stringify(product)) } };
}

// export async function getServerSideProps({ query }: any) {
//   // params.id === query.id
//   const { id } = query;
//   const response = await getData(`v2/products/${id}`);
//   const { product } = response.data;
//   return { props: { product } };
// }

export default function Page({ product }: any) {
  // console.log({ product });

  // external
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setProductId(null));
      dispatch(setReviewIds([]));
    };
  }, []);

  if (!product) return null;

  return (
    <Main className="products-[id]-page">
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
