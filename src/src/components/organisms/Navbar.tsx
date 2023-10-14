import {
  UserButton,
  SignedIn,
  SignedOut,
  SignInButton,
  useSession,
} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import NavbarItem from "../atoms/NavbarItem";
import { type Item } from "~/src/utils/constants/NavbarItems";
import { useRouter } from "next/router";
import { Button } from "../atoms/Button";
import { Skeleton } from "../ui/skeleton";

type NavbarProps = {
  items: Item[];
};

const Navbar = ({ items }: NavbarProps) => {
  const router = useRouter();
  const { isLoaded } = useSession();

  return (
    <nav className="fixed top-0 flex h-fit w-full flex-row items-center justify-between bg-secondary p-4">
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

      {isLoaded ? (
        <div>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <SignInButton>
              <Button>Iniciar Sesión</Button>
            </SignInButton>
          </SignedOut>
        </div>
      ) : (
        <Skeleton className="h-9 w-10" />
      )}
    </nav>
  );
};

export default Navbar;
