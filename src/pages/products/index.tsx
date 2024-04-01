import Pagination from "@/components/product/Pagination";
import Products from "@/components/product/Products";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import connectDB from "lib/server/config/connectDB";
import Product from "lib/server/models/Product";
import ProductsWidgets from "@/components/product/ProductsWidgets";
import { getData } from "lib/client/utils/fetchData";
import { useDispatch } from "react-redux";
import { setLoading } from "lib/client/store/loadingSlice";
import useSWR, { useSWRConfig } from "swr";
import axios from "axios";

// export async function getServerSideProps(context: any) {
// export async function getServerSideProps({ req, query }: any) {
//   console.log(`\x1b[33m\n[/products]:::[getStaticProps]\x1b[30m`);
//   // console.log(`\x1b[33m\n[${req.url}]:::[${req.method}]\x1b[30m`);
//   console.log({ query: query });

//   await connectDB();

//   // set the pagination conditions
//   const ITEMS_PER_PAGE = 3; // 페이지 당 아이템 수
//   const page = query.page || 1; // 요청된 페이지
//   const skip = (page - 1) * ITEMS_PER_PAGE; // 스킵할 아이템 수

//   // set the filter conditions
//   let queryCondition: any = {};
//   if (query) {
//     const { search, category, ratings } = query;
//     if (search) queryCondition.name = { $regex: search };
//     if (category && category !== "all") queryCondition.category = { $regex: category };
//     if (ratings) {
//       const ratingsArray = ratings
//         .split("+")
//         .map((v: string) => Number(v))
//         .sort((a: number, b: number) => b - a);
//       console.log({ ratingsArray });
//       queryCondition.ratings = { $in: ratingsArray };
//     }
//   }
//   console.log({ query });
//   console.log({ queryCondition });

//   // excute the query
//   const productCount = await Product.countDocuments(queryCondition);
//   const products = await Product.find(queryCondition).skip(skip).limit(ITEMS_PER_PAGE);
//   const pageCount = Math.ceil(productCount / ITEMS_PER_PAGE);

//   console.log({ products, productCount, productCountPerPage: ITEMS_PER_PAGE, pageCount });
//   return { props: { products: JSON.parse(JSON.stringify(products)), pageCount } };

//   // const response = await getData(`v2/products`, query);
//   // const { products, pageCount } = response.data;
//   // return { props: { products, pageCount } };
// }

// export default function Page({ products, pageCount }: any) {
export default function Page() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [page, setPage]: any = useState(1);

  // fetched from server : swr fetch library
  const fetcher = async (url: any) =>
    await axios.get(url, { params: router.query }).then((res: any) => res.data);
  const { data, error, isLoading } = useSWR("/api/v2/products", fetcher);
  const { mutate } = useSWRConfig();

  // 쿼리변경시, 서버에 요청
  useEffect(() => {
    mutate("/api/v2/products");
  }, [router.query]);

  useEffect(() => {
    setPage(Number(router.query.page) || 1);
  }, [router.query.page]);

  useEffect(() => {
    if (isLoading) {
      dispatch(setLoading(true));
    } else {
      dispatch(setLoading(false));
    }
  }, [isLoading]);

  const handlePaginate = (page: any) => {
    setPage(page);
    router.query.page = page;
    router.push({ pathname: router.pathname, query: router.query });
    mutate("/api/v2/products");
  };

  // useEffect(() => console.log({ data }), [data]);
  // const [products, setProducts] = useState([]);
  // const [pageCount, setPageCount] = useState(0);
  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     // console.log({ "router.query": router.query });
  //     try {
  //       dispatch(setLoading(true));
  //       const response = await getData("/v2/products", router.query);
  //       const { products, pageCount }: any = response.data;
  //       // console.log({ products, pageCount });
  //       setProducts(products);
  //       setPageCount(pageCount);
  //       dispatch(setLoading(false));
  //     } catch (error) {
  //       console.log({ error });
  //       dispatch(setLoading(false));
  //     }
  //   };
  //   fetchProducts();
  // }, [router.query]);

  if (isLoading) {
    return (
      <Main className="products-page">
        <section></section>
      </Main>
    );
  }

  const { products, pageCount } = data;

  return (
    <Main className="products-page">
      <section>
        <div className="products-page-section-inner">
          <ProductsWidgets products={products} />
          <div className="products-outer">
            <Products products={products} />
            <Pagination pageCount={pageCount} page={page} onPaginate={handlePaginate} />
          </div>
        </div>
      </section>
      {/* <div className="load-more">
              <button
                onClick={() => {
                  setPage(page + 1);
                  // setFilter({ ...filter, productPage: filter.productPage + 1 });
                  // console.log("filter : ", filter);
                  // setFilter((state: any) => ({
                  //   ...state,
                  //   productPage: state.productPage + 1,
                  // }));
                  router.query.page = page + 1;
                  router.push({ pathname: router.pathname, query: router.query });
                }}
              >
                Load More
              </button>
            </div> */}
    </Main>
  );
}

const Main = styled.main`
  .products-page-section-inner {
    height: 100%;
    display: flex;
    gap: 1rem;
    padding: 1rem;

    .products-outer {
      min-height: calc(100vh - 100px);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 1rem;
    }
  }

  @media (max-width: 800px), (width <= 800px) {
    .products-page-section-inner {
      flex-direction: column;

      .product-widgets.WEB {
        display: none;
      }

      .product-widgets-background.MOBILE {
        display: block;
      }
    }

    .product {
      height: initial;
      flex-direction: column;

      .image {
        width: 100%;
        img {
          height: 10rem;
        }
      }

      .partition {
        border-bottom: 1px solid;
        margin: 1rem 0;
      }

      .description {
        flex-direction: column;
        .right {
          flex-direction: row;
        }
      }
    }
  }
`;
