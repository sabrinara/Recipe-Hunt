import type { Metadata } from "next";
import UserLayout from "./layout/UserLayout";

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
      <UserLayout>{children}</UserLayout>
    </div>
  );
}