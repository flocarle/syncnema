import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import NavbarItem from "../atoms/NavbarItem";
import { type Item } from "~/utils/constants/NavbarItems";
import { useRouter } from "next/router";
import { Button } from "../ui/button";

type NavbarProps = {
  items: Item[];
};

const Navbar = ({ items }: NavbarProps) => {
  const router = useRouter();

  return (
    <nav className="fixed top-0 z-10 flex h-fit w-full flex-row items-center justify-between bg-secondary p-4">
      <Link href="/">
        <Image
          src="/images/logo.svg"
          alt="SyncNema"
          width={0}
          height={0}
          sizes="100%"
          className="h-11 w-full"
        />
      </Link>

      <div className="flex flex-row items-center gap-x-5">
        {items.map((item, index) => (
          <NavbarItem
            key={`navbar-item-${index}`}
            href={item.href}
            title={item.title}
            selected={router.pathname.includes(item.href)}
          />
        ))}
      </div>

      <div className="flex w-32 justify-end">
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
        <SignedOut>
          <SignInButton>
            <Button>Iniciar Sesión</Button>
          </SignInButton>
        </SignedOut>
      </div>
    </nav>
  );
};

export default Navbar;
