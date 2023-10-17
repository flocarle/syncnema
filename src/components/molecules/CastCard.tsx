import { Card } from "../ui/card";

type ImageCardProps = {
  imageUrl: string;
  name: string;
};

const CastCard = ({ imageUrl, name }: ImageCardProps) => (
  <Card
    style={{
      backgroundImage: `url(${imageUrl})`,
    }}
    className={"group relative h-52 w-40 bg-cover"}
  >
    <div className="group-hover:border-fade h-full w-full rounded-xl bg-black bg-opacity-0 transition-all duration-200 group-hover:bg-opacity-10" />

    <p className="absolute bottom-2 z-10 flex w-full justify-center text-lg font-bold tracking-wide text-gray-200 opacity-0 transition-all duration-200 group-hover:opacity-100">
      {name}
    </p>

    <div className="absolute bottom-0 z-0 h-7 w-full rounded-b-xl bg-gradient-to-t from-black to-transparent opacity-0 transition-all duration-200 group-hover:opacity-100" />
  </Card>
);

export default CastCard;
