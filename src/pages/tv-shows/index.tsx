import Layout from "~/components/templates/Layout";
import { type NextPageWithLayout } from "../_app";
import Filter from "~/components/organisms/Filter";
import { useState } from "react";
import { useDebounce } from "~/hooks/useDebounce";
import InfiniteScroll from "react-infinite-scroller";
import ListingCard from "~/components/molecules/ListingCard";
import type { InferGetServerSidePropsType } from "next";
import { QueryClient, dehydrate, useQuery } from "react-query";
import { getSeries } from "~/services/contentService";

type TvShowsProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const TvShows: NextPageWithLayout<TvShowsProps> = () => {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const [page, setPage] = useState(0);

  const {
    data: tvShows,
    isLoading,
    refetch,
  } = useQuery(["series"], () =>
    getSeries({
      genres: selectedGenres,
      platforms: selectedPlatforms,
      query: debouncedSearch,
      page,
    }),
  );

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
        loadMore={async () => {
          setPage((page) => page + 1);
          await refetch();
        }}
        hasMore={tvShows && tvShows.movies.length < tvShows.total}
        loader={<p className="mt-4">Cargando...</p>}
        className="mt-8 flex flex-col items-center justify-center"
      >
        <div className="flex w-full flex-row flex-wrap items-center justify-center gap-4">
          {tvShows?.movies.map((tvShow) => (
            <ListingCard
              key={tvShow.id}
              id={tvShow.id}
              title={tvShow.title}
              imageUrl={tvShow.imageUrl}
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

  await queryClient.prefetchQuery(["series"], () => getSeries({ page: 0 }));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
export default TvShows;
