import React from "react";
import Navbar from "./Navbar";

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <header id="home" className="bg-gray-400 text-white text-center py-16">
        <h1 className="text-4xl font-bold">Welcome to Sri Angalamman Agency</h1>
        <p className="mt-4 text-lg">Your trusted partner for quality services in Karur.</p>
      </header>

      {/* General Details Section */}
      <section id="about" className="max-w-4xl mx-auto text-center py-16 px-6">
        <h2 className="text-3xl font-bold text-gray-800">About Us</h2>
        <p className="mt-4 text-gray-600">
          Sri Angalamman Agency, based in Karur, is dedicated to providing excellent services 
          and ensuring customer satisfaction. We specialize in offering high-quality products and 
          solutions tailored to our clients’ needs.
        </p>
      </section>

      {/* Services Section */}
      <section id="services" className="bg-white py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800">Our Services</h2>
          <div className="grid md:grid-cols-3 gap-8 mt-8">
            <div className="p-6 bg-gray-100 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-700">📦 Quality Products</h3>
              <p className="mt-2 text-gray-600">We provide top-quality products tailored to your needs.</p>
            </div>
            <div className="p-6 bg-gray-100 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-700">🛠 Reliable Services</h3>
              <p className="mt-2 text-gray-600">Our team ensures timely and efficient service delivery.</p>
            </div>
            <div className="p-6 bg-gray-100 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-700">💬 Customer Support</h3>
              <p className="mt-2 text-gray-600">24/7 support to assist you with your needs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="max-w-4xl mx-auto text-center py-16">
        <h2 className="text-3xl font-bold text-gray-800">Contact Us</h2>
        <p className="mt-4 text-gray-600">
          📍 <strong>Address:</strong> No. 2, R P Muthu Plaza, North Pradesanam Road, Karur - 639001 (Near Thinnappa Theatre)
        </p>
        <p className="mt-2 text-gray-600">
          📞 <strong>Contact:</strong> Nagendran M - 9865789406
        </p>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-4">
        <p>&copy; 2025 Sri Angalamman Agency. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;