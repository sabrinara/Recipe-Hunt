import type { Metadata } from "next";

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
            Common Navbar
            {children}
        </div>
    );
}
