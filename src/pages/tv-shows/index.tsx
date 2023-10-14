import Layout from "~/src/components/templates/Layout";
import { type NextPageWithLayout } from "../_app";

const TvShows: NextPageWithLayout = () => (
  <div>
    <h1 className="text-xl">Series</h1>
  </div>
);

TvShows.getLayout = (page) => <Layout>{page}</Layout>;

export default TvShows;
