import Layout from "~/components/templates/Layout";
import { type NextPageWithLayout } from "../_app";
import TitleDetail from "~/components/pages/TitleDetail";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { QueryClient, dehydrate, useQuery } from "react-query";
import { byId } from "~/services/contentService";
import { getAuth } from "@clerk/nextjs/server";

type MovieProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const Movie: NextPageWithLayout<MovieProps> = ({ movieId, userId }) => {
  const { data: movie, isLoading } = useQuery(["movie", movieId], () =>
    byId({ id: movieId, userId: userId ?? undefined }),
  );

  if (isLoading || !movie) return <p>Loading...</p>;

  return (
    <TitleDetail
      id={movieId}
      cast={movie.cast.map((cast) => ({
        name: cast.name,
        imageUrl: cast.imageUrl,
      }))}
      trailerUrl={movie.trailerUrl}
      title={movie.title}
      description={movie.description}
      imageUrl={movie.imageUrl}
      director={movie.director}
      duration={movie.duration}
      genres={movie.genres}
      contentRating={movie.contentRating}
      platforms={movie.platforms}
      favourite={movie.favourite}
      releaseDate={movie.releaseDate}
    />
  );
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

  const movie = await queryClient.fetchQuery(["movie", movieId], () =>
    byId({ id: movieId, userId: userId ?? undefined }),
  );

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
