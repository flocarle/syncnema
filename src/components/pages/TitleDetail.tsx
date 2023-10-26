import Link from "next/link";
import { Card } from "../ui/card";
import CastCard from "../molecules/CastCard";
import StreamingBadge from "../atoms/StreamingBadge";
import { type StreamingService } from "~/utils/constants/StreamingServices";
import Rating from "../atoms/Rating";
import { useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { cn } from "~/utils";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

type TitleDetailProps = {
  name: string;
  description: string;
  imageUrl: string;
  trailerUrl?: string;
  whereToWatch: StreamingService[];
  duration?: string;
  director: string;
  genres: string[];
  rating: number;
  cast: { name: string; id: string; imageUrl: string }[];
  tvShow?: boolean;
  seasons?: number;
};

const KeyName = ({ name, value }: { name: string; value: string }) => (
  <div className="flex items-center gap-x-2">
    <p className="text-xl font-semibold">{name}:</p>

    <p className="text-base">{value}</p>
  </div>
);

const TitleDetail = ({
  name,
  description,
  imageUrl,
  trailerUrl,
  whereToWatch,
  duration,
  director,
  genres,
  rating,
  cast,
  tvShow,
  seasons,
}: TitleDetailProps) => {
  const [userRating, setUserRating] = useState(0);
  const [favorite, setIsFavorite] = useState(false);

  return (
    <div className="flex flex-col gap-y-5">
      <div className="flex gap-x-4">
        <Card
          style={{
            backgroundImage: `url(${imageUrl})`,
            backgroundPosition: "center",
          }}
          className={"group relative h-72 w-72 bg-cover"}
        >
          <div className="group-hover:border-fade h-full w-full rounded-xl bg-black bg-opacity-0 transition-all duration-200 group-hover:bg-opacity-10" />

          <Link href={trailerUrl ?? "#"} target="_blank">
            <p className="absolute bottom-2 z-10 flex w-full justify-center text-lg font-bold tracking-wide text-gray-200 opacity-0 transition-all duration-200 group-hover:opacity-100">
              Ver trailer
            </p>
          </Link>

          <div className="absolute bottom-0 z-0 h-7 w-full rounded-b-xl bg-gradient-to-t from-black to-transparent opacity-0 transition-all duration-200 group-hover:opacity-100" />
        </Card>

        <div className="flex w-3/5 flex-col justify-between py-3">
          <div>
            <p className="text-3xl font-bold uppercase">{name}</p>

            <p className="text-lg">{description}</p>
          </div>

          <div>
            {tvShow
              ? seasons && (
                  <KeyName name="Temporadas" value={seasons.toString()} />
                )
              : duration && <KeyName name="Duración" value={duration} />}

            <KeyName name="Géneros" value={genres.join(", ")} />

            <KeyName name="Dirigida por" value={director} />
            <div className="flex gap-x-3">
              <p className="text-xl font-semibold">Dónde ver: </p>

              {whereToWatch.map((streamingService, index) => (
                <StreamingBadge
                  key={index}
                  streamingService={streamingService}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex w-2/5 flex-1 flex-col gap-y-4">
          <AiFillHeart
            className={cn(
              "cursor-pointer self-end",
              favorite ? "scale-110 text-red-600" : "text-gray-400 ",
            )}
            onClick={() => setIsFavorite(!favorite)}
            fontSize="50px"
          />

          <Rating
            peopleRating={rating}
            userRating={userRating}
            setUserRating={setUserRating}
          />
        </div>
      </div>

      <p className="text-2xl font-semibold uppercase">Reparto</p>

      <ScrollArea>
        <div className="flex gap-x-2">
          {cast.map(({ name, id, imageUrl }) => (
            <CastCard key={id} name={name} imageUrl={imageUrl} />
          ))}
        </div>

        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default TitleDetail;
