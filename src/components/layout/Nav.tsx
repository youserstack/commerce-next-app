import Link from "next/link";
import { styled } from "styled-components";
import { IoIosGlobe, IoIosMenu } from "react-icons/io";
import AccountButton from "@/components/button/AccountButton";
import { FaCartShopping } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import Search from "@/components/layout/Search";
import { setSideMenu } from "lib/client/store/sideMenuSlice";
import { setBackground } from "lib/client/store/backgroundSlice";

export default function Nav() {
  const cart = useSelector((store: any) => store.cart);
  const dispatch = useDispatch();

  const handleClickHamburgerButton = () => {
    dispatch(setBackground(true));
    dispatch(setSideMenu("product-menu"));
  };

  return (
    <Box>
      <div className="nav-upper">
        <section className="nav-upper-section">
          <Link href={"/"}>
            <IoIosGlobe size={30} />
          </Link>
          <Search />
          <AccountButton />
        </section>
      </div>
      <div className="nav-lower">
        <section className="nav-lower-section">
          <button className="nav-hamburger" onClick={handleClickHamburgerButton}>
            <IoIosMenu />
            <span>All</span>
          </button>
          <Link href={"/cart"}>
            <FaCartShopping /> <pre> ({cart.products?.length})</pre>
          </Link>
        </section>
      </div>
    </Box>
  );
}

const Box = styled.nav`
  .nav-upper {
    .nav-upper-section {
      height: 60px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  .nav-lower {
    .nav-lower-section {
      max-width: 1000px;
      height: 40px;
      margin: auto;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .nav-hamburger {
        display: flex;
        gap: 1rem;

        height: 100%;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0 1rem;
      }
    }
  }

  a {
    display: flex;
    align-items: center;
  }
`;
