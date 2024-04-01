import { Fragment } from "react";
import { IoStar } from "react-icons/io5";
import styled from "styled-components";

interface Props {
  number?: number;
}

export default function Stars({ number }: Props) {
  return (
    <Box>
      {Array(number)
        .fill(<IoStar color="#C7511F" />)
        .map((star: any, index: number) => (
          <Fragment key={index}>{star}</Fragment>
        ))}
    </Box>
  );
}

const Box = styled.div``;
