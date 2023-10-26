import Layout from "~/components/templates/Layout";
import { type NextPageWithLayout } from "../_app";
import Filter from "~/components/organisms/Filter";
import { useState } from "react";
import { useDebounce } from "~/hooks/useDebounce";
import InfiniteScroll from "react-infinite-scroller";
import ListingCard from "~/components/molecules/ListingCard";

const getTvShows = (length: number) =>
  Array.from({ length }).map((_, index) => ({
    id: index.toString(),
    imageUrl: "https://image.tmdb.org/t/p/w500/9ijMGlJKqcslswWUzTEwScm82Gs.jpg",
    name: "The Walking Dead",
  }));

const TvShows: NextPageWithLayout = () => {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [search, setSearch] = useState("");

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const debouncedSearch = useDebounce(search, 500);

  const [tvShows, setTvShow] = useState(getTvShows(20));

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
          const newTvShows = getTvShows(20);
          await new Promise((resolve) => setTimeout(resolve, 2000));
          setTvShow([...tvShows, ...newTvShows]);
        }}
        hasMore={true}
        loader={<p className="mt-4">Cargando...</p>}
        className="mt-8 flex flex-col items-center justify-center"
      >
        <div className="flex w-full flex-row flex-wrap items-center justify-center gap-4">
          {tvShows.map((tvShow) => (
            <ListingCard
              key={tvShow.id}
              id={tvShow.id}
              name={tvShow.name}
              imageUrl={tvShow.imageUrl}
              type="tv"
            />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

TvShows.getLayout = (page) => <Layout title="Series">{page}</Layout>;

export default TvShows;
