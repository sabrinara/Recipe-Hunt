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
import { BiHome } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { MdFastfood } from "react-icons/md";
import { LuClipboardPenLine } from "react-icons/lu";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { FiAlignRight } from "react-icons/fi";

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
    router.push("/");
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    setIsLoading(true);
    
  };

  return (
    <Dropdown placement="bottom-end" className="bg-white dark:bg-[#1b1a1a]">
      <DropdownTrigger>
        {user ? <button className="focus:outline-none">
          <Avatar
            src={user?.imageUrl || "/default-avatar.png"}
            name={user?.name || "User"}
            title={user?.name || "User"}
            size="md"
            isBordered
          />
        </button> :
          <button>

            <FiAlignRight />
          </button>
        }
      </DropdownTrigger>

      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem key="profile" className="h-14 gap-2">
          {/* <p className="font-semibold">Signed in as</p> */}
          <p className="font-semibold truncate text-lg">{user?.name || "No Name"}</p>
          <p className="font-semibold truncate">{user?.email || "No Email"}</p>
        </DropdownItem>
        {user?.role === "admin" ? <>
          <DropdownItem key="home" href="/admin" className="flex md:hidden ">
            <div className="flex justify-start items-center gap-1">
              <BiHome className="text-md text-[#E10101]" />
              <h1 className="font-medium"> Home</h1>
            </div>
          </DropdownItem>
          <DropdownItem key="settings" href="/profile">
            <div className="flex justify-start gap-1">
              <CgProfile className="text-lg text-[#E10101]" />
              <h1 className="font-medium">My Profile</h1>
            </div>
          </DropdownItem>
          <DropdownItem key="manage-recipe" href="/admin/manage-recipe" className="flex md:hidden ">
            <div className="flex justify-start gap-1">
              <MdFastfood className="text-lg text-[#E10101]" />
              <h1 className="font-medium">Manage Recipe</h1>
            </div>
          </DropdownItem>

          <DropdownItem key="manage-users" href="/admin/users-manage" className="flex md:hidden ">
            <div className="flex justify-start gap-1">
              <BiHome className="text-lg text-[#E10101]" />
              <h1 className="font-medium">Manage Users</h1>
            </div>
          </DropdownItem>
          <DropdownItem key="make-admin" href="/admin/make-admin" className="flex md:hidden ">
            <div className="flex justify-start gap-1">
              <BiHome className="text-lg text-[#E10101]" />
              <h1 className="font-medium">Make Admin</h1>
            </div>
          </DropdownItem>
        </>
          : <>
            <DropdownItem key="home" href="/dashboard" className="flex md:hidden ">
              <div className="flex justify-start gap-1">
                <BiHome className="text-lg text-[#E10101]" />
                <h1 className="font-medium">Home</h1>
              </div>
            </DropdownItem>
            <DropdownItem key="settings" href="/profile">
              <div className="flex justify-start gap-1">
                <CgProfile className="text-lg text-[#E10101]" />
                <h1 className="font-medium">My Profile</h1>
              </div>

            </DropdownItem>
            <DropdownItem key="create-recipe" href="/dashboard/create-recipe" className="flex md:hidden ">
              <div className="flex justify-start gap-1">
                <LuClipboardPenLine className="text-lg text-[#E10101]" />
                <h1 className="font-medium">Create Recipe</h1>
              </div>
            </DropdownItem>
            <DropdownItem key="my-recipes" href="/dashboard/my-recipes" className="flex md:hidden ">
              <div className="flex justify-start gap-1">
                <MdFastfood className="text-lg text-[#E10101]" />
                <h1 className="font-medium">My Recipes</h1>
              </div>

            </DropdownItem>
          </>

        }



        <DropdownItem key="logout" onClick={handleLogout}>
          <div className="flex justify-start gap-1">
            <RiLogoutBoxRLine className="text-lg text-[#E10101]" />
            <h1 className="font-medium">Log Out</h1>
          </div>

        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default UserNavbar;
