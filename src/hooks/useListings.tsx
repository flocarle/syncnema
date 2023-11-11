import { useInfiniteQuery } from "@tanstack/react-query";
import type { Content, ContentList, ContentType } from "~/models/Content";
import { PAGE_SIZE, getListings } from "~/services/contentService";

type UseListingsParams = {
  genres?: string[];
  platforms?: string[];
  query?: string;
};

export const useListings = (
  type: ContentType,
  { genres, platforms, query }: UseListingsParams,
) => {
  const queryTypeKey = (type.toLocaleLowerCase() + "s") as "movies" | "series";

  const result = useInfiniteQuery<ContentList>({
    queryKey: [queryTypeKey, query, genres, platforms],
    queryFn: ({ pageParam }) =>
      getListings({
        type,
        genres,
        platforms,
        query,
        page: pageParam as number,
      }),
    initialPageParam: 0,
    getNextPageParam: ({ page, total }) =>
      (page + 1) * PAGE_SIZE < total ? page + 1 : undefined,
  });

  const listings =
    result.data?.pages.reduce(
      (prevListings: Content[], page) => prevListings.concat(page.records),
      [],
    ) ?? [];

  return { ...result, listings };
};
