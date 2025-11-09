import React from 'react';
import { FaCar, FaShieldAlt, FaDollarSign, FaClock, FaCheckCircle } from 'react-icons/fa';

const Hero = () => {
  const values = [
    {
      icon: <FaShieldAlt className="text-4xl text-blue-400" />,
      title: "Accessibility",
      description: "Make vehicle rentals easy and affordable for everyone, anywhere, anytime."
    },
    {
      icon: <FaCheckCircle className="text-4xl text-green-400" />,
      title: "Quality",
      description: "Maintain high standards for all vehicles with thorough verification and inspection."
    },
    {
      icon: <FaShieldAlt className="text-4xl text-purple-400" />,
      title: "Trust",
      description: "Build a secure and reliable platform with verified vehicles and trusted owners."
    },
    {
      icon: <FaClock className="text-4xl text-yellow-400" />,
      title: "Flexibility",
      description: "Offer flexible rental periods and convenient pickup/delivery options."
    },
    {
      icon: <FaCar className="text-4xl text-pink-400" />,
      title: "Innovation",
      description: "Continuously enhance our platform for the best rental experience."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e510_1px,transparent_1px),linear-gradient(to_bottom,#4f46e510_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      <div className="absolute top-0 -left-40 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 -right-40 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-40 left-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Hero Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6">
            Your Journey, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">Our Wheels</span>
          </h1>
          <p className="mt-6 text-xl md:text-2xl text-blue-200/90 max-w-4xl mx-auto leading-relaxed">
            Driven by innovation, <strong className="text-white">RentX</strong> revolutionizes vehicle rentals through
            <strong className="text-blue-300"> accessibility</strong>, <strong className="text-purple-300">affordability</strong>,
            and <strong className="text-pink-300"> trust</strong>. We provide a seamless platform for renting cars, bikes, scooters,
            and more—making every journey memorable.
          </p>
        </div>

        {/* Our Values Grid */}
        <div className="mt-20">
          <h2 className="text-4xl font-extrabold text-center text-white mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="relative group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-60 transition duration-500"></div>
                <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 p-8 h-full">
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                    <p className="text-slate-300 leading-relaxed">{value.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { number: "500+", label: "Vehicles Available" },
            { number: "10K+", label: "Happy Customers" },
            { number: "50+", label: "Cities Covered" },
            { number: "4.8★", label: "Average Rating" }
          ].map((stat, index) => (
            <div key={index} className="relative group text-center">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-20 group-hover:opacity-50 transition duration-500"></div>
              <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-xl border border-slate-700/50 p-6">
                <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-slate-300 font-medium">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }

        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-blob { animation: blob 7s infinite; }
        .animate-fade-in { animation: fade-in 0.8s ease-out; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </div>
  );
};

export default Hero;