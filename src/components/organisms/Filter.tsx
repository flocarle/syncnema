import type { Dispatch, SetStateAction } from "react";
import SearchBar from "../molecules/SearchBar";
import Dropdown from "../atoms/Dropdown";
import { useQuery } from "@tanstack/react-query";
import { allGenres, allPlatforms } from "~/services/filterDataService";

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
  const { data: genres } = useQuery({
    queryKey: ["genres"],
    queryFn: () => allGenres(),
  });

  const { data: platforms } = useQuery({
    queryKey: ["platforms"],
    queryFn: () => allPlatforms(),
  });

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
          placeholder="Género"
          options={genres ?? []}
          multiple
          onChange={(value) => setSelectedGenres(value as string[])}
          value={selectedGenres}
        />
      </div>

      <div className="h-9 w-1/5">
        <Dropdown
          placeholder="Plataforma"
          options={platforms ?? []}
          multiple
          onChange={(value) => setSelectedPlatforms(value as string[])}
          value={selectedPlatforms}
        />
      </div>
    </div>
  );
};

export default Filter;
