import React, { useEffect, useState } from "react";
import AdminDashboard from "../AdminComponents/AdminDashboard";
import NavBar from "../components/NavBar";

function Admin() {
  const [role, setRole] = useState([]);
  const token = localStorage.getItem("token");
  const prefix = "/api/v1";

  const findRole = async () => {
    const res = await fetch(prefix + "/user", {
      headers: { Authorization: token, "Content-Type": "application/json" },
    });
    const data = await res.json();
    setRole(data);
  };
  useEffect(() => {
    findRole();
  }, [token]);
  return (
    <div>
      {role.role === "ADMIN" ? (
        <div className="flex min-h-screen bg-black text-white">
          <NavBar />
          <div className="flex-1 p-6">
            <AdminDashboard />
          </div>
        </div>
      ) : (
        <div>
          <p className="text-center text-3xl font-extrabold text-white">
            You are not an admin
          </p>
        </div>
      )}
    </div>
  );
}

export default Admin;
