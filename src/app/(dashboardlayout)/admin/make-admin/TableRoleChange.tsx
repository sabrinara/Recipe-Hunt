"use client";

import { useEffect, useState } from "react";
import { getAllUsers } from "@/services/UserServices";
import MakeAdminComponent from "./MakeAdminComponent";
import { UserData } from "@/types";
import LoadingPage from "@/app/(commonlayout)/component/pages/shared/LoadingPage";
import { Image } from "@heroui/react";



const TableRoleChange = () => {
    const [users, setUsers] = useState<UserData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
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

        fetchUsers();
    }, []);

    if (loading) return <div><LoadingPage /></div>;

    return (
        <div>
            <h2 className="text-3xl font-semibold mb-4 text-[#E10101] text-center pt-10"> All Users</h2>
            <div className="overflow-x-auto p-4">
                <table className="min-w-full border border-gray-300 dark:border-gray-800 text-sm">
                    <thead className="">
                        <tr>
                            <th className="px-4 py-2 ">Image</th>
                            <th className=" py-2 px-4">Name</th>
                            <th className=" py-2 px-4">Email</th>
                            <th className=" py-2 px-4">Current Role</th>
                            <th className=" py-2 px-4">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="text-center py-4 text-gray-500">
                                    No users found
                                </td>
                            </tr>
                        ) : (
                            users.map((u) => (
                                <tr key={u._id} className="border-t border-gray-300 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 text-center">
                                    <td className="px-4 py-2 flex justify-center items-center">
                                        <Image src={u.imageUrl} alt={u.name} className="w-16 h-16 object-cover rounded-full" />
                                    </td>
                                    <td className="py-2 px-4">{u.name}</td>
                                    <td className="py-2 px-4">{u.email}</td>
                                    <td className="py-2 px-4">{u.role}</td>
                                    <td className="py-2 px-4">
                                        <MakeAdminComponent userId={u._id} currentRole={u.role} />
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>

                </table>
            </div>

        </div>
    );
};

export default TableRoleChange;
