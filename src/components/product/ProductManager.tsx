import { setModal } from "lib/client/store/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useRouter } from "next/router";
import { setProductIds } from "lib/client/store/productManagerSlice";

export default function ProductManager({ products }: any) {
  const { user } = useSelector((store: any) => store.auth);
  const { selectedProductIds } = useSelector((store: any) => store.productManager);
  const dispatch = useDispatch();
  const router = useRouter();

  // internal
  const isNotAdmin = user?.role !== "admin";

  const handleClearRatings = () => {
    localStorage.removeItem("ratings");
    delete router.query.ratings;
    router.push({ pathname: router.pathname, query: router.query });
  };

  const handleSelectAll = () => {
    const productIds = products.map((product: any) => product._id);
    dispatch(setProductIds(productIds));
  };

  const handleUnselectAll = () => {
    dispatch(setProductIds([]));
  };

  const handleCreateProduct = () => {
    dispatch(setModal({ active: true, type: "CREATE_PRODUCT" }));
  };

  const handleDeleteProducts = () => {
    dispatch(setModal({ active: true, type: "DELETE_PRODUCTS", ids: selectedProductIds }));
  };

  return (
    <Box className="product-manager box">
      <h4>Product Manager</h4>
      <p>Admin 권한만 이용할 수 있습니다.</p>

      <hr className="partition" />

      <button className="general-button" onClick={handleClearRatings} disabled={isNotAdmin}>
        Remove ratings in localStorage
      </button>

      <hr className="partition" />

      <button className="general-button" onClick={handleSelectAll} disabled={isNotAdmin}>
        Select All
      </button>
      <button className="general-button" onClick={handleUnselectAll} disabled={isNotAdmin}>
        Unselect All
      </button>

      <hr className="partition" />

      <button className="create-button" onClick={handleCreateProduct} disabled={isNotAdmin}>
        Create a product
      </button>
      <button
        className="delete-button"
        onClick={handleDeleteProducts}
        disabled={isNotAdmin || selectedProductIds?.length === 0}
      >
        Delete the products
      </button>
    </Box>
  );
}

const Box = styled.div`
  padding: 1rem;
  border-radius: 10px;

  display: flex;
  flex-direction: column;
  gap: 1rem;

  button {
    width: 150px;
  }
`;
