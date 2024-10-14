import type { Metadata } from "next";
import "./globals.css";
import Providers from "./lib/Providers";


export const metadata: Metadata = {
  title: "Recipe Hunt",
  description: "A recipe sharing website, where user can share their recipes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <Providers>
         <div className="mx-auto container">
         {children}
         </div>
        </Providers>
      </body>
    </html>
  );
}
