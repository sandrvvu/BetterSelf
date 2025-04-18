import type { Metadata } from "next";
import { Montserrat, Gravitas_One } from "next/font/google";
import "./globals.css";

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
        {children}
      </body>
    </html>
  );
}

