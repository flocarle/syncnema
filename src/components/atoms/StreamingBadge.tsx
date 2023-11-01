import Image from "next/image";

type StreamingBadgeProps = {
  streamingService: { name: string; logo: string };
};

const StreamingBadge = ({ streamingService }: StreamingBadgeProps) => (
  <Image
    src={streamingService.logo}
    width={32}
    height={32}
    alt={streamingService.name}
  />
);

export default StreamingBadge;
