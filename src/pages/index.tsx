import Layout from "~/components/templates/Layout";
import { type NextPageWithLayout } from "./_app";
import ListingCard from "~/components/molecules/ListingCard";

import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
import {
  type InferGetServerSidePropsType,
  type GetServerSidePropsContext,
} from "next";
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";
import { get } from "~/services/homeService";
import type { HomeContent } from "~/models/Content";
import { getAuth } from "@clerk/nextjs/server";

const ScrollableListing = ({ listings }: { listings: HomeContent[] }) => (
  <ScrollArea>
    <div className="flex gap-4">
      {listings.map((listing, index) => (
        <ListingCard key={`${listing.id}-${index}`} {...listing} />
      ))}
    </div>
    <ScrollBar orientation="horizontal" />
  </ScrollArea>
);

const Title = ({ title }: { title: string }) => (
  <h2 className="mb-2 text-xl font-semibold text-primary">{title}</h2>
);

type HomeProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const Home: NextPageWithLayout<HomeProps> = ({ userId }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["home"],
    queryFn: () => get({ userId: userId ?? undefined }),
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="flex flex-col gap-4">
      <div>
        <Title title="Te podría gustar..." />
        <ScrollableListing listings={data?.recommendations ?? []} />
      </div>

      <div>
        <Title title="Películas en tendencia..." />
        <ScrollableListing listings={data?.movies ?? []} />
      </div>

      <div>
        <Title title="Series en tendencia..." />
        <ScrollableListing listings={data?.series ?? []} />
      </div>
    </div>
  );
};

Home.getLayout = (page) => <Layout>{page}</Layout>;

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const queryClient = new QueryClient();
  const { userId } = getAuth(context.req);

  await queryClient.prefetchQuery({
    queryKey: ["home"],
    queryFn: () => get({ userId: userId ?? undefined }),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      userId,
    },
  };
};

export default Home;
