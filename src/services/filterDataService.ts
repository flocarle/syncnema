import { axiosClient } from "./axiosClient";

export const allGenres = async () => {
  const { data } = await axiosClient.get<string[]>("/genres");

  return data;
};

export const allPlatforms = async () => {
  const { data } = await axiosClient.get<string[]>("/platforms");

  return data;
};
