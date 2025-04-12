import React from "react";
import Navbar from "./Navbar";

const About = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        <section
          id="about"
          className="max-w-4xl mx-auto text-center py-16 px-6"
        >
          <h2 className="text-3xl font-bold text-gray-800">About Us</h2>
          <p className="mt-4 text-gray-600">
            Sri Angalamman Agency, based in Karur, is dedicated to providing excellent services
            and ensuring customer satisfaction...
          </p>
        </section>
      </main>

      <footer className="site-footer text-center py-4 bg-gray-800 text-white">
        <p>&copy; 2025 Sri Angalamman Agency. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default About;
