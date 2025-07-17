import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Solace Candidate Assignment",
  description: "Show us what you got",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} 
        bg-slate-800 text-gray-100 text-base sm:text-lg 
        grid grid-cols-3 xl:grid-cols-7 2xl:grid-cols-11`}
      >
        {children}
      </body>
    </html>
  );
}
