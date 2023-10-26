import Layout from "~/components/templates/Layout";
import { type NextPageWithLayout } from "../_app";
import TitleDetail from "~/components/pages/TitleDetail";
import StreamingServices from "~/utils/constants/StreamingServices";

const Movie: NextPageWithLayout = () => {
  return (
    <TitleDetail
      cast={[
        {
          name: "Cillian Murphy",
          id: "1",
          imageUrl: "https://ntvb.tmsimg.com/assets/assets/236083_v9_bd.jpg",
        },
        {
          name: "Emily Blunt",
          id: "2",
          imageUrl:
            "https://cdn.britannica.com/16/189516-050-E05AC3FA/Emily-Blunt-2013.jpg",
        },
        {
          name: "Florence Pugh",
          id: "3",
          imageUrl:
            "https://media.glamourmagazine.co.uk/photos/637dfb181074c5d634762cb0/1:1/w_1920,h_1920,c_limit/FLORENCEPUGH%20PINKDRESS%20231122%20default-sq-GettyImages-1244915080.jpg",
        },
      ]}
      trailerUrl="https://www.youtube.com/watch?v=MVvGSBKV504"
      name="Oppenheimer"
      description="A look at the life of the American physicist, who led the U.S. effort to develop the atomic bomb during World War II, but later confronted the consequences of his actions."
      imageUrl="https://m.media-amazon.com/images/M/MV5BMDBmYTZjNjUtN2M1MS00MTQ2LTk2ODgtNzc2M2QyZGE5NTVjXkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_.jpg"
      director="Christopher Nolan"
      duration="2h 30m"
      genres={["Drama", "History", "War"]}
      rating={88.5}
      whereToWatch={StreamingServices}
    />
  );
};

Movie.getLayout = (page) => <Layout>{page}</Layout>;

export default Movie;
