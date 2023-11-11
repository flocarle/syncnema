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

type MovieProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const Movie: NextPageWithLayout<MovieProps> = ({ movieId, userId }) => {
  const { data: movie, isLoading } = useQuery({
    queryKey: ["movie", movieId],
    queryFn: () => byId({ id: movieId, userId: userId ?? undefined }),
  });

  if (isLoading || !movie) return <p>Loading...</p>;

  return <TitleDetail {...movie} type="Movie" />;
};

Movie.getLayout = (page) => <Layout>{page}</Layout>;

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const { id } = context.query;
  const queryClient = new QueryClient();
  const { userId } = getAuth(context.req);

  const movieId = id?.toString();

  if (!movieId) {
    return {
      redirect: {
        destination: "/movies",
        permanent: false,
      },
    };
  }

  const movie = await queryClient.fetchQuery({
    queryKey: ["movie", movieId],
    queryFn: () => byId({ id: movieId, userId: userId ?? undefined }),
  });

  if (!movie) {
    return {
      redirect: {
        destination: "/movies",
        permanent: false,
      },
    };
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      movieId,
      userId,
    },
  };
};

export default Movie;
