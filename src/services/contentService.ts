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
  const { data } = await axiosClient.get<ContentList>(`/contents`, {
    params: {
      size: PAGE_SIZE,
      ...props,
      query: props.query !== "" ? props.query : undefined,
    },
  });

  return data;
};

export const byId = async ({ id }: { id: string; userId?: string }) => {
  const { data } = await axiosClient.get<ContentDetail>(`/contents/${id}`);

  return data;
};
