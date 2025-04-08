"use client";

// import { useEffect, useState } from "react";
import RecipeCard from "../components/recipeCard/RecipeCard";

const UserDashboard = () => {
  // const [user, setUser] = useState<{ name?: string; email?: string }>({});

  // useEffect(() => {
  //   const storedUser = localStorage.getItem("user");
  //   if (storedUser) {
  //     setUser(JSON.parse(storedUser));
  //   }
  // }, []);

  return (
    <div className="">
    <RecipeCard/>
    </div>
  );
};

export default UserDashboard;
