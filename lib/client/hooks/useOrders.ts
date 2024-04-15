import axios from "axios";
import useSWR from "swr";

export const useOrders = (token: any) => {
  const { data, error, isLoading } = useSWR(`/api/v2/orders`, async (url: any) => {
    const response = await axios.get(url, {
      headers: { Authorization: `bearer ${token}` },
    });
    return response.data.orders;
  });

  return {
    orders: data,
    isLoading,
    isError: error,
  };
};
