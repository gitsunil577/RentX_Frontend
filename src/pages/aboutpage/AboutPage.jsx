import React from 'react';
import Hero from './Hero';
import { FaRocket, FaMapMarkedAlt, FaDollarSign, FaShieldAlt, FaSearch, FaCalendarCheck, FaCar, FaStar, FaQuoteLeft } from 'react-icons/fa';

function AboutPage() {
  const features = [
    {
      icon: <FaMapMarkedAlt className="text-5xl text-blue-400" />,
      title: "Wide Selection",
      description: "Choose from cars, bikes, scooters, SUVs, and luxury vehicles at your fingertips across 50+ cities."
    },
    {
      icon: <FaDollarSign className="text-5xl text-green-400" />,
      title: "Affordable Pricing",
      description: "Competitive rates with flexible rental periods. Pay only for what you use with transparent pricing."
    },
    {
      icon: <FaShieldAlt className="text-5xl text-purple-400" />,
      title: "Easy & Secure",
      description: "Quick booking, verified vehicles, secure payment options, and 24/7 customer support."
    }
  ];

  const steps = [
    {
      number: "01",
      icon: <FaSearch className="text-4xl text-blue-400" />,
      title: "Browse Vehicles",
      description: "Explore our wide selection of vehicles in your city with detailed specifications and reviews."
    },
    {
      number: "02",
      icon: <FaCalendarCheck className="text-4xl text-purple-400" />,
      title: "Book Instantly",
      description: "Select your vehicle, choose rental period, and complete your booking in just a few clicks."
    },
    {
      number: "03",
      icon: <FaCar className="text-4xl text-green-400" />,
      title: "Pick Up & Go",
      description: "Pick up your vehicle from the designated location or get it delivered to your doorstep."
    },
    {
      number: "04",
      icon: <FaStar className="text-4xl text-yellow-400" />,
      title: "Enjoy & Rate",
      description: "Enjoy your ride, return it on time, and share your experience with the community."
    }
  ];

  const testimonials = [
    {
      quote: "Rented a bike for my weekend trip. Great condition, affordable price, and smooth pickup process! The entire experience was seamless.",
      rating: 5,
      name: "Rohit Sharma",
      location: "Mumbai, India",
      avatar: "RS"
    },
    {
      quote: "Listed my car on RentX when I'm not using it. Great way to earn passive income! The platform makes it incredibly easy.",
      rating: 5,
      name: "Anjali Verma",
      location: "Delhi, India",
      avatar: "AV"
    },
    {
      quote: "Amazing platform! Rented an SUV for a road trip. Clean vehicle and excellent service. Highly recommend RentX to everyone!",
      rating: 5,
      name: "Mihir Das",
      location: "Bhubaneswar, India",
      avatar: "MD"
    }
  ];

  return (
    <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
      {/* Hero Section */}
      <Hero />

      {/* Our Mission */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e510_1px,transparent_1px),linear-gradient(to_bottom,#4f46e510_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-block mb-6">
            <FaRocket className="text-6xl text-blue-400 animate-bounce" />
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Our Mission</h2>
          <p className="text-xl text-blue-200/90 leading-relaxed">
            At <strong className="text-white">RentX</strong>, our mission is to revolutionize vehicle rentals. We provide a seamless platform to rent
            cars, bikes, scooters, and more — making transportation <strong className="text-blue-300">affordable</strong>,
            <strong className="text-purple-300"> accessible</strong>, and <strong className="text-pink-300">convenient</strong> for everyone.
            Your journey starts here.
          </p>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold text-center text-white mb-16">Why Choose RentX?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-60 transition duration-500"></div>
                <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 p-8 text-center h-full">
                  <div className="flex justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                  <p className="text-slate-300 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold text-center text-white mb-16">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-50 transition duration-500"></div>
                <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 p-6 text-center h-full">
                  <div className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-4">
                    {step.number}
                  </div>
                  <div className="flex justify-center mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* User Testimonials */}
      <section className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold text-center text-white mb-16">What Our Users Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-60 transition duration-500"></div>
                <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 p-8 h-full flex flex-col">
                  <FaQuoteLeft className="text-3xl text-blue-400/50 mb-4" />
                  <p className="text-slate-300 mb-6 italic leading-relaxed flex-grow">
                    "{testimonial.quote}"
                  </p>
                  <div className="text-yellow-400 text-xl mb-4">
                    {Array(testimonial.rating).fill('★').join('')}
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="font-bold text-white">{testimonial.name}</h4>
                      <p className="text-sm text-slate-400">{testimonial.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-75 transition duration-500"></div>
            <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-12">
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
                Ready to Start Your Journey?
              </h2>
              <p className="text-xl text-blue-200/90 mb-8">
                Join thousands of happy customers who trust RentX for their vehicle rental needs.
              </p>
              <button
                onClick={() => window.location.href = '/vehicles'}
                className="group/btn relative px-8 py-4 overflow-hidden rounded-xl font-bold text-white transition-all duration-300 hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 transition-all duration-300 group-hover/btn:from-blue-500 group-hover/btn:via-purple-500 group-hover/btn:to-blue-600"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700"></div>
                <span className="relative text-lg uppercase tracking-wider">Browse Vehicles Now</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;
