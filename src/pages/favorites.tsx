import Layout from "~/components/templates/Layout";
import { type NextPageWithLayout } from "./_app";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import ListingCard from "~/components/molecules/ListingCard";

export type Listing = {
  id: string;
  imageUrl: string;
  name: string;
};

type FavoritesType = {
  movies: Listing[];
  tvShows: Listing[];
};

const FavoritesGrid = ({
  listings,
  type,
}: {
  listings: Listing[];
  type: "movie" | "tv";
}) => (
  <div className="flex flex-wrap justify-center gap-4">
    {listings.map((listing) => (
      <ListingCard
        key={listing.id}
        id={listing.id}
        imageUrl={listing.imageUrl}
        name={listing.name}
        type={type}
      />
    ))}
  </div>
);

const Favorites: NextPageWithLayout = () => {
  // TODO fetch from API
  const favorites: FavoritesType = {
    movies: Array.from({ length: 40 }).map((_, index) => ({
      id: index.toString(),
      imageUrl: "https://picsum.photos/200/300",
      name: "Movie " + (index + 1),
    })),
    tvShows: Array.from({ length: 40 }).map((_, index) => ({
      id: index.toString(),
      imageUrl: "https://picsum.photos/200/300",
      name: "Tv Show " + (index + 1),
    })),
  };

  return (
    <Tabs
      defaultValue="movies"
      className="m-auto flex w-[90%] flex-col items-center justify-center"
    >
      <TabsList className="mb-5 grid w-full grid-cols-2">
        <TabsTrigger value="movies">Películas</TabsTrigger>
        <TabsTrigger value="tvShows">Series</TabsTrigger>
      </TabsList>

      <TabsContent value="movies">
        <FavoritesGrid listings={favorites.movies} type="movie" />
      </TabsContent>

      <TabsContent value="tvShows">
        <FavoritesGrid listings={favorites.tvShows} type="tv" />
      </TabsContent>
    </Tabs>
  );
};

Favorites.getLayout = (page) => <Layout>{page}</Layout>;

export default Favorites;
