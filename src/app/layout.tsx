import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { MainLayout } from "@/lib/components/layout";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--poppins",
});

export const metadata: Metadata = {
  title: "Data2Bots Chart",
  description: "Chart",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable}`} suppressHydrationWarning>
      <body className="font-poppins">
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
