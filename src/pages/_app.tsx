import type { AppProps } from "next/app";
import type { NextPage } from "next";
import { type ReactElement, useState } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import {
  QueryClient,
  QueryClientProvider,
  type DehydratedState,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import "~/styles/globals.css";
import { env } from "~/env.mjs";

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
    <QueryClientProvider client={queryClient}>
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
        {getLayout(<Component {...pageProps} />)}
        {env.NEXT_PUBLIC_SHOW_DEVTOOLS === "true" && (
          <ReactQueryDevtools initialIsOpen={false} />
        )}
      </ClerkProvider>
    </QueryClientProvider>
  );
};

export default MyApp;
