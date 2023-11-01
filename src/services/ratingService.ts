import { axiosClient } from "./axiosClient";

export const add = async ({
  userId,
  contentId,
  score,
}: {
  userId: string;
  contentId: string;
  score: number;
}) =>
  await axiosClient.post<{ message: string }>("/ratings", {
    rating: {
      userId,
      contentId,
      score,
    },
  });

export const update = async ({
  userId,
  contentId,
  score,
}: {
  userId: string;
  contentId: string;
  score: number;
}) =>
  await axiosClient.put<{ message: string }>(`/ratings`, {
    rating: {
      userId,
      contentId,
      score,
    },
  });
