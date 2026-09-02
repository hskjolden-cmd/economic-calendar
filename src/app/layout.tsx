import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { CalendarIcon, Globe, Info, BarChart3, MapIcon } from "lucide-react";

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
        <header className="bg-white border-b sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-blue-900">
                <Globe className="w-6 h-6 text-blue-600" />
                Economic Calendar
              </Link>
              <nav className="hidden sm:flex gap-6">
                <Link href="/" className="text-sm font-medium text-slate-600 hover:text-blue-600 flex items-center gap-1.5 transition-colors">
                  <Info className="w-4 h-4" /> Home
                </Link>
                <Link href="/calendar" className="text-sm font-medium text-slate-600 hover:text-blue-600 flex items-center gap-1.5 transition-colors">
                  <CalendarIcon className="w-4 h-4" /> Calendar
                </Link>
                <Link href="/map" className="text-sm font-medium text-slate-600 hover:text-blue-600 flex items-center gap-1.5 transition-colors">
                  <MapIcon className="w-4 h-4" /> Map
                </Link>
                <Link href="/ranking" className="text-sm font-medium text-slate-600 hover:text-blue-600 flex items-center gap-1.5 transition-colors">
                  <BarChart3 className="w-4 h-4" /> Rankings
                </Link>
                <Link href="/methodology" className="text-sm font-medium text-slate-600 hover:text-blue-600 flex items-center gap-1.5 transition-colors">
                  <Info className="w-4 h-4" /> Methodology
                </Link>
              </nav>
            </div>
          </div>
        </header>

        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
          {children}
        </main>
        
        <footer className="bg-white border-t mt-auto py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-slate-500">
            <p>Data provided by the World Bank. Norway is used solely as an economic benchmark.</p>
            <div className="mt-2 space-x-4">
              <Link href="/methodology" className="hover:text-blue-600">Methodology & Limitations</Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
