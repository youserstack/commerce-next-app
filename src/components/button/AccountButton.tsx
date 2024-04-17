import { setBackground } from "lib/client/store/backgroundSlice";
import { setSideMenu } from "lib/client/store/sideMenuSlice";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "styled-components";
import { FcGlobe } from "react-icons/fc";
import { useRouter } from "next/router";
import { getData } from "lib/client/utils/fetchData";
import { unsetCredentials, setCredentials } from "lib/client/store/authSlice";

export default function AccountButton() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { data: session } = useSession();
  const { user, accessToken: token } = useSelector((store: any) => store.auth);

  const handleClick = () => {
    dispatch(setBackground(true));
    dispatch(setSideMenu("account-menu"));
  };

  return (
    <Box className="account-button">
      {/* 미인증시 */}
      {!(session || token) && (
        <>
          <FcGlobe size={30} onClick={handleClick} />
          <div className="hover-menu">
            <div className="arrow" />
            <Link href={"/auth/signin"}>Sign in</Link>
            <Link href={"/auth/signup"}>Sign up</Link>
          </div>
        </>
      )}

      {/* 인증시 */}
      {(session || token) && (
        <>
          {user?.image && (
            <Image src={user.image} alt="alt" width={100} height={100} onClick={handleClick} />
          )}
          {!user?.image && <FcGlobe size={30} onClick={handleClick} />}
          <div className="hover-menu">
            <div className="arrow" />
            <Link href={"/my/account"}>
              <p>My Account</p>
            </Link>
            {user?.role === "user" && (
              <Link href={"/my/orders"}>
                <p>Order List</p>
              </Link>
            )}
            <div className="partition"></div>
            <button
              onClick={async () => {
                if (session) await signOut({ redirect: false });
                if (token) await getData("v3/auth/signout");
                dispatch(unsetCredentials());
                router.push("/");
              }}
            >
              Sign out
            </button>
          </div>
        </>
      )}
    </Box>
  );
}

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 100%;
  padding: 10px;
  cursor: pointer;
  &:hover .hover-menu {
    display: block;
  }

  .hover-menu {
    position: absolute;
    top: 100%;
    white-space: nowrap;
    padding: 1rem;
    display: none;
    &:hover {
      display: block;
    }

    .arrow {
      width: 0.7rem;
      height: 0.7rem;
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%) translateY(-50%) rotate(45deg);
      pointer-events: none;
    }

    p {
      display: flex;
      align-items: center;
    }

    a,
    button {
      width: 100%;
      padding: 1rem;
      background-color: inherit;
      text-align: start;
      &:hover {
        background-color: rgba(0, 0, 0, 0.2);
      }
    }

    .partition {
      border-bottom-width: 1px;
      border-bottom-style: solid;
      margin: 1rem 0;
    }
  }
`;
