"use client";

import { useEffect, useState } from "react";
import { getAllUsers } from "@/services/UserServices";
import { UserData } from "@/types";
import LoadingPage from "@/app/(commonlayout)/component/pages/shared/LoadingPage";
import { Button, Image } from "@heroui/react";
import { FaTrashAlt } from "react-icons/fa";
import DeleteModalUser from "./DeleteModalUser";
import { toast } from "sonner";
const USERS_PER_PAGE = 5;
const AllUsers = () => {
    const [users, setUsers] = useState<UserData[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleteUser, setDeleteUser] = useState<UserData | null>(null);
    const [currentPage, setCurrentPage] = useState(1);

    const fetchUsers = async () => {
        try {
            const data = await getAllUsers();
            setUsers(data);
        } catch (error) {
            console.error("Failed to fetch users:", error);
            toast.error("Failed to load users");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = (user: UserData) => {
        setDeleteUser(user);
    };
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
            <h2 className="text-3xl font-semibold mb-4 text-[#E10101] text-center pt-10">
                All Users
            </h2>
            <div className="overflow-x-auto p-4">
                <table className="min-w-full border border-gray-300 dark:border-gray-800 text-sm">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Image</th>
                            <th className="py-2 px-4">Name</th>
                            <th className="py-2 px-4">Email</th>
                            <th className="py-2 px-4">Current Role</th>
                            <th className="py-2 px-4">Delete User</th>
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
                                    <td className="py-2 px-4 uppercase font-medium">{u.role}</td>
                                    <td className="py-2 px-4">
                                        <Button
                                            onPress={() => handleDelete(u)}
                                            className="bg-[#E10101] text-white "
                                        >
                                            <FaTrashAlt />
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
                {/* Pagination Controls */}
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
                            className={`px-3 py-1 rounded ${currentPage === i + 1
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
            {deleteUser && (
                <DeleteModalUser
                    user={deleteUser}
                    isOpen={true}
                    onClose={() => setDeleteUser(null)}
                    onDeleted={(userId) => {
                        console.log("Deleted user ID:", userId);
                        setDeleteUser(null);
                        fetchUsers();
                    }}
                />
            )}
        </div>
    );
};

export default AllUsers;
