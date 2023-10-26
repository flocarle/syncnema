import Layout from "~/components/templates/Layout";
import { type NextPageWithLayout } from "./_app";
import ListingCard from "~/components/molecules/ListingCard";

import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
import { type Listing, generateListings } from "~/utils/listingGenerator";

const ScrollableListing = ({ listings }: { listings: Listing[] }) => (
  <ScrollArea>
    <div className="flex gap-4">
      {listings.map((listing) => (
        <ListingCard key={listing.id} type={listing.listingType} {...listing} />
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
      <ScrollableListing listings={generateListings(10)} />
    </div>

    <div>
      <Title title="Películas en tendencia..." />
      <ScrollableListing listings={generateListings(10, "movie")} />
    </div>

    <div>
      <Title title="Series en tendencia..." />
      <ScrollableListing listings={generateListings(10, "tv")} />
    </div>
  </div>
);

Home.getLayout = (page) => <Layout>{page}</Layout>;

export default Home;
