"use client";

import { useEffect, useState } from "react";
import { getAllUsers } from "@/services/UserServices";
import { UserData } from "@/types";
import LoadingPage from "@/app/(commonlayout)/component/pages/shared/LoadingPage";
import { Button, Image } from "@heroui/react";
import { FaTrashAlt } from "react-icons/fa";
import DeleteModalUser from "./DeleteModalUser";
import { toast } from "sonner";

const AllUsers = () => {
    const [users, setUsers] = useState<UserData[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleteUser, setDeleteUser] = useState<UserData | null>(null);

    // ✅ Move fetchUsers outside so it can be reused
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
                            <th className="py-2 px-4">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="text-center py-4 text-gray-500">
                                    No users found
                                </td>
                            </tr>
                        ) : (
                            users.map((u) => (
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
                                        <Button
                                            onPress={() => handleDelete(u)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <FaTrashAlt />
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
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
