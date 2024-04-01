import axios from "axios";
import { MdLightMode, MdNightlightRound } from "react-icons/md";
import { setBackground } from "lib/client/store/backgroundSlice";
import { setSideMenu } from "lib/client/store/sideMenuSlice";
import { signout } from "lib/client/utils/authUtils";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

export default function NavSideAccountMenu({ theme, toggleTheme }: any) {
  // external
  const { data: session } = useSession();
  const { accessToken: token } = useSelector((store: any) => store.auth);
  const sideMenu = useSelector((store: any) => store.sideMenu);
  const dispatch = useDispatch();

  const handleSignout = () => {
    signout(dispatch, { session, token });
    handleClose();
  };

  const handleClose = () => {
    dispatch(setBackground(false));
    dispatch(setSideMenu("hidden"));
  };

  if (session || token) {
    return (
      <Box
        className={`nav-side-account-menu ${
          sideMenu.value === "account-menu" ? "move-in-screen" : "hidden"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
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
          <button className="general-button" onClick={handleSignout}>
            Sign out
          </button>
          {/* <button
            className="general-button"
            onClick={async (e) => {
              e.preventDefault();
              try {
                const response = await axios({
                  url: "http://localhost:3000/api/disconnect",
                });
                console.log({ response });
              } catch (error) {
                console.log({ error });
              }
            }}
          >
            DisconnectDB
          </button> */}
          <div
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
          </div>
        </ul>
      </Box>
    );
  }

  return (
    <Box
      className={`nav-side-account-menu ${
        sideMenu.value === "account-menu" ? "move-in-screen" : ""
      }`}
      onClick={(e) => e.stopPropagation()}
    >
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
      <br />
      <div
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
      </div>
      {/* <input
        type="checkbox"
        id="toggle-input"
        className="toggle-input"
        onClick={() => {
          toggleTheme();
          // handleClose();
        }}
      />
      <label htmlFor="toggle-input" className="toggle-button">
        <div className="circle" />
      </label> */}
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
    /* padding: 1rem; */
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
    /* border: 1px solid; */
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

  .toggle-input {
    display: none;
  }
  .toggle-button {
    width: 70px;
    height: 30px;

    display: flex;
    align-items: center;
    /* width: 100%; */
    border: 1px solid;
    border-radius: 20px;
    /* background-color: #777; */
    position: relative;

    cursor: pointer;

    .circle {
      width: 30px;
      height: 20px;
      background-color: black;
      border-radius: 20px;

      position: absolute;
      margin: 5px;

      transition: all 0.2s;
    }
  }

  .toggle-input:checked + .toggle-button {
    background-color: green;

    .circle {
      transform: translateX(30px);
    }
  }

  @media (max-width: 500px) {
    padding: 1rem;
  }
`;
