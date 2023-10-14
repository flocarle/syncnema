import Head from "next/head";
import Link from "next/link";

import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}
