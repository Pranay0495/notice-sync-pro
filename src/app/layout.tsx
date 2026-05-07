import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/providers/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NoticeSync Pro | Unified Tax Notice Management",
  description: "Automate your Income Tax and GST notice tracking. Built specifically for modern Chartered Accountants by P.S. Jajodia & Associates.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen bg-background bg-grid-pattern relative`}>
        <AuthProvider>
          {/* Ambient background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/20 blur-[120px] rounded-full pointer-events-none -z-10" />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
