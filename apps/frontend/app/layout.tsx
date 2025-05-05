import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

import type { Metadata } from "next";
import { Gravitas_One, Montserrat } from "next/font/google";
import { ToastContainer } from "react-toastify";

import ClientLayout from "./client-layout";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});

const gravitasOne = Gravitas_One({
  display: "swap",
  variable: "--font-gravitas-one",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "BetterSelf",
  description: "Goal achievement app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="./favicon.ico" />
      </head>
      <body
        className={`${montserrat.variable} ${gravitasOne.variable} font-montserrat`}
      >
        <ClientLayout>{children}</ClientLayout>
        <ToastContainer position="top-right" autoClose={3000} />
      </body>
    </html>
  );
}
