import type { Favourite } from "~/models/Favourites";
import { axiosClient } from "./axiosClient";

export const add = async ({
  contentId,
  userId,
}: {
  contentId: string;
  userId: string;
}) => {
  await axiosClient.post<{ message: string }>("/favourites", {
    favourite: {
      contentId,
      userId,
    },
  });
};

export const remove = async ({
  contentId,
  userId,
}: {
  contentId: string;
  userId: string;
}) => {
  await axiosClient.delete<{ message: string }>(
    `/favourites?content_id=${contentId}&user_id${userId}`,
  );
};

export const get = async ({ userId }: { userId: string }) => {
  const { data } = await axiosClient.get<Favourite>(
    `/favourites?user_id=${userId}`,
  );

  return data;
};
