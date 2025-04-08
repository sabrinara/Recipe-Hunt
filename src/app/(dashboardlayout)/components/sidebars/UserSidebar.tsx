"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebarContext } from "../../layout/layout-context";
import { Image } from "@heroui/react";
import {  House, ListCheck,Utensils } from "lucide-react";
import SidebarMenu from "./SidebarMenu";
import SidebarItem from "./SidbarItems";
import { MdHomeWork } from "react-icons/md";

const UserSidebar = () => {
  const pathname = usePathname();
  const { collapsed } = useSidebarContext();

  return (
    <div className="hidden md:flex h-screen z-[20] sticky top-0">
        <div
      className={`relative top-0 left-0 z-30 h-screen  shadow-lg transition-transform duration-300 ease-in-out bg-white dark:bg-[#1b1a1a]
      ${collapsed ? "-translate-x-full md:translate-x-0" : "translate-x-0"} w-64`}
    >
      <div className="flex flex-col h-full overflow-y-auto p-4">
        {/* Logo */}
        <div className="mb-6">
          <Link href="/" className="flex items-center justify-center">
            <Image
              src="/assets/navlogo.png"
              alt="nav logo"
              className="h-10 w-auto md:h-14"
            />
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-2">
          <SidebarItem
            title="Home"
            icon={<House />}
            isActive={pathname === "/dasboard"}
            href="/dasboard"
          />

          <SidebarMenu title="More menu">
            <SidebarItem
              isActive={pathname === "/dasboard/create-recipe"}
              title="Create Recipe"
              icon={<Utensils size={18} />}
              href="/dasboard/create-recipe"
            />
            <SidebarItem
              isActive={pathname === "/dasboard/my-recipes"}
              title="My Recipes"
              icon={<ListCheck size={18} />}
              href="/dasboard/my-recipes"
            />
         
          </SidebarMenu>
        </nav>

        
        <div className="mt-auto  text-center text-gray-500 dark:text-gray-400">
        <Link href="/" className="flex items-center justify-center text-lg" title="Back to home page">
            <MdHomeWork
            />
          </Link>
        <h1 className="text-sm">  User Panel © 2025</h1>
        </div>
      </div>
    </div>
    </div>
  );
};

export default UserSidebar;
