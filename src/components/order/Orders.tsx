import Loading from "@/components/layout/Loading";
import Order from "@/components/order/Order";
import { useOrders } from "lib/client/hooks/useOrders";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { styled } from "styled-components";
import { mutate } from "swr";

export default function Orders() {
  const auth = useSelector((store: any) => store.auth);
  const { orders, isLoading } = useOrders(auth.accessToken);

  // 초기로드시 토큰이 있을시, 키값으로 데이터패칭
  useEffect(() => {
    if (auth.accessToken) mutate("/api/v2/orders");
  }, [auth.accessToken]);

  if (isLoading) return <Loading />;

  return (
    <Box>
      {orders?.map((order: any) => (
        <Order key={order._id} order={order} />
      ))}
    </Box>
  );
}

const Box = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
