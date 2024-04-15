import { setBackground } from "lib/client/store/backgroundSlice";
import { setSideMenu } from "lib/client/store/sideMenuSlice";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "styled-components";
import { FcGlobe } from "react-icons/fc";
import { signout } from "lib/client/utils/authUtils";
import { useRouter } from "next/router";

export default function AccountButton() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { data: session } = useSession();
  const { user, accessToken: token } = useSelector((store: any) => store.auth);

  return (
    <Box className="account-icon">
      <div
        className="avatar"
        onClick={() => {
          dispatch(setBackground(true));
          dispatch(setSideMenu("account-menu"));
        }}
      >
        {/* 인증하고 이미지 존재시 */}
        {(session || token) && user && user.image ? (
          <Image src={user?.image} alt="alt" width={100} height={100} />
        ) : (
          <FcGlobe size={30} />
        )}
      </div>

      {/* 인증시 */}
      {(session || token) && (
        <div className="account-icon-hover-menu">
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
            onClick={() => {
              signout(dispatch, { session, token });
              router.push("/");
            }}
          >
            Sign out
          </button>
        </div>
      )}

      {/* 미인증시 */}
      {!(session || token) && (
        <div className="account-icon-hover-menu">
          <div className="arrow" />
          <Link href={"/auth/signin"}>Sign in</Link>
          <Link href={"/auth/signup"}>Sign up</Link>
        </div>
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
  border: 1px solid red;
  &:hover .account-icon-hover-menu {
    display: block;
  }

  .avatar {
    overflow: hidden;
    cursor: pointer;
    display: flex;

    img {
      width: 30px;
      height: 30px;
    }
  }

  .account-icon-hover-menu {
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
