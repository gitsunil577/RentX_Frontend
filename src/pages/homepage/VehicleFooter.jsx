import React from 'react';
import { FaStar, FaQuoteLeft, FaCar, FaMotorcycle, FaShieldAlt, FaHeadset } from 'react-icons/fa';

function VehicleFooter() {
  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "Business Owner",
      vehicle: "Mercedes S-Class",
      rating: 5,
      comment: "Absolutely premium experience! The car was spotless and drove like a dream. Perfect for my business meetings.",
      avatar: "RK",
      color: "from-blue-500 to-cyan-500"
    },
    {
      name: "Priya Sharma",
      role: "Travel Enthusiast",
      vehicle: "Royal Enfield Classic 350",
      rating: 5,
      comment: "Best bike rental service! Smooth booking, well-maintained bike, and amazing road trip experience. Highly recommended!",
      avatar: "PS",
      color: "from-purple-500 to-pink-500"
    },
    {
      name: "Amit Patel",
      role: "Software Engineer",
      vehicle: "Honda City",
      rating: 5,
      comment: "Convenient and affordable. Used it for my weekend trip with family. Clean vehicle, easy pickup and return process.",
      avatar: "AP",
      color: "from-green-500 to-emerald-500"
    },
    {
      name: "Sneha Reddy",
      role: "Student",
      vehicle: "Electric Scooter",
      rating: 4,
      comment: "Eco-friendly and budget-friendly! Perfect for daily commutes. Great customer support and hassle-free experience.",
      avatar: "SR",
      color: "from-orange-500 to-yellow-500"
    }
  ];

  const stats = [
    { icon: FaCar, label: "Vehicles Available", value: "500+" },
    { icon: FaShieldAlt, label: "Verified Owners", value: "200+" },
    { icon: FaStar, label: "Average Rating", value: "4.8/5" },
    { icon: FaHeadset, label: "24/7 Support", value: "Always" }
  ];

  return (
    <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 relative overflow-hidden w-full">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e510_1px,transparent_1px),linear-gradient(to_bottom,#4f46e510_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>

      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-20 group-hover:opacity-50 transition duration-500"></div>
              <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50 text-center">
                <stat.icon className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-blue-200/80 max-w-2xl mx-auto">
            Real experiences from real people who loved their rides with RentX
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-50 transition duration-500"></div>

              <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 h-full flex flex-col">
                {/* Quote Icon */}
                <FaQuoteLeft className="text-blue-500/30 text-3xl mb-4" />

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 text-sm" />
                  ))}
                  {[...Array(5 - testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-slate-600 text-sm" />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-slate-300 text-sm mb-6 flex-grow leading-relaxed">
                  "{testimonial.comment}"
                </p>

                {/* Vehicle */}
                <div className="text-xs text-blue-400 mb-4 font-medium">
                  Vehicle: {testimonial.vehicle}
                </div>

                {/* User Info */}
                <div className="flex items-center gap-3 pt-4 border-t border-slate-700">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.color} flex items-center justify-center font-bold text-white text-sm`}>
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">{testimonial.name}</div>
                    <div className="text-slate-400 text-xs">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Why Choose Us Section */}
        <div className="relative group mb-20">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur opacity-20"></div>
          <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-3xl p-12 border border-slate-700/50">
            <h3 className="text-3xl font-bold text-white mb-8 text-center">Why RentX Stands Out</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <FaShieldAlt className="text-2xl text-white" />
                </div>
                <h4 className="text-xl font-semibold text-white mb-2">Verified Vehicles</h4>
                <p className="text-slate-400">All vehicles thoroughly inspected and verified for safety and quality</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <FaStar className="text-2xl text-white" />
                </div>
                <h4 className="text-xl font-semibold text-white mb-2">Top Rated Service</h4>
                <p className="text-slate-400">4.8 star average rating from over 10,000+ happy customers</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <FaHeadset className="text-2xl text-white" />
                </div>
                <h4 className="text-xl font-semibold text-white mb-2">24/7 Support</h4>
                <p className="text-slate-400">Round-the-clock customer support for any queries or emergencies</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-slate-800 pt-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-300">Rent</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">X</span>
              </h3>
              <p className="text-slate-400 text-sm">
                Your trusted partner for premium vehicle rentals. Drive your dreams with confidence.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="/about" className="hover:text-blue-400 transition-colors">About Us</a></li>
                <li><a href="/products" className="hover:text-blue-400 transition-colors">Browse Vehicles</a></li>
                <li><a href="/contact" className="hover:text-blue-400 transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Terms & Conditions</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Contact Info</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>Email: support@rentx.com</li>
                <li>Phone: +91 1800-RENTX-24</li>
                <li>Address: Mumbai, India</li>
              </ul>
            </div>
          </div>

          <div className="text-center text-slate-500 text-sm border-t border-slate-800 pt-6">
            <p>© 2025 RentX. All rights reserved. Built with passion for better journeys.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VehicleFooter;
