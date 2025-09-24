import React, { useEffect, useState } from "react";
import { User } from "lucide-react"; // Using lucide-react for default icon
import NavBar from "../components/NavBar";

function UserCard({ user }) {
  return (
    <div className="bg-gray-900 text-white rounded-xl shadow-lg p-6 flex flex-col items-center space-y-4 hover:scale-105 transition-transform">
      <User className="w-12 h-12 text-blue-500" />
      <p className="text-lg font-semibold">{user.email}</p>
      <span
        className={`px-3 py-1 rounded-full text-sm font-medium ${
          user.role === "ADMIN" ? "bg-yellow-500 text-black" : "bg-blue-500"
        }`}
      >
        {user.role}
      </span>
    </div>
  );
}

export default function Users() {
  const prefix = "/api/v1";
  const token = localStorage.getItem("token");
  const [errors, setErrors] = useState([]);
  const [users, setUsers] = useState([]);
  const fetchUser = async () => {
    const res = await fetch(prefix + "/user", {
      headers: { Authorization: token },
    });
    const data = await res.json();

    if (!res.ok) {
      setErrors(data.errors);
      return;
    }
    setUsers(data);
  };
  useEffect(() => {
    fetchUser();
  }, [token]);
  return (
    <div className="flex min-h-screen bg-black">
      <NavBar />

      <div className="flex-1 gap-6 p-6">
        <h1 className="text-3xl font-bold text-blue-500 mb-6">Users</h1>
        <UserCard key={users.id} user={users} />
      </div>
    </div>
  );
}
