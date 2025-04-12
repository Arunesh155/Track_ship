import React from "react";
import Navbar from "./Navbar";

const Services = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        <section id="services" className="bg-white py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800">Our Services</h2>
            <div className="grid md:grid-cols-3 gap-8 mt-8">
              <div className="p-6 bg-gray-100 rounded-lg shadow-md service-card">
                <h3 className="text-xl font-semibold text-gray-700">📦 Quality Products</h3>
                <p className="mt-2 text-gray-600">Top-quality products tailored to your needs.</p>
              </div>
              <div className="p-6 bg-gray-100 rounded-lg shadow-md service-card">
                <h3 className="text-xl font-semibold text-gray-700">🛠 Reliable Services</h3>
                <p className="mt-2 text-gray-600">Timely and efficient service delivery.</p>
              </div>
              <div className="p-6 bg-gray-100 rounded-lg shadow-md service-card">
                <h3 className="text-xl font-semibold text-gray-700">💬 Customer Support</h3>
                <p className="mt-2 text-gray-600">24/7 support to assist your needs.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-200 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800">Why Choose Us?</h2>
            <p className="mt-4 text-gray-600">We are committed to providing the best services in Karur.</p>
          </div>
        </section>
      </main>

      <footer className="site-footer text-center py-4 bg-gray-800 text-white">
        <p>&copy; 2025 Sri Angalamman Agency. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Services;
