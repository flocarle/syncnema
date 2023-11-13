import Link from "next/link";
import { Card } from "../ui/card";
import type { Content, ContentType } from "~/models/Content";

const MAP_TYPE_TO_URL = {
  Movie: "/movies",
  Serie: "/tv-shows",
} as const;

type ListingCardProps = Content["record"] & { type: ContentType };

const ListingCard = ({ id, imageUrl, title, type }: ListingCardProps) => {
  const redirectUrl = type ? `${MAP_TYPE_TO_URL[type]}/${id}` : `/movies/${id}`;

  return (
    <Card
      style={{
        backgroundImage: `url(${imageUrl})`,
      }}
      className={"group relative h-64 w-56 bg-cover"}
    >
      <Link href={redirectUrl}>
        <div className="h-full w-full rounded-xl bg-black bg-opacity-0 transition-all duration-200 group-hover:bg-opacity-60" />

        <p className="absolute left-0 top-0 flex h-full w-full items-center justify-center text-center text-xl font-bold tracking-wide text-white opacity-0 transition-all duration-200 group-hover:opacity-100">
          {title.replaceAll("&apos;", "'")}
        </p>
      </Link>
    </Card>
  );
};

export default ListingCard;
