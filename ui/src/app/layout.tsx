import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import StoreProvider from "@/store/provider";
import clsx from "clsx";
import NextAuthSessionProvider from "@/providers/SessionProvider";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Order Book",
  description: "Stock app where you can buy or sell.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={clsx(
          inter.className,
          "flex flex-col transition-colors duration-500 dark:bg-slate-900 bg-white",
        )}
      >
        <NextAuthSessionProvider>
          <StoreProvider>
            {children}
            <Toaster position="bottom-right" reverseOrder={false} />
          </StoreProvider>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
