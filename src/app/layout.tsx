import type { Metadata } from "next";
import "./globals.css";
import { NavBar } from "./components/Navbar";
import Head from "next/head";

export const metadata: Metadata = {
  title: "Signlino",
  description: "Duolingo for Sign Language!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="h-screen font-sans">
        <NavBar />
        {children}
      </body>
    </html>
  );
}
