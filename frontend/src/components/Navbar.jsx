import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear JWT
    navigate("/"); // Redirect to login
  };
  return (
    <nav className="bg-slate-800/40 backdrop-blur-lg text-white fixed top-0 w-full z-50 shadow-md">
      <div className="mycontainer flex justify-between items-center px-4 py-8 h-14">
        <div className="logo font-bold text-white text-2xl">
          <span className="text-blue-400"> &lt;</span>
          <span>Vault</span>
          <span className="text-blue-400">Keeper / &gt;</span>
        </div>
        <button
          onClick={handleLogout}
          className="bg-blue-400 text-slate-900 px-4 py-2 rounded hover:bg-blue-300 transition font-semibold cursor-pointer"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
