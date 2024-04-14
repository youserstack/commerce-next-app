import { setBackground } from "lib/client/store/backgroundSlice";
import { setSideMenu } from "lib/client/store/sideMenuSlice";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

export default function NavSideProductMenu() {
  const sideMenu = useSelector((store: any) => store.sideMenu);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setBackground(false));
    dispatch(setSideMenu("hidden"));
  };

  return (
    <Box
      className={`nav-side-product-menu ${
        sideMenu.value === "product-menu" ? "move-in-screen" : "hidden"
      }`}
      onClick={(e) => e.stopPropagation()}
    >
      <ul>
        <li>
          <Link href={"/products"} onClick={handleClose}>
            <div>All</div>
            <IoIosArrowForward />
          </Link>
        </li>
        <li>
          <Link href={"/products?category=furnitures"} onClick={handleClose}>
            <div>Furnitures</div>
            <IoIosArrowForward />
          </Link>
        </li>
        <li>
          <Link href={"/products?category=cosmetics"} onClick={handleClose}>
            <div>Cosmetics</div>
            <IoIosArrowForward />
          </Link>
        </li>
        <li>
          <Link href={"/products?category=fashion"} onClick={handleClose}>
            <div>Fashion</div>
            <IoIosArrowForward />
          </Link>
        </li>
      </ul>
      <hr />
    </Box>
  );
}

const Box = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 365px;
  max-width: 80%;
  height: 100vh;

  background-color: #fff;
  color: #000;
  padding: 3rem 2rem;
  z-index: 2000;

  /* move in screen */
  transform: translateX(-100%);
  transition: transform 0.3s;
  &.move-in-screen {
    transform: translateX(0%);
  }

  a {
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    color: #777;
    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
      color: #000;
    }
  }

  @media (max-width: 500px) {
    padding: 1rem;
  }
`;
