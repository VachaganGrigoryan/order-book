import useSWR from "swr";
import { axios } from "@/lib/axios";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStoreContext } from "@/store";
import { z } from "zod";

export const ZUser = z.object({
  username: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
});

export const useUser = () => {
  const state = useStoreContext((state) => ({
    user: state.user,
    setUser: state.setUser,
  }));

  const router = useRouter();

  const { data, error, mutate } = useSWR("/users/me/", (url) =>
    axios
      .get("/users/me/")
      .then((res) => ZUser.parse(res.data))
      .catch((error) => {
        if (error?.response?.status !== 401) throw error;
      }),
  );

  useEffect(() => {
    if (data) {
      state.setUser(data);
    }
    if (error) {
      state.setUser(null);
    }
  }, [data, error]);

  return { user: state.user, mutate };
};
