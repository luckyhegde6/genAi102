import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        <nav className="bg-gray-800 p-4 text-white flex gap-4">
          <Link href="/workflows">Workflows</Link>
          <Link href="/tasks">Tasks</Link>
        </nav>
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}
