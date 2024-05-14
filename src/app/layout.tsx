import type { Metadata } from "next";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
export const metadata: Metadata = {
  title: "Online-Shop",
  description: "a online store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <StoreProvider>
        <body>
          {children}
          {/* <ProgressBar
            height="4px"
            color="#fffd00"
            options={{ showSpinner: false }}
            shallowRouting
          /> */}
        </body>
      </StoreProvider>
    </html>
  );
}
