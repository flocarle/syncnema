import React from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";

const navbarItemVariants = cva(
  "text-lg font-semibold text-secondary-foreground",
  {
    variants: {
      selected: {
        true: "underline underline-offset-4 scale-110",
        false: "no-underline",
      },
    },
    defaultVariants: {
      selected: false,
    },
  },
);

type NavbarItemProps = {
  title: string;
  href: string;
} & VariantProps<typeof navbarItemVariants>;

const NavbarItem = ({ title, href, selected }: NavbarItemProps) => (
  <Link href={href}>
    <p className={navbarItemVariants({ selected })}>{title}</p>
  </Link>
);

export default NavbarItem;
