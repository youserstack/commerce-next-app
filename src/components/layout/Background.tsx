import { setBackground } from "lib/client/store/backgroundSlice";
import { setSideMenu } from "lib/client/store/sideMenuSlice";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

export default function Background() {
  const dispatch = useDispatch();
  const background = useSelector((store: any) => store.background);

  if (!background) return null;

  return (
    <Box
      className={`background ${background ? "visible" : ""}`}
      onClick={() => {
        dispatch(setBackground(false));
        dispatch(setSideMenu("hidden"));
      }}
    />
  );
}

const Box = styled.div`
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

  /* visible */
  /* visibility: hidden;
  transition: visibility 0.2s;
  z-index: 1000;
  &.visible {
    visibility: visible;
  } */
`;

// const BoxWithChildren = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100vw;
//   height: 100vh;
//   background-color: rgba(0, 0, 0, 0.7);

//   visibility: hidden;
//   transition: visibility 0.2s;
//   z-index: 10000000;
//   &.visible {
//     visibility: visible;
//   }

//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;
