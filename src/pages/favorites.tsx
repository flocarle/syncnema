import Layout from "~/components/templates/Layout";
import { type NextPageWithLayout } from "./_app";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import ListingCard from "~/components/molecules/ListingCard";
import {
  type InferGetServerSidePropsType,
  type GetServerSidePropsContext,
} from "next";
import { get } from "~/services/favouritesService";
import { getAuth } from "@clerk/nextjs/server";
import { QueryClient, dehydrate, useQuery } from "react-query";
import type { Content } from "~/models/Content";

const FavoritesGrid = ({ listings }: { listings: Content[] }) => (
  <div className="flex flex-wrap justify-center gap-4">
    {listings.map((listing) => (
      <ListingCard key={listing.id} {...listing} />
    ))}
  </div>
);

type FavoritesProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const Favorites: NextPageWithLayout<FavoritesProps> = ({ userId }) => {
  const { data: favorites, isLoading } = useQuery({
    queryKey: ["favorites"],
    queryFn: () => get({ userId: userId }),
  });

  if (isLoading || !favorites) return <p>Loading...</p>;

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
        <FavoritesGrid listings={favorites.series} />
      </TabsContent>
    </Tabs>
  );
};

Favorites.getLayout = (page) => <Layout>{page}</Layout>;

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const { userId } = getAuth(context.req);
  const queryClient = new QueryClient();

  if (!userId) {
    return {
      redirect: {
        destination: "/sign-in",
        permanent: false,
      },
    };
  }

  await queryClient.prefetchQuery(["favorites"], () =>
    get({ userId: userId ?? undefined }),
  );

  return {
    props: {
      userId,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Favorites;
