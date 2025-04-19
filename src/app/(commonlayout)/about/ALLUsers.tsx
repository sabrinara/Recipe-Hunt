/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { getAllUsers } from '@/services/UserServices';
import { Image } from '@heroui/react';
import React, { useEffect, useState } from 'react';

const ALLUsers = () => {
  const [users, setUsers] = useState<any[]>([]); 
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getAllUsers();
        setUsers(usersData);
      } catch (err: any) {
        setError(err.message || 'Error fetching users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Meet Our All Users</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {users.map((user, index) => (
          <div key={index} className="flex flex-col justify-center items-center p-4 text-center hover:shadow-xl">
            <Image src={user.imageUrl} alt='user image' className=' w-20 h-20 rounded-full'/>
            <h2 className="text-xl font-bold">{user.name}</h2>
            <p className="text-sm text-gray-600">{user.email}</p>
            <p className="text-sm text-gray-500">{user.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ALLUsers;
