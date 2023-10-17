import Layout from "~/components/templates/Layout";
import { type NextPageWithLayout } from "./_app";
import ImageCard from "~/components/molecules/ImageCard";

const Home: NextPageWithLayout = () => (
  <div className="flex gap-4">
    <ImageCard
      name="Oppenheimer"
      imageUrl="https://m.media-amazon.com/images/M/MV5BMDBmYTZjNjUtN2M1MS00MTQ2LTk2ODgtNzc2M2QyZGE5NTVjXkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_.jpg"
      id="1"
      type="movie"
    />

    <ImageCard
      name="Barbie"
      imageUrl="https://www.themoviedb.org/t/p/original/u5kboZR4OMi4QdbOhawCZuzMVWJ.jpg"
      id="2"
      type="movie"
    />
  </div>
);

Home.getLayout = (page) => <Layout>{page}</Layout>;

export default Home;
