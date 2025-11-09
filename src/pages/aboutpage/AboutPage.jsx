import React from 'react';
import Hero from './Hero';


function AboutPage() {
  return (
    <div>
      {/* Hero Section */}
      <Hero />

      {/* Optional smaller content */}
     

      {/* Our Mission */}
      <section className="py-12 bg-white text-center px-6">
        <h2 className="text-3xl font-bold text-indigo-600 mb-4">Our Mission</h2>
        <p className="max-w-3xl mx-auto text-gray-600 text-lg">
          At RentX, our mission is to make borrowing and lending easier than ever. We empower people
          to share underutilized items within their community — reducing costs, promoting sustainability,
          and encouraging trust-based local connections.
        </p>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 bg-gray-50 text-center px-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Why Choose RentX?</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-indigo-600 mb-2">Affordable & Flexible</h3>
            <p className="text-gray-600">Rent items only when you need them — no buying, no storing.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-indigo-600 mb-2">Community Driven</h3>
            <p className="text-gray-600">Support your neighborhood by renting from and to people near you.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-indigo-600 mb-2">Easy & Secure</h3>
            <p className="text-gray-600">Simple listings, secure transactions, and verified users.</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 bg-white text-center px-6">
        <h2 className="text-3xl font-bold text-indigo-600 mb-4">How It Works</h2>
        <div className="max-w-2xl mx-auto text-gray-700 text-left">
          <ol className="list-decimal list-inside space-y-3 text-lg">
            <li>Browse available items listed in your city or neighborhood.</li>
            <li>Request to rent with just a few clicks — no lengthy forms.</li>
            <li>Pick up the item or schedule a delivery, depending on the listing.</li>
            <li>Use it, return it, and rate your experience!</li>
          </ol>
        </div>
      </section>

      {/* User Testimonials */}
      <section className="py-16 bg-gray-50 text-center px-6">
        <h2 className="text-3xl font-bold text-indigo-600 mb-10">What Our Users Say</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition duration-300">
            <p className="text-gray-600 mb-4 italic">
              "I rented a drill for a weekend DIY project. It was super affordable and the process was so smooth!"
            </p>
            <div className="text-yellow-400 text-lg mb-2">★★★★★</div>
            <h4 className="font-semibold text-gray-800">Rohit Sharma</h4>
            <p className="text-sm text-gray-500">Mumbai, India</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition duration-300">
            <p className="text-gray-600 mb-4 italic">
              "Listing my camera for rent has helped me earn extra money — I love the concept!"
            </p>
            <div className="text-yellow-400 text-lg mb-2">★★★★★</div>
            <h4 className="font-semibold text-gray-800">Anjali Verma</h4>
            <p className="text-sm text-gray-500">Delhi, India</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition duration-300">
            <p className="text-gray-600 mb-4 italic">
              "Great UI, simple to use, and fantastic support from the team. Highly recommend RentX!"
            </p>
            <div className="text-yellow-400 text-lg mb-2">★★★★★</div>
            <h4 className="font-semibold text-gray-800">Mihir Das</h4>
            <p className="text-sm text-gray-500">Bhubaneswar, India</p>
          </div>

        </div>
      </section>
    </div>
  );
}

export default AboutPage;
