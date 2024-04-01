import { useSelector } from "react-redux";
import styled from "styled-components";
export default function Loading() {
  const loading = useSelector((store: any) => store.loading);
  if (!loading) return;
  return (
    <Box>
      <div className="spiner"></div>
    </Box>
  );
}
const Box = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  /* border: 2px solid purple; */
  > .spiner {
    width: 50px;
    height: 50px;
    border: 5px solid #ccc;
    border-top-color: green;
    border-radius: 50%;
    animation: spin 0.5s linear infinite;
    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }
`;
