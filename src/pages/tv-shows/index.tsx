import Layout from "~/components/templates/Layout";
import { type NextPageWithLayout } from "../_app";
import Filter from "~/components/organisms/Filter";
import { useState } from "react";
import { useDebounce } from "~/hooks/useDebounce";
import InfiniteScroll from "react-infinite-scroller";
import ListingCard from "~/components/molecules/ListingCard";
import type { InferGetServerSidePropsType } from "next";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { useListings } from "~/hooks/useListings";
import { getListings } from "~/services/contentService";

type TvShowsProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const TvShows: NextPageWithLayout<TvShowsProps> = () => {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 500);

  const {
    listings: tvShows,
    isLoading,
    hasNextPage,
    fetchNextPage,
  } = useListings("Serie", {
    genres: selectedGenres,
    platforms: selectedPlatforms,
    query: debouncedSearch,
  });

  if (isLoading) <p className="mt-4">Cargando...</p>;

  return (
    <div>
      <Filter
        selectedGenres={selectedGenres}
        selectedPlatforms={selectedPlatforms}
        search={search}
        setSelectedGenres={setSelectedGenres}
        setSelectedPlatforms={setSelectedPlatforms}
        setSearch={setSearch}
      />

      <InfiniteScroll
        loadMore={() => fetchNextPage()}
        hasMore={hasNextPage}
        loader={<p className="mt-4">Cargando...</p>}
        className="mt-8 flex flex-col items-center justify-center"
        threshold={350}
      >
        <div className="flex w-full flex-row flex-wrap items-center justify-center gap-4">
          {tvShows?.map(({ record: tvShow }) => (
            <ListingCard
              key={"tvShowListing" + tvShow.id}
              {...tvShow}
              type="Serie"
            />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

TvShows.getLayout = (page) => <Layout title="Series">{page}</Layout>;

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["series"],
    queryFn: ({ pageParam }) =>
      getListings({
        type: "Serie",
        page: pageParam,
      }),
    initialPageParam: 0,
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
export default TvShows;
