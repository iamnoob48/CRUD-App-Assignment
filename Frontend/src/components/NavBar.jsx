import React, { useEffect, useState } from "react";
import { Home, BarChart, User, LogOut } from "lucide-react";
import Icons from "./Icons";
import { Link, useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  const [role, setRole] = useState(null);
  const token = localStorage.getItem("token");
  const prefix = "/api/v1";

  const findRole = async () => {
    const res = await fetch(prefix + "/user", {
      headers: { Authorization: token, "Content-Type": "application/json" },
    });
    const data = await res.json();
    setRole(data.role);
  };

  useEffect(() => {
    findRole();
  }, [token]);
  return (
    <nav className="min-h-screen w-40 bg-gray-900 border-r flex flex-col py-8">
      {/* Nav Links */}
      <div className="flex flex-col space-y-4 text-gray-300">
        <Link
          to="/"
          className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-800 hover:text-white transition"
        >
          <Icons icons={<Home />} />
          <span>Home</span>
        </Link>

        {role === "ADMIN" && (
          <Link
            to="/admin"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-800 hover:text-white transition"
          >
            <Icons icons={<BarChart />} />
            <span>Admin Dashboard</span>
          </Link>
        )}

        <Link
          to="/analytics"
          className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-800 hover:text-white transition"
        >
          <Icons icons={<BarChart />} />
          <span>Dashboard</span>
        </Link>

        <Link
          to="/user"
          className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-800 hover:text-white transition"
        >
          <Icons icons={<User />} />
          <span>User</span>
        </Link>
      </div>

      {/* Spacer + Logout at bottom */}
      <div className="flex-1"></div>
      <button
        onClick={logout}
        className="flex items-center gap-3 px-4 py-2 rounded-lg text-red-400 hover:bg-red-600 hover:text-white transition m-4"
      >
        <Icons icons={<LogOut />} />
        <span>Logout</span>
      </button>
    </nav>
  );
}

export default NavBar;
