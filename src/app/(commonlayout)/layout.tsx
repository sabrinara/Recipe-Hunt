"use client";
// import type { Metadata } from "next";
import Footer from "./component/pages/shared/Footer";
import Navbar from "./component/pages/shared/Navbar";
import { usePathname } from "next/navigation";

// export const metadata: Metadata = {
//   title: "Recipe Hunt",
//   description: "A recipe sharing website, where users can share their recipes.",
// };

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  // Define paths where Navbar and Footer should be hidden
  const hideNavbarAndFooter = ["/login", "/register"].includes(pathname);

  return (
    <div>
      {!hideNavbarAndFooter && <Navbar />}
      {children}
      {!hideNavbarAndFooter && <Footer />}
    </div>
  );
}
