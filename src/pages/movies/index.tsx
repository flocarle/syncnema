import Layout from "~/components/templates/Layout";
import { type NextPageWithLayout } from "../_app";
import { useState } from "react";
import Filter from "~/components/organisms/Filter";
import { useDebounce } from "~/hooks/useDebounce";
import ListingCard from "~/components/molecules/ListingCard";
import InfiniteScroll from "react-infinite-scroller";
import { QueryClient, dehydrate, useQuery } from "react-query";
import { getMovies } from "~/services/contentService";
import type { InferGetServerSidePropsType } from "next";

type MovieProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const Movies: NextPageWithLayout<MovieProps> = () => {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const debouncedSearch = useDebounce(search, 500);

  const {
    data: movies,
    isLoading,
    refetch,
  } = useQuery(["movies"], () =>
    getMovies({
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
        hasMore={movies && movies.listing.length < movies.total}
        loader={<p className="mt-4">Cargando...</p>}
        className="mt-8 flex flex-col items-center justify-center"
      >
        <div className="flex w-full flex-row flex-wrap items-center justify-center gap-4">
          {movies?.listing.map((movie) => (
            <ListingCard
              key={"movieListing" + movie.id}
              {...movie}
            ></ListingCard>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

Movies.getLayout = (page) => <Layout title="Películas">{page}</Layout>;

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["movies"], () => getMovies({ page: 0 }));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Movies;
