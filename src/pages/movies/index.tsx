import Layout from "~/components/templates/Layout";
import { type NextPageWithLayout } from "../_app";
import { useState } from "react";
import Filter from "~/components/organisms/Filter";
import { useDebounce } from "~/hooks/useDebounce";
import { generateListings } from "~/utils/listingGenerator";
import ListingCard from "~/components/molecules/ListingCard";
import InfiniteScroll from "react-infinite-scroller";

const Movies: NextPageWithLayout = () => {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [search, setSearch] = useState("");

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const debouncedSearch = useDebounce(search, 500);

  //TODO: fetch from API
  const [movies, setMovies] = useState(generateListings(20, "movie"));

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
          const newMovies = generateListings(20, "movie");
          await new Promise((resolve) => setTimeout(resolve, 2000));
          setMovies([...movies, ...newMovies]);
        }}
        hasMore={true}
        loader={<p className="mt-4">Cargando...</p>}
        className="mt-8 flex flex-col items-center justify-center"
      >
        <div className="flex w-full flex-row flex-wrap items-center justify-center gap-4">
          {movies.map((movie) => (
            <ListingCard
              key={movie.id}
              id={movie.id}
              name={movie.name}
              imageUrl={movie.imageUrl}
              type={movie.listingType}
            ></ListingCard>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

Movies.getLayout = (page) => <Layout title="Películas">{page}</Layout>;

export default Movies;
