import Layout from "~/components/templates/Layout";
import { type NextPageWithLayout } from "./_app";

const Home: NextPageWithLayout = () => (
  <div>
    <h1 className="text-xl">SyncNema Home</h1>
  </div>
);

Home.getLayout = (page) => <Layout>{page}</Layout>;

export default Home;
