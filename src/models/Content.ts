import type { Person } from "./Person";
import type { Platform } from "./Platform";

export type HomeContent = {
  id: string;
  title: string;
  imageUrl: string;
  type: ContentType;
};

export type Home = {
  movies: HomeContent[];
  series: HomeContent[];
  recommendations: HomeContent[];
};

export type ContentList = {
  records: Content[];
  total: number;
  page: number;
};

export type ContentType = "Movie" | "Serie";

export type Content = {
  score: number;
  record: {
    id: string;
    title: string;
    imageUrl: string;
  };
};

export type ContentDetail = {
  id: string;
  title: string;
  imageUrl: string; //TODO
  trailerUrl: string;
  combinedPlot: string;
  combinedReleaseDate: string;
  contentRating: string;
  combinedRuntime: number;
  combinedBudget: number; // TODO

  director: string | null;
  creator: string; // can return an empty string

  combinedGenres: string;
  rating: number;
  favourite: boolean;
  userRating: number | null;
  totalRating: number;

  cast: Person[];
  platforms: Platform[];
};
