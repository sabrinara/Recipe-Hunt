"use client";

import React from "react";
import DashboardLayout from "../../layout/dashboardLayout";
import DashboardNavbar from "../../components/dashboardNavbar/DashboardNavbar";
import UserSidebar from "../../components/sidebars/UserSidebar";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <DashboardLayout>
      <div className="flex">
        <UserSidebar/>
        <DashboardNavbar>{children}</DashboardNavbar> 
      </div>
    </DashboardLayout>
  );
};

export default UserLayout;