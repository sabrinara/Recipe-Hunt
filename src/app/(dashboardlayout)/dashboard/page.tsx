"use client"


const DashboardPage = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  return (

    <div>
      <h1 className="text-2xl">Welcome, {user.name}</h1>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default DashboardPage;