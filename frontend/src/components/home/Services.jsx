import React from "react";
import Navbar from "./Navbar";
import { motion } from "framer-motion";
import productImg from "../../images/product.jpg";
import serviceImg from "../../images/service.webp";
import supportImg from "../../images/support.webp";

const serviceData = [
  {
    title: "📦 Quality Products",
    description: "Top-quality products tailored to your needs.",
    image: productImg,
  },
  {
    title: "🛠 Reliable Services",
    description: "Timely and efficient service delivery.",
    image: serviceImg,
  },
  {
    title: "💬 Customer Support",
    description: "24/7 support to assist your needs.",
    image: supportImg,
  },
];

const Services = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        <section id="services" className="bg-white py-16 px-4">
          <div className="max-w-6xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">Our Services</h2>
          </div>

          <div className="space-y-16">
            {serviceData.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`flex flex-col md:flex-row items-center justify-between bg-white shadow-xl rounded-xl overflow-hidden ${
                  index % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Image Section */}
                <div className="md:w-1/2 w-full h-72 md:h-96">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Text Section */}
                <div className="md:w-1/2 w-full p-8 text-center md:text-left">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-lg">{service.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Services;
