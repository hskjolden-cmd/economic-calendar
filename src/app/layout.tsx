import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import Link from "next/link";
import NavBar from "../components/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Economic Calendar",
  description: "Comparing global economic levels to Norway across the calendar year.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50 min-h-screen flex flex-col text-slate-900`}>
        <NavBar />

        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
          {children}
        </main>
        
        <footer className="bg-white border-t mt-auto py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-slate-500 space-y-1">
            <p>Created by Henrik Skorpe Skjolden</p>
            <p>Data provided by the World Bank.</p>
            <div className="pt-1">
              <Link href="/methodology" className="hover:text-blue-600">Methodology</Link>
            </div>
          </div>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
