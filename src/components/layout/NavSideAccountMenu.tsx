import { MdLightMode, MdNightlightRound } from "react-icons/md";
import { setBackground } from "lib/client/store/backgroundSlice";
import { setSideMenu } from "lib/client/store/sideMenuSlice";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { setLoading } from "lib/client/store/loadingSlice";
import { getData } from "lib/client/utils/fetchData";
import { setCredentials } from "lib/client/store/authSlice";
import { useRouter } from "next/router";

export default function NavSideAccountMenu({ theme, toggleTheme }: any) {
  const { data: session } = useSession();
  const { accessToken: token } = useSelector((store: any) => store.auth);
  const sideMenu = useSelector((store: any) => store.sideMenu);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSignout = async () => {
    dispatch(setLoading(true));
    try {
      if (session) {
        await signOut({ redirect: true, callbackUrl: "/" });
      } else if (token) {
        await getData("v3/auth/signout");
        router.push("/");
      }
      dispatch(setCredentials(null));
    } catch (error: any) {
      console.log({ error });
    }
    dispatch(setLoading(false));
    handleClose();
  };

  const handleClose = () => {
    dispatch(setBackground(false));
    dispatch(setSideMenu("hidden"));
  };

  return (
    <Box
      className={`nav-side-account-menu ${
        sideMenu.value === "account-menu" ? "move-in-screen" : "hidden"
      }`}
      onClick={(e) => e.stopPropagation()}
    >
      {(session || token) && (
        <ul>
          <li>
            <Link href={"/my/account"} onClick={handleClose}>
              <div>My Account</div>
              <IoIosArrowForward />
            </Link>
          </li>
          <li>
            <Link href={"/my/orders"} onClick={handleClose}>
              <div>Order List</div>
              <IoIosArrowForward />
            </Link>
          </li>
          <li>
            <button className="general-button" onClick={handleSignout}>
              Sign out
            </button>
          </li>
        </ul>
      )}

      {!(session || token) && (
        <ul>
          <li>
            <Link href={"/auth/signin"} onClick={handleClose}>
              <div>Sign in</div>
              <IoIosArrowForward />
            </Link>
          </li>
          <li>
            <Link href={"/auth/signup"} onClick={handleClose}>
              <div>Sign up</div>
              <IoIosArrowForward />
            </Link>
          </li>
        </ul>
      )}

      <ul>
        <li
          className="theme"
          onClick={() => {
            toggleTheme();
            handleClose();
          }}
        >
          <div className="theme-icon" style={{ color: theme === "dark" ? "#ff9800" : "gray" }}>
            <MdNightlightRound />
            Dark
          </div>
          <div className="theme-icon" style={{ color: theme === "light" ? "#ff9800" : "gray" }}>
            <MdLightMode />
            Light
          </div>
        </li>
      </ul>
    </Box>
  );
}

const Box = styled.div`
  position: fixed;
  top: 0;
  /* left: 0; */
  right: 0;
  width: 365px;
  max-width: 80%;
  height: 100vh;

  background-color: #fff;
  color: #000;
  padding: 3rem 2rem;
  z-index: 2000;

  /* move in screen */
  transform: translateX(100%);
  transition: transform 0.3s;
  &.move-in-screen {
    transform: translateX(0%);
  }

  a {
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    color: #777;
    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
      color: #000;
    }
  }

  button {
    width: 100%;
    margin-top: 1rem;
  }

  .theme {
    cursor: pointer;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    gap: 1rem;
    background-color: #ddd;
    border-radius: 5px;
    margin-top: 1rem;

    .theme-icon {
      display: flex;
      align-items: center;
      gap: 5px;
    }

    svg {
      font-size: 24px;
    }
  }

  @media (max-width: 500px) {
    padding: 1rem;
  }
`;
