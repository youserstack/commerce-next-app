import Loading from "@/components/layout/Loading";
import Order from "@/components/order/Order";
import { useOrders } from "lib/client/hooks/useOrders";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { styled } from "styled-components";
import { mutate } from "swr";

export default function Orders() {
  const { accessToken: token } = useSelector((store: any) => store.auth);
  const { orders, isLoading } = useOrders(token);

  // 커스텀 로그인 방식인 경우에는 토큰을 서버로부터 받은 후에 다시 요청을 보내야한다.
  // 초기로드시 토큰이 있을시, 키값으로 데이터패칭 (global mutate)
  useEffect(() => {
    if (token) mutate("/api/v2/orders");
  }, [token]);

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
