import Layout from "~/components/templates/Layout";
import { type NextPageWithLayout } from "../_app";
import TitleDetail from "~/components/pages/TitleDetail";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";
import { byId } from "~/services/contentService";
import { getAuth } from "@clerk/nextjs/server";

type TvShowProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const TvShow: NextPageWithLayout<TvShowProps> = ({ tvShowId, userId }) => {
  const { data: tvShow, isLoading } = useQuery({
    queryKey: ["serie", tvShowId],
    queryFn: () => byId({ id: tvShowId, userId: userId ?? undefined }),
  });

  if (isLoading || !tvShow) return <p>Loading...</p>;

  return <TitleDetail {...tvShow} type="Serie" />;
};

TvShow.getLayout = (page) => <Layout>{page}</Layout>;

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const { id } = context.query;
  const queryClient = new QueryClient();
  const { userId } = getAuth(context.req);

  const tvShowId = id?.toString();

  if (!tvShowId) {
    return {
      redirect: {
        destination: "/tv-shows",
        permanent: false,
      },
    };
  }

  const tvShow = await queryClient.fetchQuery({
    queryKey: ["serie", tvShowId],
    queryFn: () => byId({ id: tvShowId, userId: userId ?? undefined }),
  });

  if (!tvShow) {
    return {
      redirect: {
        destination: "/tv-shows",
        permanent: false,
      },
    };
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      tvShowId,
      userId,
    },
  };
};

export default TvShow;
