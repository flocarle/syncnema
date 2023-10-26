export type Listing = {
  id: string;
  imageUrl: string;
  name: string;
  listingType: "movie" | "tv";
};

export const generateListings = (amount: number, type?: "movie" | "tv") =>
  Array.from({ length: amount }).map((_, index) => ({
    id: index.toString(),
    name: `${listingName(type)} ${index + 1}`,
    imageUrl: "https://via.placeholder.com/300x450",
    listingType: type ?? randomType(),
  }));

export const randomType = () => (Math.random() <= 0.5 ? "movie" : "tv");

const listingName = (type?: "movie" | "tv") => {
  if (type === "movie") {
    return "Movie";
  }

  if (type === "tv") {
    return "TV Show";
  }

  return "Listing";
};
