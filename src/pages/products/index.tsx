import Pagination from "@/components/product/Pagination";
import Products from "@/components/product/Products";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import ProductsWidgets from "@/components/product/ProductsWidgets";
import { useDispatch } from "react-redux";
import useSWR, { useSWRConfig } from "swr";
import axios from "axios";
import Loading from "@/components/layout/Loading";

export default function Page() {
  const router = useRouter();
  const [page, setPage]: any = useState(1);

  const fetcher = async (url: any) => {
    const response = await axios.get(url, { params: router.query });
    return response.data;
  };
  const { data, isLoading } = useSWR("/api/v2/products", fetcher);
  const { mutate } = useSWRConfig();

  // 쿼리변경시 리패칭(refetching)
  useEffect(() => {
    mutate("/api/v2/products");
  }, [router.query]);

  // 쿼리변경시 현재페이지를 설정
  useEffect(() => {
    setPage(Number(router.query.page) || 1);
  }, [router.query.page]);

  const handlePaginate = (page: any) => {
    setPage(page);
    router.query.page = page;
    router.push({ pathname: router.pathname, query: router.query });
    mutate("/api/v2/products");
  };

  if (isLoading) {
    return (
      <Main className="products-page">
        <section>
          <Loading />
        </section>
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

// {
//   /* <div className="load-more">
//               <button
//                 onClick={() => {
//                   setPage(page + 1);
//                   // setFilter({ ...filter, productPage: filter.productPage + 1 });
//                   // console.log("filter : ", filter);
//                   // setFilter((state: any) => ({
//                   //   ...state,
//                   //   productPage: state.productPage + 1,
//                   // }));
//                   router.query.page = page + 1;
//                   router.push({ pathname: router.pathname, query: router.query });
//                 }}
//               >
//                 Load More
//               </button>
//             </div> */
// }
