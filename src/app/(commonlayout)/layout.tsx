// "use client";
import { AuthOptions } from "@/config/nextauth.config";
import type { Metadata } from "next";
import Footer from "./component/pages/shared/Footer";
import Navbar from "./component/pages/shared/Navbar";
import { getServerSession } from "next-auth";

export const metadata: Metadata = {
  title: "Recipe Hunt",
  description: "A recipe sharing website, where users can share their recipes.",
};

export default async function CommonLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await getServerSession(AuthOptions);
  console.log("user",session);

  
 

  return (
    <div>
      <Navbar session={session} />
      {children}
     <Footer />
    </div>
  );
}
