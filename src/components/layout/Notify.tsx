import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { setNotify } from "lib/client/store/notifySlice";
import styled from "styled-components";
// import { setTimeoutId, setVisible } from "lib/client/store/notifySlice";

export default function Notify() {
  const notify = useSelector((store: any) => store.notify);
  const { active, status, message } = notify;
  const dispatch = useDispatch();
  // useEffect(() => {
  //   if (notify.active) {
  //     const timeoutId = setTimeout(() => {
  //       dispatch(setNotify({ active: false }));
  //     }, 3000);
  //   }
  //   // dispatch(setTimeoutId(timeoutId));
  // }, [notify.active]);

  if (!notify.active) return;
  return (
    <>
      <Box status={status}>
        {/* <div onMouseOver={() => clearTimeout(notify.timeoutId)}>
        </div> */}
        <p>{message || "empty"}</p>
        <button onClick={() => dispatch(setNotify({ active: false }))}>close</button>
      </Box>
    </>
  );
}

type Props = {
  // active: boolean;
  status: "success" | "error" | null;
};

const Box = styled.div<Props>`
  width: 15rem;
  height: 8rem;
  position: fixed;
  top: 50px;
  margin-top: 1rem;
  background-color: #000;
  right: 1rem;
  border-radius: 10px;
  transition: all 1s;
  padding: 1rem;
  color: ${({ status }) => {
    if (status === "success") return "green";
    if (status === "error") return "red";
  }};
  border: 2px solid
    ${({ status }) => {
      if (status === "success") return "green";
      if (status === "error") return "red";
    }};
  > button {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background-color: inherit;
    color: white;
    &:hover {
      background-color: inherit;
      color: green;
    }
  }
`;
