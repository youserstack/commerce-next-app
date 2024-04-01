import Nav from "@/components/layout/Nav";
import { setBackground } from "lib/client/store/backgroundSlice";
import { setSideMenu } from "lib/client/store/sideMenuSlice";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "styled-components";

export default function Header() {
  const dispatch = useDispatch();
  const background = useSelector((store: any) => store.background);

  const headerRef: any = useRef();
  const [previous, setPrevScrollY]: any = useState(0);

  useEffect(() => {
    window.addEventListener("scroll", (context) => {
      const latest = window.scrollY;
      setPrevScrollY(latest);
      // console.log({ previous, currentScrollY: latest });
      if (previous < latest && latest > 200) {
        // scroll down : previous < latest
        // hidden
        headerRef.current.style.transform = "translateY(-300%)";
        headerRef.current.style.opacity = "0";
        headerRef.current.style.transition = "transform 1s, opacity 1s";
        if (background) {
          dispatch(setBackground(false));
          dispatch(setSideMenu("hidden"));
        }
      } else {
        // scroll up : previous > latest
        // visible
        headerRef.current.style.transform = "translateY(0%)";
        headerRef.current.style.opacity = "1";
        headerRef.current.style.transition = "transform 1s, opacity 1s";
      }
    });
  }, [previous, dispatch]);

  return (
    <Box ref={headerRef}>
      <Nav />
    </Box>
  );
}

const Box = styled.header``;
