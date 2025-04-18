// app/components/admin/MakeAdminComponent.tsx
"use client";

import { makeAdmin } from "@/services/AdminServics";
import { Button } from "@heroui/button";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
  userId: string;
  currentRole: string;
  onRoleChange: () => void;
};

const MakeAdminComponent = ({ userId, currentRole , onRoleChange}: Props) => {
  const [loading, setLoading] = useState(false);

  const handleMakeAdmin = async () => {
    const token = localStorage.getItem("accessToken"); 

    if (!token) {
      console.error("No access token found");
      return;
    }

    const payload = {
      role: "admin",
    };

    setLoading(true);
    try {
      await makeAdmin(userId, token, payload);
      toast("Role Updated as Admin successfully!");
      onRoleChange();
    } catch (err) {
      console.error("Make admin failed", err);
    } finally {
      setLoading(false);
    }
  };

  if (currentRole === "admin") return <span className="text-[#E10101] font-semibold text-sm">Already Admin</span>;

  return (
    <Button
      disabled={loading}
      onClick={handleMakeAdmin}
      className="bg-[#E10101] hover:bg-[#e12e01] text-white text-sm font-semibold"
    >
      {loading ? "Updating..." : "Make Admin"}
    </Button>
  );
};

export default MakeAdminComponent;
