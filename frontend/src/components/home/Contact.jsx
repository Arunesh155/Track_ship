import React from "react";
import Navbar from "./Navbar";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        <section className="max-w-5xl mx-auto py-16 px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">Contact Us</h2>

          <div className="bg-white shadow-lg rounded-xl overflow-hidden flex flex-col md:flex-row p-6">
            {/* Contact Info */}
            <div className="md:w-1/2 p-8 flex flex-col justify-center space-y-6">
              <div className="flex items-start">
                <FaMapMarkerAlt className="text-2xl text-blue-600 mr-4 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">Address</h3>
                  <p className="text-gray-600">
                    NO 2, R P Muthu Plaza, Near Thinnappa Theatre, <br />
                    North Pradesanam Road - 639001, Karur.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <FaPhoneAlt className="text-2xl text-green-600 mr-4 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">Phone</h3>
                  <p className="text-gray-600">Nagendran M - 98657 89406</p>
                </div>
              </div>

              <div className="flex items-start">
                <FaEnvelope className="text-2xl text-red-600 mr-4 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">Email</h3>
                  <p className="text-gray-600">
                    <a href="mailto:sriangalammanagency@gmail.com" className="text-blue-600 hover:underline">
                      sriangalammanagency@gmail.com
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Google Map */}
            <div className="md:w-1/2 h-80">
              <iframe
                title="map"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3913.052000889432!2d78.0809982!3d10.9578465!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b006ff356010b0f%3A0x64f79510ae4e9b4b!2sThinnappa%20Theatre!5e0!3m2!1sen!2sin!4v1712920170123!5m2!1sen!2sin"
              ></iframe>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Contact;
