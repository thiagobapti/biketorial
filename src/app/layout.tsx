import type { Metadata } from "next";
import "../styles/index.scss";
import { montserrat } from "../styles/fonts";

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
      <body className={`${montserrat.variable}`}>{children}</body>
    </html>
  );
}
