import Layout from "~/components/templates/Layout";
import { type NextPageWithLayout } from "../_app";
import TitleDetail from "~/components/pages/TitleDetail";
import StreamingServices from "~/utils/constants/StreamingServices";

const Movie: NextPageWithLayout = () => {
  return (
    <TitleDetail
      cast={[
        {
          name: "Zooey Deschanel",
          id: "1",
          imageUrl:
            "https://static.independent.co.uk/2022/04/12/12/GettyImages-1388069880.jpg",
        },
        {
          name: "Jake Johnson",
          id: "2",
          imageUrl:
            "https://www.earwolf.com/wp-content/uploads/2013/11/7750.jpg",
        },
      ]}
      trailerUrl="https://www.youtube.com/watch?v=KKFVKcDjel0"
      name="New Girl"
      seasons={7}
      tvShow
      director="Elizabeth Meriwether"
      description="Jess, a middle-school teacher, moves into an apartment with three men after she finds her boyfriend with another woman and breaks up with him."
      imageUrl="https://www.themoviedb.org/t/p/original/8oCqMlKKomCArVtyOjRzMN6g40Z.jpg"
      genres={["Comedia", "Romance"]}
      rating={78.5}
      whereToWatch={StreamingServices}
    />
  );
};

Movie.getLayout = (page) => <Layout>{page}</Layout>;

export default Movie;
