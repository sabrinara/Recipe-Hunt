"use client";

import { useEffect, useState } from "react";
import { getAllUsers } from "@/services/UserServices";
import MakeAdminComponent from "./MakeAdminComponent";
import { UserData } from "@/types";
import LoadingPage from "@/app/(commonlayout)/component/pages/shared/LoadingPage";



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
            <h2 className="text-xl font-semibold mb-4">User List</h2>
            <table className="w-full border-collapse">
                <thead>
                    <tr className="border-b">
                        <th className="text-left py-2 px-4">Name</th>
                        <th className="text-left py-2 px-4">Email</th>
                        <th className="text-left py-2 px-4">Current Role</th>
                        <th className="text-left py-2 px-4">Action</th>
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
                            <tr key={u._id} className="border-b">
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
    );
};

export default TableRoleChange;
