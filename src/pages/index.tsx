import Layout from "~/components/templates/Layout";
import { type NextPageWithLayout } from "./_app";
import ListingCard from "~/components/molecules/ListingCard";
import { type Listing } from "./favorites";
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";

const createListings = () =>
  Array.from({ length: 10 }).map((_, index) => ({
    id: index.toString(),
    name: "Listing " + (index + 1),
    imageUrl: "https://via.placeholder.com/300x450",
    listingType: "movie" as const,
  }));

const ScrollableListing = ({
  listings,
  type,
}: {
  listings: (Listing & { listingType: "movie" | "tv" })[];
  type?: "movie" | "tv";
}) => (
  <ScrollArea>
    <div className="flex gap-4">
      {listings.map((listing) => (
        <ListingCard
          key={listing.id}
          type={type ?? listing.listingType}
          {...listing}
        />
      ))}
    </div>
    <ScrollBar orientation="horizontal" />
  </ScrollArea>
);

const Title = ({ title }: { title: string }) => (
  <h2 className="mb-2 text-xl font-semibold text-primary">{title}</h2>
);

const Home: NextPageWithLayout = () => (
  <div className="flex flex-col gap-4">
    <div>
      <Title title="Te podría gustar..." />
      <ScrollableListing listings={createListings()} />
    </div>

    <div>
      <Title title="Películas en tendencia..." />
      <ScrollableListing listings={createListings()} type="movie" />
    </div>

    <div>
      <Title title="Series en tendencia..." />
      <ScrollableListing listings={createListings()} type="tv" />
    </div>
  </div>
);

Home.getLayout = (page) => <Layout>{page}</Layout>;

export default Home;
