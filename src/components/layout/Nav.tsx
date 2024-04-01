import Link from "next/link";
import { styled } from "styled-components";
import { IoIosGlobe, IoIosMenu } from "react-icons/io";
import AccountIcon from "@/components/auth/AccountIcon";
import { FaCartShopping } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import Search from "@/components/layout/Search";
import { setSideMenu } from "lib/client/store/sideMenuSlice";
import { setBackground } from "lib/client/store/backgroundSlice";

export default function Nav() {
  // external
  const cart = useSelector((store: any) => store.cart);
  const dispatch = useDispatch();

  const handleClickHamburgerButton = () => {
    dispatch(setBackground(true));
    dispatch(setSideMenu("product-menu"));
  };

  return (
    <Box>
      <div className="nav-upper  section-outer">
        <section className="nav-belt">
          <div className="nav-belt-left">
            <div className="nav-logo">
              <Link href={"/"}>
                <IoIosGlobe size={30} />
              </Link>
            </div>
          </div>
          <div className="nav-belt-center">
            <Search />
          </div>
          <div className="nav-belt-right">
            <AccountIcon />
            {/* <div id="nav-tools">
            <div id="nav-account"></div>
            <div id="nav-orders"></div>
            <div id="nav-cart">
              <span id="nav-cart-count"></span>
              <span id="nav-cart-icon"></span>
            </div>
          </div> */}
          </div>
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
    .nav-belt {
      height: 60px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .nav-belt-left {
        .nav-logo {
          height: 100%;
        }
      }

      .nav-belt-center {
        flex: 0.5;
        background-color: transparent;
      }

      .nav-belt-right {
        height: 100%;
        display: flex;

        > * {
          height: 100%;
        }
      }
      a {
        padding: 1rem;
      }
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
    padding: 0.5rem;
  }
`;
