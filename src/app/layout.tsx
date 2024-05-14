import type { Metadata } from "next";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import Providers from "@/components/ProgressBarProvider";
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
          <Providers>{children}</Providers>
        </body>
      </StoreProvider>
    </html>
  );
}
