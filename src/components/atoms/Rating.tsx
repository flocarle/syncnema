import { useState } from "react";
import { AiFillStar, AiFillEdit, AiOutlinePlusCircle } from "react-icons/ai";
import { cn } from "~/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useSession } from "@clerk/nextjs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  add as addRating,
  update as updateRating,
} from "~/services/ratingService";
import type { ContentType } from "~/models/Content";

type RatingProps = {
  contentRating: number;
  contentId: string;
  userRating?: number;
  type: ContentType;
};

const RatingModal = ({
  userRating,
  setUserRating,
  trigger,
  type,
}: {
  userRating: number;
  setUserRating: (rating: number) => void;
  trigger: React.ReactNode;
  type: ContentType;
}) => {
  const [rating, setRating] = useState(userRating);
  const [userIsRating, setUserIsRating] = useState(false);

  return (
    <Dialog>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Puntúa esta {type === "Movie" ? "Película" : "Serie"}
          </DialogTitle>
          <DialogDescription>
            <div className="flex">
              {Array.from({ length: 10 }, (_, i) => i).map((_, i) => {
                return (
                  <AiFillStar
                    key={i}
                    fontSize={32}
                    className={cn(
                      "cursor-pointer transition-colors duration-200 ease-in-out",
                      i < rating
                        ? userIsRating
                          ? "scale-110 text-yellow-500"
                          : "text-yellow-400"
                        : "text-gray-400",
                    )}
                    onMouseEnter={() => {
                      setUserIsRating(true);
                      setRating(i + 1);
                    }}
                    onMouseLeave={() => {
                      setUserIsRating(false);
                      setRating(userRating);
                    }}
                    onClick={() => {
                      setUserRating(i + 1);
                    }}
                  />
                );
              })}
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

const Rating = ({
  userRating,
  contentRating,
  contentId,
  type,
}: RatingProps) => {
  const { session } = useSession();
  const queryClient = useQueryClient();

  const { mutate: rate } = useMutation({
    mutationFn: ({
      contentId,
      userId,
      score,
    }: {
      contentId: string;
      userId: string;
      score: number;
    }) => addRating({ contentId, userId, score }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [type.toLocaleLowerCase(), contentId.toString()],
      });
    },
  });

  const { mutate: updateRate } = useMutation({
    mutationFn: ({
      contentId,
      userId,
      score,
    }: {
      contentId: string;
      userId: string;
      score: number;
    }) => updateRating({ contentId, userId, score }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [type.toLocaleLowerCase(), contentId.toString()],
      });
    },
  });

  return (
    <div className="flex flex-col gap-y-3">
      <div className="flex flex-col gap-2">
        <p className="text-lg font-semibold">Puntuación general</p>

        <div className="flex items-center">
          <p className="text-base">
            <span className="text-lg font-bold">{contentRating}</span>/10
          </p>

          <AiFillStar size={32} className="text-yellow-400" />
        </div>
      </div>

      {session && (
        <div className="flex flex-col gap-1">
          <p className="text-lg font-semibold">Tu puntuación</p>

          {userRating ? (
            <div className="flex">
              <p className="text-base">
                <span className="text-lg font-bold">{userRating}</span>/10
              </p>

              <RatingModal
                userRating={userRating}
                setUserRating={(score) =>
                  updateRate({
                    contentId,
                    userId: session.user.id,
                    score,
                  })
                }
                trigger={<AiFillEdit size={24} />}
                type={type}
              />
            </div>
          ) : (
            <RatingModal
              userRating={0}
              setUserRating={(score) =>
                rate({ contentId, userId: session.user.id, score })
              }
              trigger={<AiOutlinePlusCircle size={24} />}
              type={type}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Rating;
