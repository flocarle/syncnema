import { type AppType } from "next/dist/shared/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
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
      <Component {...pageProps} />
    </ClerkProvider>
  );
};

export default MyApp;
