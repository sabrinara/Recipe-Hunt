import type { Metadata } from "next";
import Footer from "./component/pages/shared/Footer";
import Navbar from "./component/pages/shared/Navbar";

export const metadata: Metadata = {
    title: "Recipe Hunt",
    description: "A recipe sharing website, where user can share their recipes.",
};

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
           <Navbar></Navbar>
            {children}
            <Footer></Footer>
        </div>
    );
}
