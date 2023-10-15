import Layout from "~/src/components/templates/Layout";
import { type NextPageWithLayout } from "../_app";

const Movies: NextPageWithLayout = () => (
  <div>
    <h1 className="text-xl">Películas</h1>
  </div>
);

Movies.getLayout = (page) => <Layout>{page}</Layout>;

export default Movies;
