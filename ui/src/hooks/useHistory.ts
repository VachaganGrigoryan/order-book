import { useEffect, useState } from "react";
import useSWR from "swr";
import { axios } from "@/lib/axios";
import { z } from "zod";

type OrderBook = {
  id: number;
  stock_name: string;
  order_type: string;
  price: number;
};

type History = {
  id: number;
  order: OrderBook;
  quantity: number;
  created_at: string;
};
export const OrderBookValidator = z.array(
  z.object({
    id: z.number(),
    order: z.object({
      id: z.number(),
      stock_name: z.string(),
      order_type: z.string(),
      price: z.number(),
    }),
    quantity: z.number(),
    created_at: z.string(),
  }),
);

export default function useHistory() {
  const [histories, setOrderBook] = useState<History[]>([]);
  const [error, setError] = useState("");

  const {
    data,
    error: err,
    mutate,
  } = useSWR("/order-book/history/", (url) =>
    axios
      .get("/order-book/history/")
      .then((res) => OrderBookValidator.parse(res.data))
      .catch((error) => {
        if (error?.response?.status !== 401) throw error;
      }),
  );

  useEffect(() => {
    if (data) {
      setOrderBook(data);
    }
    if (err) {
      setError(err);
    }
  }, [data, err]);

  return { histories, error, mutate };
}
