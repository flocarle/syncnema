import type { Person } from "./Person";
import type { Platform } from "./Platform";

export type Home = {
  movies: Content[];
  series: Content[];
  recommendations: Content[];
};

export type List = {
  movies: Content[];
  page: number;
  total: number;
};

export type ContentType = "Movie" | "Serie";

export type Content = {
  id: string;
  title: string;
  imageUrl: string;
  type?: ContentType;
};

export type ContentDetail = Content & {
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
