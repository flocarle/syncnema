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

export type ContentDetail = Content["record"] & {
  trailerUrl: string;
  description: string;
  releaseDate: string;
  contentRating: number;
  duration?: number; //If is a movie
  seasons?: number; //If is a tv show
  director?: string; //If is a movie
  creator?: string; //If is a tv show
  genres: string[];
  platforms: Platform[];
  cast: Person[];
  userRating?: number;
  favourite: boolean;
};
