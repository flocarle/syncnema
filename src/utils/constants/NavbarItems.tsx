export type Item = {
  title: string;
  href: string;
};

const NavbarItems: Item[] = [
  {
    title: "Películas",
    href: "/movies",
  },
  {
    title: "Series",
    href: "/tv-shows",
  },
  {
    title: "Favoritos",
    href: "/favorites",
  },
];

export default NavbarItems;
