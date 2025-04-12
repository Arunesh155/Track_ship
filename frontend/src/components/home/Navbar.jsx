import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="bg-gray-700 text-white py-4 shadow-lg">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6">
        <h1 className="text-2xl font-bold">Sri Angalamman Agency</h1>
        <ul className="flex space-x-6">
          <li><a href="/" className="nav-link">Home</a></li>
          <li><a href="/about" className="nav-link">About</a></li>
          <li><a href="/services" className="nav-link">Services</a></li>
          <li><a href="/contact" className="nav-link">Contact</a></li>
          <li><a href="/login" className="nav-link">Login</a></li> 
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;