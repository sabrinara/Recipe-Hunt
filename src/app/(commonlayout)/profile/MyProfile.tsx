/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { getUserById } from '@/services/AuthServices';
import { Image } from '@heroui/react';
import React, { useEffect, useState } from 'react';

const MyProfile = () => {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const storedUser = localStorage.getItem('user');
                if (!storedUser) {
                    setError('User not found in localStorage');
                    setLoading(false);
                    return;
                }

                const parsedUser = JSON.parse(storedUser);
                const id = parsedUser?._id;

                if (!id) {
                    setError('User ID missing in stored user data');
                    setLoading(false);
                    return;
                }

                const userData = await getUserById(id);
                setUser(userData);
            } catch (err: any) {
                setError(err.message || 'Error fetching user');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    if (loading) return <p className="text-center text-gray-600">Loading...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="max-w-md mx-auto mt-10  shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">My Profile</h2>
            <Image
                src={user.imageUrl}
                alt={user.name}
                className="w-16 h-16 object-cover rounded-full"
            />
            <p><strong>Name: </strong> {user?.name}</p>
            <p><strong>Email: </strong> {user?.email}</p>
            <p><strong>Joined: </strong> {new Date(user?.createdAt).toLocaleDateString()}</p>
            {/* Add more fields as needed */}
        </div>
    );
};

export default MyProfile;
