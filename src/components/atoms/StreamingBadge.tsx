type StreamingBadgeProps = {
  streamingService: { name: string; logo: string };
};

const StreamingBadge = ({ streamingService }: StreamingBadgeProps) => (
  <>
    <div className="group relative h-8 w-8">
      <div
        className="h-full w-full bg-cover"
        style={{ backgroundImage: `url(${streamingService.logo})` }}
        aria-label={streamingService.name}
      />
      <span className="pointer-events-none absolute left-0 top-10 z-10 w-max rounded bg-gray-900 px-2 py-1 text-sm font-medium text-gray-50 opacity-0 shadow transition-opacity group-hover:opacity-100">
        {streamingService.name}
      </span>
    </div>
  </>
);

export default StreamingBadge;
