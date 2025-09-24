import React, { useEffect, useState } from "react";
import DashBoard from "../components/DashBoard";
import { useNavigate } from "react-router-dom";

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState([]);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();
  const prefix = "/api/v1";

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data;

    try {
      const isSamePass = password === confirmPass;
      if (!isLogin && !isSamePass) {
        setIsError(true);
        setError(["Passwords dont match"]);
        return;
      }
      if (!username.trim()) {
        setIsError(true);
        setError(["Email is required"]);

        return;
      }
      if (!password.trim()) {
        setIsError(true);
        setError(["Password is required"]);
        return;
      }

      if (!isLogin) {
        const response = await fetch(prefix + "/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: username, password: confirmPass }),
        });
        data = await response.json();

        if (!response.ok) {
          setIsError(true);
          setError(data.errors);
          return;
        }
      } else {
        const response = await fetch(prefix + "/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: username, password: password }),
        });
        data = await response.json();
      }
      if (data.message) {
        setError([data.message]);
        setIsError(true);
        return;
      }
      if (data.token) {
        localStorage.setItem("token", data.token);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md">
        <div className="flex justify-around mb-6">
          <button
            onClick={() => setIsLogin(true)}
            className={`pb-2 border-b-2 ${
              isLogin
                ? "border-blue-500 text-blue-400"
                : "border-transparent text-gray-400"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`pb-2 border-b-2 ${
              !isLogin
                ? "border-blue-500 text-blue-400"
                : "border-transparent text-gray-400"
            }`}
          >
            Signup
          </button>
          {isError && error.length > 0 && (
            <div className="text-red-500 border border-red-600 p-2 rounded mb-4 text-center">
              <ul className="list-disc list-inside">
                {error.map((err, idx) => (
                  <li key={idx}>{err}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-300 mb-1">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full p-3 rounded bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 outline-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full p-3 rounded bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {!isLogin && (
            <div>
              <label className="block text-gray-300 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full p-3 rounded bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl transition"
          >
            {isLogin ? "Login" : "Signup"}
          </button>
        </form>

        <p className="text-center text-gray-400 mt-4 text-sm">
          {isLogin ? (
            <>
              Don’t have an account?{" "}
              <span
                onClick={() => setIsLogin(false)}
                className="text-blue-400 hover:underline cursor-pointer"
              >
                Sign up
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span
                onClick={() => setIsLogin(true)}
                className="text-blue-400 hover:underline cursor-pointer"
              >
                Log in
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
}

export default Login;
