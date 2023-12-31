import Layout from "~/components/templates/Layout";
import { type NextPageWithLayout } from "../_app";
import { useState } from "react";
import Filter from "~/components/organisms/Filter";
import { useDebounce } from "~/hooks/useDebounce";
import ListingCard from "~/components/molecules/ListingCard";
import InfiniteScroll from "react-infinite-scroller";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import type { InferGetServerSidePropsType } from "next";
import { useListings } from "~/hooks/useListings";
import { getListings } from "~/services/contentService";
import { allGenres, allPlatforms } from "~/services/filterDataService";

type MovieProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const Movies: NextPageWithLayout<MovieProps> = () => {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 500);

  const {
    listings: movies,
    isLoading,
    hasNextPage,
    fetchNextPage,
  } = useListings("Movie", {
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
          {movies.map(({ record: movie }) => (
            <ListingCard
              key={"movieListing" + movie.id}
              type="Movie"
              {...movie}
            />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

Movies.getLayout = (page) => <Layout title="Películas">{page}</Layout>;

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["movies", "", [], []],
    queryFn: ({ pageParam }) =>
      getListings({
        type: "Movie",
        page: pageParam,
      }),
    initialPageParam: 0,
  });

  await queryClient.prefetchQuery({
    queryKey: ["genres"],
    queryFn: () => allGenres(),
  });

  await queryClient.prefetchQuery({
    queryKey: ["platforms"],
    queryFn: () => allPlatforms(),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Movies;
