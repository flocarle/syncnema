import Image from "next/image";
import Link from "next/link";
import { type StreamingService } from "~/utils/constants/StreamingServices";

type StreamingBadgeProps = {
  streamingService: StreamingService;
};

const StreamingBadge = ({ streamingService }: StreamingBadgeProps) => (
  <Link href={streamingService.url} target="_blank">
    <Image
      src={streamingService.logo}
      width={32}
      height={32}
      alt={streamingService.name}
    />
  </Link>
);

export default StreamingBadge;
