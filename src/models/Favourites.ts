export type FavouriteListing = {
  id: number;
  title: string;
  imageUrl: string;
};

export type Favourite = {
  movies: FavouriteListing[];
  series: FavouriteListing[];
};
