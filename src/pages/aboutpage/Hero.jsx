import React, { useState } from 'react';

const Hero = () => {
  const [showValuesParagraph, setShowValuesParagraph] = useState(false);

  const handleOurValuesClick = () => {
    setShowValuesParagraph(!showValuesParagraph);
  };

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 lg:flex lg:items-center">
        <div className="lg:w-1/2">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            We're More Than Just a Company
          </h2>
          <p className="mt-4 text-lg text-gray-500 leading-relaxed">
            Driven by innovation, <strong>RentX</strong> empowers communities through smart sharing, built on <strong>sustainability</strong>, <strong>accessibility</strong>, and <strong>trust</strong>. We simplify renting, fostering connections and reducing environmental impact. Join us in a smarter way to share.
          </p>

          <div className="mt-8">
            <button
              onClick={handleOurValuesClick}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-semibold rounded-md shadow-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus-ring-2 focus-ring-offset-2 focus-ring-indigo-500 transition-opacity duration-300"
            >
              Our Values
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${
              showValuesParagraph ? 'max-h-96 opacity-100 mt-6' : 'max-h-0 opacity-0 mt-0'
            }`}>
              <div className="bg-gray-50 rounded-md shadow-sm p-6 mt-4">
                <h3 className="text-xl font-semibold text-indigo-600 mb-2">Our Guiding Principles</h3>
                <ul className="list-disc list-inside text-gray-700 leading-relaxed">
                  <li className="mb-1">
                    <strong className="font-semibold text-gray-900">Sustainability:</strong> Minimize environmental impact through responsible sharing.
                  </li>
                  <li className="mb-1">
                    <strong className="font-semibold text-gray-900">Accessibility:</strong> Make renting easy and affordable for everyone.
                  </li>
                  <li className="mb-1">
                    <strong className="font-semibold text-gray-900">Trust:</strong> Build a secure and reliable platform for all users.
                  </li>
                  <li className="mb-1">
                    <strong className="font-semibold text-gray-900">Community:</strong> Foster connections and collaboration among our users.
                  </li>
                  <li>
                    <strong className="font-semibold text-gray-900">Innovation:</strong> Continuously improve our platform for the best experience.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 lg:mt-0 lg:ml-8 lg:w-1/2">
          <div className="aspect-w-5 aspect-h-3 sm:aspect-w-2 sm:aspect-h-1 md:aspect-w-3 md:aspect-h-2">
            <img
              className="object-cover shadow-lg rounded-md"
              src="/about-us-image.jpg"
              alt="Our Team or Company Culture"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;