import React from "react";
import Navbar from "./Navbar";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ship from "../../images/ship.jpg";
import truck from "../../images/truck.jpg";
import flight from "../../images/flight.jpg";

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
          <p className="mt-2 text-sm text-gray-500 italic">
            Established in 2017
          </p>

          <p className="mt-4 text-gray-600">
            Sri Angalamman Agency, based in Karur, is dedicated to providing
            excellent services and ensuring customer satisfaction. We specialize
            in shipping solutions via air, sea, and land, offering reliable
            logistics through flight, container, and shipway options.
          </p>

          {/* Carousel Section */}
          <div className="mt-10 flex justify-center">
            <div className="w-full max-w-2xl">
              <Carousel
                autoPlay
                infiniteLoop
                showThumbs={false}
                showStatus={false}
                showArrows={true}
                className="rounded-lg shadow-lg"
              >
                <div>
                  <img
                    src={flight}
                    alt="Air Courier"
                    className="h-[300px] object-cover w-full"
                  />
                  <p className="legend">Air Courier</p>
                </div>
                <div>
                  <img
                    src={ship}
                    alt="Shipway Logistics"
                    className="h-[300px] object-cover w-full"
                  />
                  <p className="legend">Shipway Logistics</p>
                </div>
                <div>
                  <img
                    src={truck}
                    alt="Container Transport"
                    className="h-[300px] object-cover w-full"
                  />
                  <p className="legend">Container Transport</p>
                </div>
              </Carousel>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;
