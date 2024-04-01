import { setModal } from "lib/client/store/modalSlice";
import Image from "next/image";
import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

interface Props {
  images?: any;
}

export default function ImageViewer({ images }: Props) {
  // set the image index
  const [tabIndex, setTabIndex]: any = useState(0);
  const dispatch = useDispatch();

  return (
    <Box className="image-viewer">
      <div className="selected-image">
        <Image
          src={images[tabIndex].url || images[tabIndex].secure_url}
          alt={images[tabIndex].url || images[tabIndex].secure_url}
          width={500}
          height={500}
          onClick={() =>
            dispatch(
              setModal({
                active: true,
                type: "VIEW_IMAGE",
                src: images[tabIndex].url || images[tabIndex].secure_url,
              })
            )
          }
        />
      </div>
      <div className="unselected-images">
        {images.map((image: any, index: any) => (
          <Image
            className={`${index === tabIndex ? "active" : ""}`}
            key={index}
            src={image.url || image.secure_url}
            alt={image.url || image.secure_url}
            width={500}
            height={500}
            onMouseEnter={() => setTabIndex(index)}
            // onClick={() => setTabIndex(index)}
            onClick={() =>
              dispatch(
                setModal({
                  active: true,
                  type: "VIEW_IMAGE",
                  src: image.url || image.secure_url,
                })
              )
            }
          />
        ))}
      </div>
    </Box>
  );
}

const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  .selected-image {
    height: 20rem;
  }
  .unselected-images {
    display: flex;
    gap: 0.5rem;
    > img {
      width: 3rem;
      height: 3rem;
    }
    .active {
      outline: 2px solid black;
    }
  }
  img {
    cursor: pointer;
  }
`;
