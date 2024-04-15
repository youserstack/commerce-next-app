import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { styled } from "styled-components";
import { IoIosSearch } from "react-icons/io";
import { useDispatch } from "react-redux";
import { setBackground } from "lib/client/store/backgroundSlice";

export default function Search() {
  // external
  const dispatch = useDispatch();

  // internal
  const [isFocused, setIsFocused] = useState(false);
  const [search, setSearch] = useState("");
  const router = useRouter();

  // const searchRef: any = useRef();
  // useEffect(() => searchRef.current.focus(), []);

  const [previous, setPrevScrollY]: any = useState(0);

  useEffect(() => {
    window.addEventListener("scroll", (context) => {
      const latest = window.scrollY;
      setPrevScrollY(latest);

      // scroll down : previous < latest
      if (previous < latest && latest > 200) {
        // hidden
        // dispatch(setBackground(false));
        setIsFocused(false);
      }
    });
  }, [previous, dispatch]);

  return (
    <Box className="search">
      {isFocused && <Background onClick={() => setIsFocused(false)} />}
      <div className={`search-form ${isFocused ? "outline" : ""}`}>
        <input
          type="text"
          value={search}
          placeholder="Search"
          // ref={searchRef}
          // onClick={(e) => {
          //   console.log("onClick");
          //   e.stopPropagation();
          //   dispatch(setBackground(true));
          //   setIsFocused(true);
          // }}
          onFocus={() => setIsFocused(true)}
          onChange={(e: any) => setSearch(e.target.value)}
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            dispatch(setBackground(false));
            if (!search) return router.push("/products");
            router.query.search = search;
            router.push({ pathname: "/products", query: router.query });
            console.log({ router });
            setIsFocused(false);
          }}
        >
          <IoIosSearch size={20} color="#000" />
        </button>
      </div>
    </Box>
  );
}

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled.form`
  flex: 0.5;
  background-color: transparent;
  .search-form {
    display: flex;
    border-radius: 5px;
    overflow: hidden;
    position: relative;
    z-index: 2000;
    &.outline {
      box-shadow: 0 0 0 2px coral;
    }

    input {
      flex: 1;
      width: 100%;
      min-width: 10rem;
      outline: none;
      border: none;
      padding: 10px;

      appearance: none;
      -webkit-appearance: none;
    }

    button {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      height: 100%;
      background-color: #eee;

      &:hover {
        background-color: #67b34bb3;
      }
    }
  }
`;
