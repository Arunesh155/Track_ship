import React from "react";

const AboutUs = () => {
  return (
    <div className="p-6 max-w-3xl mx-auto text-center">
      <h2 className="text-2xl font-semibold">Sri Angalamman Agency</h2>
      <p className="mt-2 text-lg">Welcome to <strong>Sri Angalamman Agency</strong>, your trusted partner for quality services. Located in the heart of Karur, we are committed to delivering excellence in all that we do.</p>
      
      <div className="mt-4">
        <h3 className="text-xl font-semibold">📍 Address:</h3>
        <p>No. 2, R P Muthu Plaza,</p>
        <p>North Pradesanam Road,</p>
        <p>Karur - 639001</p>
        <p>(Near Thinnappa Theatre)</p>
      </div>
      
      <div className="mt-4">
        <h3 className="text-xl font-semibold">📞 Contact Person:</h3>
        <p><strong>Nagendran M</strong></p>
        <p>9865789406</p>
      </div>
      
      <p className="mt-6 text-lg">Feel free to visit us or contact us for more information.</p>
    </div>
  );
};

export default AboutUs;