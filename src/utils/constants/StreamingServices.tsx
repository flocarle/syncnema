export type StreamingService = {
  name: string;
  logo: string;
  url: string;
};

const StreamingServices: StreamingService[] = [
  {
    name: "apple",
    logo: "/images/apple.svg",
    url: "https://www.apple.com/apple-tv-plus/",
  },
  {
    name: "crunchyroll",
    logo: "/images/crunchyroll.svg",
    url: "https://www.crunchyroll.com/",
  },
  {
    name: "disney",
    logo: "/images/disney.svg",
    url: "https://www.disneyplus.com/",
  },
  {
    name: "hbomax",
    logo: "/images/hbomax.svg",
    url: "https://www.hbomax.com/",
  },
  {
    name: "netflix",
    logo: "/images/netflix.svg",
    url: "https://www.netflix.com/",
  },
  {
    name: "prime",
    logo: "/images/prime.svg",
    url: "https://www.primevideo.com/",
  },
  {
    name: "hulu",
    logo: "/images/hulu.svg",
    url: "https://www.hulu.com/",
  },
  {
    name: "starplus",
    logo: "/images/starplus.svg",
    url: "https://www.starplus.com/",
  },
  {
    name: "paramount",
    logo: "/images/paramount.svg",
    url: "https://www.paramountplus.com/",
  },
];

export default StreamingServices;
