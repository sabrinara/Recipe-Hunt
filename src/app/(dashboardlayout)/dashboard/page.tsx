// app/dashboard/page.tsx
import { AuthOptions } from "@/config/nextauth.config";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(AuthOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div>
      <h1 className="text-2xl">Welcome, {session.user?.name}</h1>
      <p>Email: {session.user?.email}</p>
    </div>
  );
}
