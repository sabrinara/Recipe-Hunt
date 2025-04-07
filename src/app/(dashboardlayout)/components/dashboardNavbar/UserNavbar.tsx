/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";

const UserNavbar = () => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  console.log(isLoading)

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    setIsLoading(true);
    router.push("/");
  };

  return (
    <Dropdown placement="bottom-end" className="bg-white dark:bg-[#1b1a1a]">
      <DropdownTrigger>
        <button className="focus:outline-none">
          <Avatar
            src={user?.imageUrl || "/default-avatar.png"}
            name={user?.name || "User"}
            title={user?.name || "User"}
            size="md"
            isBordered
          />
        </button>
      </DropdownTrigger>

      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem key="profile" className="h-14 gap-2">
          {/* <p className="font-semibold">Signed in as</p> */}
          <p className="font-semibold truncate text-lg">{user?.name || "No Name"}</p>
          <p className="font-semibold truncate">{user?.email || "No Email"}</p>
        </DropdownItem>

        <DropdownItem key="home" href="/admin" className="flex md:hidden ">
          Home
        </DropdownItem>
        <DropdownItem key="settings" href="/admin/profile">
          My Profile
        </DropdownItem>
        <DropdownItem key="manage-recipe" href="/admin/manage-recipe" className="flex md:hidden ">
          Manage Recipe
        </DropdownItem>
        <DropdownItem key="manage-users" href="/admin/users" className="flex md:hidden ">
          Manage Users
        </DropdownItem>

        <DropdownItem key="logout" color="danger" onClick={handleLogout}>
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default UserNavbar;
