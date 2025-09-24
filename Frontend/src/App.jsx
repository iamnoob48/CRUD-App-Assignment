import { useState } from "react";
import DashBoard from "./components/DashBoard.jsx";
import Navbar from "./components/NavBar.jsx";
import { Router, Routes, Route, useNavigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Analytics from "./pages/Analytics.jsx";
import Admin from "./pages/Admin.jsx";
import Users from "./pages/User.jsx";

function App() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  return (
    <>
      <div className=" min-h-screen bg-gray-900">
        <Routes>
          {!token && <Route path={"/"} element={<Login />}></Route>}
          {token && <Route path="/" element={<DashBoard />} />}
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/user" element={<Users />} />
        </Routes>
        {/* <Navbar/>
      <main className='flex-1 p-6'>
        <DashBoard/>

      </main> */}
      </div>
    </>
  );
}

export default App;
