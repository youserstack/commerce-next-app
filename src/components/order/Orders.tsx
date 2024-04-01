import Order from "@/components/order/Order";
import { styled } from "styled-components";

export default function Orders({ orders }: any) {
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
