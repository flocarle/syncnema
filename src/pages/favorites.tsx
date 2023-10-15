import Layout from "~/src/components/templates/Layout";
import { type NextPageWithLayout } from "./_app";

const Favorites: NextPageWithLayout = () => (
  <div>
    <h1 className="text-xl">Favoritos</h1>
  </div>
);

Favorites.getLayout = (page) => <Layout>{page}</Layout>;

export default Favorites;
