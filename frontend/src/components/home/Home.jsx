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
          <h1 className="text-4xl font-bold overflow-hidden">
            <div className="scrolling-text whitespace-nowrap inline-block animate-marquee">
              Welcome to Sri Angalamman Agency
            </div>
            <p className="mt-4 text-lg">
              Your trusted partner for quality services in Karur.
            </p>
          </h1>
        </header>
      </main>
      <footer className="bg-gray-700 text-gray-300 px-8 py-12 mt-auto">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 text-sm">

          {/* Company Overview */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Sri Angalamman Agency</h3>
            <p>
              Serving Karur and surrounding regions with dedication and reliability, we specialize in delivering top-quality services that prioritize customer satisfaction. Our team is committed to upholding trust and transparency in every project we undertake.
            </p>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-white text-base font-semibold mb-3">Explore</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="hover:underline">Home</a></li>
              <li><a href="#services" className="hover:underline">Services</a></li>
              <li><a href="#about" className="hover:underline">About Us</a></li>
              <li><a href="#contact" className="hover:underline">Contact</a></li>
              <li><a href="#faq" className="hover:underline">FAQ</a></li>
            </ul>
          </div>

          {/* Terms & Policies */}
          <div>
            <h4 className="text-white text-base font-semibold mb-3">Legal & Support</h4>
            <ul className="space-y-2">
              <li><a href="#terms" className="hover:underline">Terms & Conditions</a></li>
              <li><a href="#privacy" className="hover:underline">Privacy Policy</a></li>
              <li><a href="#support" className="hover:underline">Help & Support</a></li>
              <li><a href="#service-policy" className="hover:underline">Service Policy</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white text-base font-semibold mb-3">Contact Us</h4>
            <p>Sri Angalamman Agency</p>
            <p>123 Main Road, Karur, Tamil Nadu</p>
            <p>Phone: +91 98765 43210</p>
            <p>Email: support@angalammanagency.com</p>
            <p>Hours: Mon - Sat, 9am - 7pm</p>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Home;
