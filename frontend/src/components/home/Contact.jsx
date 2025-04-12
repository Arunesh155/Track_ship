import React from "react";
import Navbar from "./Navbar";

const Contact = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        <section
          id="contact"
          className="max-w-4xl mx-auto text-center py-16"
        >
          <h2 className="text-3xl font-bold text-gray-800">Contact Us</h2>
          <p className="mt-4 text-gray-600">
            📍 <strong>Address:</strong> No. 2, R P Muthu Plaza, North Pradesanam Road, Karur
          </p>
          <p className="mt-2 text-gray-600">
            📞 <strong>Contact:</strong> Nagendran M - 9865789406
          </p>
        </section>
      </main>

      <footer className="site-footer text-center py-4 bg-gray-800 text-white">
        <p>&copy; 2025 Sri Angalamman Agency. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Contact;
