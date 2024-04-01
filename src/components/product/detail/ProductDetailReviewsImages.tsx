import SlickSlider from "@/components/performance/SlickSlider";
import { useEffect, useState } from "react";
import styled from "styled-components";

export default function ProductDetailReviewsImages({ product }: any) {
  const [deviceEnv, setDeviceEnv] = useState("web");

  const items = product.reviews
    ?.filter((review: any) => review.images.length !== 0)
    .map((review: any) => ({
      id: review._id,
      url: review.images[0]?.url,
      text: review.name,
    }));
  // 내림차순 정렬
  const sortedItems = items.sort((a: any, b: any) => items.indexOf(b) - items.indexOf(a));

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 500) {
        setDeviceEnv("mobile");
      } else if (window.innerWidth <= 1000) {
        setDeviceEnv("tablet");
      } else {
        setDeviceEnv("web");
      }
    };

    // 페이지 로드 및 화면 크기 변경 이벤트에 대한 이벤트 리스너 등록
    handleResize(); // 페이지 로드시 초기 설정 적용
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Box className="reviews-with-images">
      <h1>Reviews with images</h1>
      <SlickSlider
        items={sortedItems}
        itemSize={{
          width: 300,
          height: 200,
        }}
        settings={
          deviceEnv === "mobile"
            ? {
                slidesToShow: 1,
                slidesToScroll: 1,
              }
            : deviceEnv === "tablet"
            ? {
                slidesToShow: 2,
                slidesToScroll: 2,
              }
            : deviceEnv === "web"
            ? {
                slidesToShow: 3,
                slidesToScroll: 3,
              }
            : {}
        }
        actionType="VIEW"
      />
    </Box>
  );
}

const Box = styled.div``;
