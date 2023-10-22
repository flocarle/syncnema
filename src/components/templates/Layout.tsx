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

        <div className="min-h-[calc(100vh - 76px)] mt-[76px] flex w-full flex-col p-8">
          <p className="text-xl text-primary">{title}</p>

          {children}
        </div>
      </main>
    </>
  );
};

export default Layout;
