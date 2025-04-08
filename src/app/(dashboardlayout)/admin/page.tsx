"use client";

import RecipeCard from "../components/recipeCard/RecipeCard";

// import { useEffect, useState } from "react";

const AdminDashboard = () => {
  // const [user, setUser] = useState<{ name?: string; email?: string }>({});

  // useEffect(() => {
  //   const storedUser = localStorage.getItem("user");
  //   if (storedUser) {
  //     setUser(JSON.parse(storedUser));
  //   }
  // }, []);

  return (
    <div>
       <RecipeCard/>
    </div>
  );
};

export default AdminDashboard;
