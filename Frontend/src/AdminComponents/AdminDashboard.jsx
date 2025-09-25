import { useEffect, useState } from "react";
import AdminPopupModal from "./AdminPopupModal";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const prefix = "/api/v1";
  const token = localStorage.getItem("token");
  const [isOpen, setIsopen] = useState(false);
  const [errors, setErrors] = useState([]);

  const stats = {
    totalUsers: users.length,
    totalAdmins: users.filter((u) => u.role === "ADMIN").length,
  };

  const fetchUsers = async () => {
    const res = await fetch(prefix + "/admin", {
      headers: { Authorization: token },
    });
    const data = await res.json();
    if (!res.ok) {
      return;
    }
    setUsers(data);
  };

  const handleSubmit = async (formdata) => {
    try {
      const res = await fetch(prefix + "/admin", {
        method: "POST",
        headers: { Authorization: token, "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formdata.email,
          password: formdata.password,
          role: formdata.role.toUpperCase(),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrors(data.errors);
        return;
      }
      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  };

  const makeAdmin = async (id) => {
    try {
      const res = await fetch(prefix + "/admin" + `/${id}`, {
        method: "PUT",
        headers: { Authorization: token, "Content-Type": "application/json" },
        body: JSON.stringify({ role: "ADMIN" }),
      });
      if (!res.ok) {
        return;
      }
      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  };

  const removeUser = async (id) => {
    try {
      const res = await fetch(prefix + "/admin" + `/${id}`, {
        method: "DELETE",
        headers: { Authorization: token, "Content-Type": "application/json" },
      });
      const data = await res.json();

      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  };

  const revokeAdmin = async (id) => {
    try {
      const res = await fetch(prefix + "/admin" + `/${id}`, {
        method: "PUT",
        headers: { Authorization: token, "Content-Type": "application/json" },
        body: JSON.stringify({ role: "USER" }),
      });
      const data = await res.json();
      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [token]);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-500">Admin Dashboard</h1>
      </header>

      {/* Overview Cards */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-900 p-4 rounded shadow">
          <h2 className="text-lg text-gray-400">Total Users</h2>
          <p className="text-2xl font-bold text-blue-500">{stats.totalUsers}</p>
        </div>
        <div className="bg-gray-900 p-4 rounded shadow">
          <h2 className="text-lg text-gray-400">Total Admins</h2>
          <p className="text-2xl font-bold text-blue-500">
            {stats.totalAdmins}
          </p>
        </div>
      </div>

      {/* Add User Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsopen(true)}
          className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded font-medium"
        >
          Add User
        </button>
      </div>

      {/* Users Table */}
      <div className="bg-gray-900 p-4 rounded shadow overflow-x-auto">
        <table className="w-full table-auto text-left">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-gray-800 transition-colors duration-200"
              >
                <td className="px-4 py-2">{user.id}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.role}</td>
                <td className="px-4 py-2 space-x-2">
                  {user.role !== "ADMIN" && (
                    <button
                      onClick={() => makeAdmin(user.id)}
                      className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded text-sm"
                    >
                      Make Admin
                    </button>
                  )}
                  <button
                    onClick={() => removeUser(user.id)}
                    className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm"
                  >
                    Remove
                  </button>
                  {user.role === "ADMIN" && (
                    <button
                      className="bg-yellow-200 px-3 py-1 text-black rounded text-sm hover:bg-yellow-300"
                      onClick={() => revokeAdmin(user.id)}
                    >
                      Revoke Admin
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="4" className="px-4 py-2 text-center text-gray-400">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {isOpen && (
          <AdminPopupModal
            isOpen={isOpen}
            onSubmit={handleSubmit}
            onClose={() => {
              setIsopen(false);
              setErrors([]);
            }}
            errors={errors}
          />
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
