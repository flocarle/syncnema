import type { AppProps } from "next/app";
import type { NextPage } from "next";
import { type ReactElement, useState } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import {
  QueryClient,
  QueryClientProvider,
  type DehydratedState,
} from "@tanstack/react-query";

import "~/styles/globals.css";

export type NextPageWithLayout<PageProps = unknown> = NextPage<PageProps> & {
  getLayout?: (page: ReactElement<PageProps>) => ReactElement;
};

type AppPropsWithLayout<T> = AppProps<
  T & { dehydratedState: DehydratedState }
> & {
  Component: NextPageWithLayout<T>;
};

const MyApp = <T extends object>({
  Component,
  pageProps: { ...pageProps },
}: AppPropsWithLayout<T>) => {
  const getLayout = Component.getLayout ?? ((page) => page);
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#0B001B",
          colorTextOnPrimaryBackground: "#E8E8E9",
          colorText: "#0B001B",
          colorBackground: "#F6F8F9",
          colorDanger: "#D64D3D",
          colorInputBackground: "#E3E3E5",
          colorTextSecondary: "#1C001D",
        },
        elements: {
          logoBox: {
            height: "100%",
          },
          card: {
            rowGap: "16px",
          },
        },
      }}
    >
      <QueryClientProvider client={queryClient}>
        {getLayout(<Component {...pageProps} />)}
      </QueryClientProvider>
    </ClerkProvider>
  );
};

export default MyApp;
