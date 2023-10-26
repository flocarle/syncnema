import Layout from "~/components/templates/Layout";
import { type NextPageWithLayout } from "./_app";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import ListingCard from "~/components/molecules/ListingCard";
import { type Listing, generateListings } from "~/utils/listingGenerator";

const FavoritesGrid = ({ listings }: { listings: Listing[] }) => (
  <div className="flex flex-wrap justify-center gap-4">
    {listings.map((listing) => (
      <ListingCard
        key={listing.id}
        id={listing.id}
        imageUrl={listing.imageUrl}
        name={listing.name}
        type={listing.listingType}
      />
    ))}
  </div>
);

const Favorites: NextPageWithLayout = () => {
  // TODO fetch from API
  const favorites = {
    movies: generateListings(40, "movie"),
    tvShows: generateListings(40, "tv"),
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
        <FavoritesGrid listings={favorites.movies} />
      </TabsContent>

      <TabsContent value="tvShows">
        <FavoritesGrid listings={favorites.tvShows} />
      </TabsContent>
    </Tabs>
  );
};

Favorites.getLayout = (page) => <Layout>{page}</Layout>;

export default Favorites;
