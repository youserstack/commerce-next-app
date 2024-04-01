import Filters from "@/components/product/Filters";
import Filters2 from "@/components/product/Filters2";
import ProductManager from "@/components/product/ProductManager";
import { setBackground } from "lib/client/store/backgroundSlice";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

export default function ProductsWidgets({ products }: any) {
  // external
  const dispatch = useDispatch();

  // internal
  const [widget, setWidget] = useState("");
  const productWidgetsRef: any = useRef(null);

  useEffect(() => {
    const handleClick = () => setWidget("");
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  const handleClickFilter = (e: any) => {
    e.stopPropagation();
    dispatch(setBackground(true));
    setWidget("filter");
  };

  const handleClickManager = (e: any) => {
    e.stopPropagation();
    dispatch(setBackground(true));
    setWidget("manager");
  };

  return (
    <Box>
      <div className="product-widgets WEB">
        <Filters2 />
        <ProductManager products={products} />
      </div>

      <div className="product-widgets-background MOBILE">
        <div
          className="product-widgets"
          onClick={(e) => e.stopPropagation()}
          ref={productWidgetsRef}
        >
          {widget === "filter" ? (
            <Filters2 />
          ) : widget === "manager" ? (
            <ProductManager products={products} />
          ) : null}
        </div>
        <div className="product-widgets-opener box">
          <button onClick={handleClickFilter}>Filter</button>
          <button onClick={handleClickManager}>Manager</button>
        </div>
      </div>
    </Box>
  );
}

const Box = styled.div`
  .product-widgets.WEB {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .product-widgets-background.MOBILE {
    display: none;

    .product-widgets {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 1000;
    }

    .product-widgets-opener {
      text-align: end;
      padding: 0 1rem;
      border-width: 1px;
      border-style: solid;
      border-radius: 10px;
    }
  }
`;
