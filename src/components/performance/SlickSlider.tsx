import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { setModal } from "lib/client/store/modalSlice";
import { useRef } from "react";
import styled from "styled-components";
import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Props {
  items?: any[];
  itemSize?: any;
  sliderSize?: any;
  actionType?: string;
  settings?: any;
}

export default function SlickSlider({ items, itemSize, sliderSize, actionType, settings }: Props) {
  const sliderRef: any = useRef();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleClickImage = (itemId: string, imageUrl: string) => {
    console.log({ actionType });
    if (!actionType) return;
    if (actionType === "Link") router.push(`/products/${itemId}`);
    if (actionType === "VIEW") dispatch(setModal({ type: "VIEW", data: imageUrl }));
  };

  return (
    <Box style={{ height: sliderSize?.height || itemSize.height }}>
      <Slider ref={sliderRef} arrows={false} {...settings}>
        {items?.map((item: any) => (
          <div key={item.id} className="img-outer">
            <Image
              src={item.url}
              width={itemSize.width}
              height={itemSize.height}
              alt="alt"
              onClick={() => handleClickImage(item.id, item.url)}
            />
            {item.text && (
              <div className="overlay">
                <h1>{item.text}</h1>
              </div>
            )}
          </div>
        ))}
      </Slider>

      <div className="slick-slider-controller">
        <button className="prev arrow" onClick={() => sliderRef.current.slickPrev()}>
          <IoIosArrowBack size={20} color="#fff" />
        </button>
        <button className="next arrow" onClick={() => sliderRef.current.slickNext()}>
          <IoIosArrowForward size={20} color="#fff" />
        </button>
      </div>
    </Box>
  );
}

const Box = styled.div`
  position: relative;

  .img-outer {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    &:hover {
      .overlay {
        display: block;
      }
      img {
        transform: scale(1.1);
      }
    }

    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: none;
      background-color: rgba(0, 0, 0, 0.5);
      pointer-events: none;
      padding: 1rem;
    }

    img {
      cursor: pointer;
    }

    img,
    .overlay {
      transition: all 0.5s;
    }
  }

  .slick-slider {
    height: 100%;
    position: relative;
    color: #fff;

    .slick-list {
      height: 100%;

      .slick-track {
        height: 100%;

        .slick-slide {
          height: 100%;
          overflow: hidden;

          div {
            height: 100%;
          }
        }
      }
    }

    .slick-dots {
      position: absolute;
      bottom: 1rem;
      pointer-events: none;
      display: flex !important;
      justify-content: center;
      align-items: center;
      gap: 1rem;

      li {
        pointer-events: auto;

        button::before {
          font-size: 1rem;
          color: #ddd;
        }
      }

      button:hover {
        background-color: initial;
      }
    }
  }

  .slick-slider-controller {
    .arrow {
      height: 100%;
    }

    .prev {
      width: 5rem;
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
    }

    .next {
      width: 5rem;
      position: absolute;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
    }

    button:hover {
      background-color: initial;
    }
  }
`;
