import type { Metadata } from "next";
import AdminLayout from "./layout/AdminLayout";

export const metadata: Metadata = {
    title: "Recipe Hunt",
    description: "A recipe sharing website, where users can share their recipes.",
  };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <AdminLayout>{children}</AdminLayout>
    </div>
  );
}