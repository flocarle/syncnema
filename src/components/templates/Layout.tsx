import React, { type ReactElement } from "react";
import Head from "../atoms/Head";
import Navbar from "../organisms/Navbar";
import NavbarItems from "~/utils/constants/NavbarItems";

type LayoutProps = {
  children: ReactElement;
  title?: string;
};

const Layout = ({ children, title }: LayoutProps) => {
  return (
    <>
      <Head />

      <main>
        <Navbar items={NavbarItems} />

        <div className="mt-[76px] flex min-h-[calc(100%_-_76px)] w-full flex-col p-8">
          {title && <p className="mb-4 text-xl text-primary">{title}</p>}

          {children}
        </div>
      </main>
    </>
  );
};

export default Layout;
