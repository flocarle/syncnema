import Layout from "~/components/templates/Layout";
import { type NextPageWithLayout } from "./_app";
import ListingCard from "~/components/molecules/ListingCard";
import CastCard from "~/components/molecules/CastCard";
import Rating from "~/components/atoms/Rating";
import { useState } from "react";

const Home: NextPageWithLayout = () => {
  const [userRating, setUserRating] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <ListingCard
          name="Oppenheimer"
          imageUrl="https://m.media-amazon.com/images/M/MV5BMDBmYTZjNjUtN2M1MS00MTQ2LTk2ODgtNzc2M2QyZGE5NTVjXkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_.jpg"
          id="1"
          type="movie"
        />

        <ListingCard
          name="New Girl"
          imageUrl="https://www.themoviedb.org/t/p/original/8oCqMlKKomCArVtyOjRzMN6g40Z.jpg"
          id="1"
          type="tv"
        />
      </div>

      <div className="flex gap-4">
        <CastCard
          name="Margot Robbie"
          imageUrl="https://upload.wikimedia.org/wikipedia/commons/3/33/SYDNEY%2C_AUSTRALIA_-_JANUARY_23_Margot_Robbie_arrives_at_the_Australian_Premiere_of_%27I%2C_Tonya%27_on_January_23%2C_2018_in_Sydney%2C_Australia_%2828074883999%29_%28cropped%29.jpg"
        />

        <CastCard
          name="Ryan Gosling"
          imageUrl="https://media.glamourmagazine.co.uk/photos/64b6ae8fcd1ad7c51ecf045c/1:1/w_1280,h_1280,c_limit/RYAN%20GOSLING%20EVA%20MENDES%20180723%20defaultGettyImages-1527942629.jpg"
        />
      </div>

      <Rating
        peopleRating={88}
        userRating={userRating}
        setUserRating={setUserRating}
      />
    </div>
  );
};

Home.getLayout = (page) => <Layout>{page}</Layout>;

export default Home;
