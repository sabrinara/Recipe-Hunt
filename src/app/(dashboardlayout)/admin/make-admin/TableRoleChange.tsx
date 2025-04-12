"use client";

import { useEffect, useState } from "react";
import { getAllUsers } from "@/services/UserServices";
import MakeAdminComponent from "./MakeAdminComponent";
import { UserData } from "@/types";
import LoadingPage from "@/app/(commonlayout)/component/pages/shared/LoadingPage";
import { Image } from "@heroui/react";

const USERS_PER_PAGE = 5;

const TableRoleChange = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  // ✅ Move fetchUsers outside of useEffect
  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const totalPages = Math.ceil(users.length / USERS_PER_PAGE);
  const startIndex = (currentPage - 1) * USERS_PER_PAGE;
  const currentUsers = users.slice(startIndex, startIndex + USERS_PER_PAGE);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (loading) return <LoadingPage />;

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-4 text-[#E10101] text-center pt-10">Make Admin</h2>
      <div className="overflow-x-auto p-4">
        <table className="min-w-full border border-gray-300 dark:border-gray-800 text-sm">
          <thead>
            <tr>
              <th className="px-4 py-2">Image</th>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Current Role</th>
              <th className="py-2 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500">
                  No users found
                </td>
              </tr>
            ) : (
              currentUsers.map((u) => (
                <tr
                  key={u._id}
                  className="border-t border-gray-300 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 text-center"
                >
                  <td className="px-4 py-2 flex justify-center items-center">
                    <Image
                      src={u.imageUrl}
                      alt={u.name}
                      className="w-16 h-16 object-cover rounded-full"
                    />
                  </td>
                  <td className="py-2 px-4">{u.name}</td>
                  <td className="py-2 px-4">{u.email}</td>
                  <td className="py-2 px-4">{u.role}</td>
                  <td className="py-2 px-4">
                    <MakeAdminComponent
                      userId={u._id}
                      currentRole={u.role}
                      onRoleChange={fetchUsers}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-center gap-4 mt-4">
          <button
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? "bg-[#E10101] text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TableRoleChange;
