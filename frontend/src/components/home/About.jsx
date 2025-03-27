import React from "react";

const AboutUs = () => {
  return (
    <div className="p-6 max-w-3xl mx-auto text-center bg-white shadow-lg rounded-2xl">
      <h2 className="text-3xl font-bold text-gray-800">Sri Angalamman Agency</h2>
      <p className="mt-4 text-lg text-gray-600">
        Welcome to <strong>Sri Angalamman Agency</strong>, your trusted partner for quality services. 
        Located in the heart of Karur, we are committed to delivering excellence in all that we do.
      </p>

      <div className="mt-6 p-4 bg-gray-100 rounded-lg">
        <h3 className="text-xl font-semibold text-gray-800">📍 Address:</h3>
        <p className="text-gray-600">No. 2, R P Muthu Plaza,</p>
        <p className="text-gray-600">North Pradesanam Road,</p>
        <p className="text-gray-600">Karur - 639001</p>
        <p className="text-gray-600">(Near Thinnappa Theatre)</p>
      </div>

      <div className="mt-6 p-4 bg-gray-100 rounded-lg">
        <h3 className="text-xl font-semibold text-gray-800">📞 Contact Person:</h3>
        <p className="text-gray-700 font-medium"><strong>Nagendran M</strong></p>
        <p className="text-gray-700">9865789406</p>
      </div>

      <p className="mt-6 text-lg text-gray-600">
        Feel free to visit us or contact us for more information.
      </p>
    </div>
  );
};

export default AboutUs;
