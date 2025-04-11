import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white py-4 shadow-lg">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6">
        <h1 className="text-2xl font-bold">Sri Angalamman Agency</h1>
        <ul className="flex space-x-6">
          <li><a href="#home" className="hover:underline">Home</a></li>
          <li><a href="#about" className="hover:underline">About</a></li>
          <li><a href="#services" className="hover:underline">Services</a></li>
          <li><a href="#contact" className="hover:underline">Contact</a></li>
          <li><a href="/login" className="hover:underline">Expense</a></li> 
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
