/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const BannerButton = () => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleCreateRecipe = () => {
    if (!user) {
      toast.error("You must be logged in to create a recipe.");
      router.push("/login");
    } else if (user.role === "admin") {
      router.push("/admin/create-recipe");
    } else {
      router.push("/dashboard/create-recipe");
    }
  };

  return (
    <div className="space-x-2 md:space-x-5 text-center mt-4 md:mt-10">
      <Button
        onClick={handleCreateRecipe}
        className="bg-gradient-to-l from-[#E10101] to-[#790d0d] text-white font-bold hover:bg-gradient-to-r hover:from-[#790d0d] hover:to-[#E10101] rounded-sm text-sm md:text-base"
      >
        Create Recipe
      </Button>

      <Button
        onClick={() => router.push("/recipe")}
        className="border border-[#E10101] text-[#E10101] font-bold rounded-sm text-sm md:text-base"
        variant="bordered"
      >
        Learn More
      </Button>
    </div>
  );
};

export default BannerButton;
