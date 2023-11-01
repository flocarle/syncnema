import { axiosClient } from "./axiosClient";
import type { ContentDetail, Movies, Series } from "~/models/Content";

export const getMovies = async (
  query: string,
  platforms: string,
  genres: string,
  sortBy: string,
  page: string,
) => {
  const { data } = await axiosClient.get<Movies>(
    `/movies?query=${query}&platforms=${platforms}&genres=${genres}&sortBy=${sortBy}&page=${page}`,
  );

  return data;
};

export const get = async (
  query: string,
  platforms: string,
  genres: string,
  sortBy: string,
  page: string,
) => {
  const { data } = await axiosClient.get<Series>(
    `/series?query=${query}&platforms=${platforms}&genres=${genres}&sortBy=${sortBy}&page=${page}`,
  );

  return data;
};

export const byId = async (id: string) => {
  const { data } = await axiosClient.get<ContentDetail>(`/content/${id}`);

  return data;
};
