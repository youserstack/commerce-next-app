import Image from "next/image";
import { styled } from "styled-components";
export default function Avatar({ image }: any) {
  return (
    <Box className="avatar">
      <Image
        src={image || "/images/placeholder.jpg"}
        alt="profile-image"
        width={300}
        height={300}
      />
      {/* <Image src={image||'/placeholder.jpg'} alt="profile-image" width={300} height={300} /> */}
    </Box>
  );
}
const Box = styled.div`
  width: 12rem;
  height: 12rem;
  border: 5px solid;
  border-radius: 50%;
  img {
    border-radius: 50%;
  }
`;
