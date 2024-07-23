import type { Metadata } from "next";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import Transition from "./template";
import Providers from "@/components/ProgressBarProvider";
import {Manrope, Syne} from 'next/font/google'
export const metadata: Metadata = {
  title: "Online-Shop",
  description: "a online store",
};
const syne = Syne({
  weight: ['400', '500','600','700'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-syne',
})
const manrope = Manrope({
  weight: ['400', '500','600','700'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope',
})

export default function RootLayout({
  children,
  router,
}: Readonly<{
  children: React.ReactNode;
  router: any;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${manrope.variable}`}>
      <StoreProvider>
        <body className={`${syne.variable} ${manrope.variable}`}>
          <Providers>{children}</Providers>
        </body>
      </StoreProvider>
    </html>
  );
}
