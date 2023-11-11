import Link from "next/link";
import { Card } from "../ui/card";
import CastCard from "../molecules/CastCard";
import StreamingBadge from "../atoms/StreamingBadge";
import Rating from "../atoms/Rating";
import { AiFillHeart } from "react-icons/ai";
import { cn } from "~/utils";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import type { ContentDetail, ContentType } from "~/models/Content";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  add as addFavouriteFn,
  remove as removeFavouriteFn,
} from "~/services/favouritesService";

import { useSession } from "@clerk/nextjs";
import { z } from "zod";

const KeyName = ({ name, value }: { name: string; value: string }) => (
  <div className="flex items-center gap-x-2">
    <p className="text-xl font-semibold">{name}:</p>

    <p className="text-base">{value}</p>
  </div>
);

const TitleDetail = ({
  id,
  title,
  combinedPlot,
  imageUrl,
  trailerUrl,
  combinedReleaseDate,
  combinedGenres,
  combinedRuntime,
  combinedBudget,
  director,
  creator,
  favourite,
  rating,
  userRating,
  cast,
  platforms,
  type,
}: ContentDetail & { type: ContentType }) => {
  const { session } = useSession();
  const queryClient = useQueryClient();

  const { mutate: addFavourite } = useMutation({
    mutationFn: ({
      contentId,
      userId,
    }: {
      contentId: string;
      userId: string;
    }) => addFavouriteFn({ contentId, userId }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [type.toLocaleLowerCase(), id.toString()],
      });
    },
  });

  const { mutate: removeFavourite } = useMutation({
    mutationFn: ({
      contentId,
      userId,
    }: {
      contentId: string;
      userId: string;
    }) => removeFavouriteFn({ contentId, userId }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [type.toLocaleLowerCase(), id.toString()],
      });
    },
  });

  const combinedGenresArray = JSON.parse(combinedGenres) as string[];

  const genresResult = z.array(z.string()).safeParse(combinedGenresArray);
  if (!genresResult.success) {
    throw genresResult.error;
  }
  const genresArray = genresResult.data;

  const duration = Math.round((combinedRuntime ?? 0) / 60);

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

        <div className="flex w-3/5 flex-col justify-between">
          <div>
            <p className="text-3xl font-bold uppercase">{title}</p>

            <p className="text-lg">{combinedPlot}</p>
          </div>

          <div>
            <KeyName name="Fecha de estreno" value={combinedReleaseDate} />

            {duration && (
              <KeyName
                name="Duración"
                value={`${duration} minutos ${
                  duration < 60 && type === "Serie" ? "por capítulo" : ""
                }`}
              />
            )}

            <KeyName name="Géneros" value={genresArray.join(", ")} />

            {director && <KeyName name="Dirigida por" value={director} />}

            {creator && <KeyName name="Creada por" value={creator} />}

            {combinedBudget && (
              <KeyName name="Presupuesto" value={combinedBudget.toString()} />
            )}

            <div className="flex gap-x-3">
              <p className="text-xl font-semibold">Dónde ver: </p>

              <div className="flex flex-wrap gap-2">
                {platforms.map((streamingService, index) => (
                  <StreamingBadge
                    key={index}
                    streamingService={{
                      logo: streamingService.image,
                      name: streamingService.name,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex w-2/5 flex-1 flex-col gap-y-4">
          {session && (
            <AiFillHeart
              className={cn(
                "cursor-pointer self-end",
                favourite ? "scale-110 text-red-600" : "text-gray-400 ",
              )}
              onClick={() =>
                favourite
                  ? removeFavourite({
                      contentId: id.toString(),
                      userId: session.user.id,
                    })
                  : addFavourite({
                      contentId: id.toString(),
                      userId: session.user.id,
                    })
              }
              fontSize="50px"
            />
          )}

          <Rating
            contentRating={rating}
            contentId={id.toString()}
            userRating={userRating ?? undefined}
            type={type}
          />
        </div>
      </div>

      <p className="text-2xl font-semibold uppercase">Reparto</p>

      <ScrollArea>
        <div className="flex gap-x-2">
          {cast.map(({ name, image }) => (
            <CastCard key={name} name={name} imageUrl={image} />
          ))}
        </div>

        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default TitleDetail;
