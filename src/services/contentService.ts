import { axiosClient } from "./axiosClient";
import type { ContentDetail, List } from "~/models/Content";

export const getMovies = async (props: {
  query?: string;
  platforms?: string[];
  genres?: string[];
  sortBy?: string[];
  page?: number;
}) => {
  const { data } = await axiosClient.get<List>(`/movies`, {
    params: {
      ...props,
    },
  });

  return data;
};

export const getSeries = async (props: {
  query?: string;
  platforms?: string[];
  genres?: string[];
  sortBy?: string[];
  page?: number;
}) => {
  const { data } = await axiosClient.get<List>(`/series`, {
    params: {
      ...props,
    },
  });

  return data;
};

export const byId = async ({ id }: { id: string; userId?: string }) => {
  const { data } = await axiosClient.get<ContentDetail>(`/content/${id}`);

  return data;
};
