import { axiosClient } from "./axiosClient";
import type { ContentDetail, ContentList, ContentType } from "~/models/Content";

type ContentProps = {
  query?: string;
  platforms?: string[];
  genres?: string[];
  page?: number;
  type: ContentType;
};

export const PAGE_SIZE = 20;

export const getListings = async (props: ContentProps) => {
  const { data } = await axiosClient.get<ContentList>("/contents", {
    params: {
      type: props.type,
      size: PAGE_SIZE,
      platforms: JSON.stringify(props.platforms),
      genres: JSON.stringify(props.genres),
      query: props.query !== "" ? props.query : undefined,
    },
  });

  return data;
};

export const byId = async ({ id, userId }: { id: string; userId?: string }) => {
  const { data } = await axiosClient.get<ContentDetail>(`/contents/${id}`, {
    params: {
      userId: userId ?? undefined,
    },
  });

  return data;
};
