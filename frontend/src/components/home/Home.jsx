import React from "react";
import Navbar from "./Navbar";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container bg-gray-100 min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <main className="flex-grow">
        <header id="home" className="hero-section text-center py-16">
          <h1 className="text-4xl font-bold">
            <span className="bold-company-name">
              Welcome to Sri Angalamman Agency
              <p className="mt-4 text-lg">Your trusted partner for quality services in Karur.</p>
            </span>
          </h1>
        </header>
      </main>

      {/* Footer */}
      <footer className="site-footer text-center py-4 bg-gray-800 text-white">
        <p>&copy; 2025 Sri Angalamman Agency. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
