"use client";
import DashboardLayout from "../../layout/dashboardLayout";
// import { SearchProvider } from "../../components/search/searchContext";
import AdminSidebar from "../../components/sidebars/AdminSidebar";
import DashboardNavbar from "../../components/dashboardNavbar/DashboardNavbar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <DashboardLayout >
      <div className="flex ">
      {/* <SearchProvider> */}
        <AdminSidebar />
        <DashboardNavbar >
          {children}
        </DashboardNavbar>
      {/* </SearchProvider> */}
      </div>
    </DashboardLayout>
  );
};

export default AdminLayout;