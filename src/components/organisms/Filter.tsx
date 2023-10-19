import type { Dispatch, SetStateAction } from "react";
import SearchBar from "../molecules/SearchBar";
import Dropdown from "../atoms/Dropdown";

type FilterProps = {
  selectedGenres: string[];
  selectedPlatforms: string[];
  search: string;
  setSelectedGenres: Dispatch<SetStateAction<string[]>>;
  setSelectedPlatforms: Dispatch<SetStateAction<string[]>>;
  setSearch: Dispatch<SetStateAction<string>>;
};

const Filter = ({
  selectedGenres,
  selectedPlatforms,
  search,
  setSelectedGenres,
  setSelectedPlatforms,
  setSearch,
}: FilterProps) => {
  const genres = [
    "Comedia",
    "Drama",
    "Terror",
    "Acción",
    "Ciencia Ficción",
    "Animación",
    "Aventura",
    "Fantasía",
  ];

  const platforms = [
    "Netflix",
    "Prime Video",
    "Disney+",
    "HBO Max",
    "Paramount",
    "Star+",
  ];

  return (
    <div className="flex items-center justify-start gap-x-3">
      <div className="w-3/5">
        <SearchBar
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
          }}
        />
      </div>

      <div className="h-9 w-1/5">
        <Dropdown
          options={genres}
          multiple
          onChange={(value) => setSelectedGenres(value as string[])}
          value={selectedGenres}
        />
      </div>

      <div className="h-9 w-1/5">
        <Dropdown
          options={platforms}
          multiple
          onChange={(value) => setSelectedPlatforms(value as string[])}
          value={selectedPlatforms}
        />
      </div>
    </div>
  );
};

export default Filter;
