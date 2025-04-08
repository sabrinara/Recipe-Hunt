"use client";

import { useEffect, useState } from "react";

const UserDashboard = () => {
  const [user, setUser] = useState<{ name?: string; email?: string }>({});

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div>
      bhjdfskfh
      <h1 className="text-2xl">Welcome, {user.name || "Guest"}</h1>
      <p>Email: {user.email || "Not available"}</p>
    </div>
  );
};

export default UserDashboard;
