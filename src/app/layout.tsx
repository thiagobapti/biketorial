import type { Metadata } from "next";
import "../styles/index.scss";
import { montserrat } from "../styles/fonts";
import Head from "next/head";
import Header from "@/components/header";
import { CartContextProvider } from "@/contexts/cart";
import Modal from "@/components/modal";

export const metadata: Metadata = {
  title: "Biketorial",
  description: "Biketorial",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable}`}>
        <CartContextProvider>
          <Header />
          {children}
          <Modal />
        </CartContextProvider>
      </body>
    </html>
  );
}
