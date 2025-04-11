"use client";

import React from "react";
import { Navbar, NavbarContent } from "@heroui/react";
import UserNavbar from "./UserNavbar";
import { ThemeSwitcher } from "@/app/(commonlayout)/component/pages/shared/ThemeSwitcher";

const DashboardNavbar = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden z-10">
      <Navbar
        className="w-full  shadow-lg bg-white dark:bg-[#1b1a1a]"
        classNames={{
          wrapper: "w-full max-w-full",
        }}
      >
        {/* Right-aligned navbar content */}
        <NavbarContent>
          <div className="flex justify-end items-center w-full gap-3 " >
            <ThemeSwitcher />
            <UserNavbar />
          </div>
        </NavbarContent>
      </Navbar>

      {/* Page content below navbar */}
      {children}
    </div>
  );
};

export default DashboardNavbar;
