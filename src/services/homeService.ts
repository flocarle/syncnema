import type { Home } from "~/models/Content";
import { axiosClient } from "./axiosClient";

export const get = async ({ userId }: { userId?: string }) => {
  const { data } = await axiosClient.get<Home>(`/`, { params: { userId } });

  return data;
};
