import Layout from "~/components/templates/Layout";
import { type NextPageWithLayout } from "../_app";
import { useState } from "react";
import Filter from "~/components/organisms/Filter";
import { useDebounce } from "~/hooks/useDebounce";

const Movies: NextPageWithLayout = () => {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 500);

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
    </div>
  );
};

Movies.getLayout = (page) => <Layout title="Películas">{page}</Layout>;

export default Movies;
