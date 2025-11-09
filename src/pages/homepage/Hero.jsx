import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaCar, FaMotorcycle, FaBicycle, FaArrowRight, FaStar } from 'react-icons/fa';

function Hero() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex items-center justify-center relative overflow-hidden w-full">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e510_1px,transparent_1px),linear-gradient(to_bottom,#4f46e510_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

      {/* Animated gradient orbs */}
      <div className="absolute top-0 -left-40 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 -right-40 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-40 left-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
              opacity: 0.3 + Math.random() * 0.5,
            }}
          ></div>
        ))}
      </div>

      <div className="w-full px-6 py-16 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Hero Header */}
          <div className="text-center mb-16 animate-slide-down">
            <div className="flex justify-center mb-8">
              <div className="relative group">
                {/* Glowing background */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-3xl opacity-75 group-hover:opacity-100 transition-opacity duration-500 animate-pulse-slow"></div>

                {/* Logo */}
                <div className="relative">
                  <h1 className="text-8xl font-black tracking-tight">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-white drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]">
                      Rent
                    </span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-purple-500 drop-shadow-[0_0_30px_rgba(59,130,246,0.8)] animate-pulse-glow">
                      X
                    </span>
                  </h1>
                </div>
              </div>
            </div>

            <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-6 animate-fade-in">
              Your Journey Begins with the Perfect Ride
            </h2>
            <p className="text-xl text-blue-200/90 mb-12 max-w-3xl mx-auto animate-fade-in-delay font-light leading-relaxed">
              Discover premium vehicles at your fingertips. From luxury cars to eco-friendly bikes,
              find your perfect ride for any adventure. Book instantly, drive confidently.
            </p>

            {/* Stats */}
            <div className="flex justify-center gap-8 mb-12 animate-fade-in-delay-2">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-400 mb-1">500+</div>
                <div className="text-sm text-slate-300">Vehicles</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-400 mb-1">10K+</div>
                <div className="text-sm text-slate-300">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-pink-400 mb-1">4.8</div>
                <div className="text-sm text-slate-300 flex items-center gap-1">
                  <FaStar className="text-yellow-400" /> Rating
                </div>
              </div>
            </div>
          </div>

          {/* Vehicle Categories */}
          <div className="grid md:grid-cols-3 gap-6 mb-12 animate-slide-up">
            {/* Car Card */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl blur opacity-30 group-hover:opacity-75 transition duration-500"></div>
              <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <FaCar className="text-3xl text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Cars</h3>
                  <p className="text-slate-300 mb-4">Luxury sedans, SUVs, and sports cars for every occasion</p>
                  <div className="text-blue-400 font-semibold">From ₹999/day →</div>
                </div>
              </div>
            </div>

            {/* Bike Card */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-30 group-hover:opacity-75 transition duration-500"></div>
              <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <FaMotorcycle className="text-3xl text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Bikes</h3>
                  <p className="text-slate-300 mb-4">Powerful motorcycles and sports bikes for thrill-seekers</p>
                  <div className="text-purple-400 font-semibold">From ₹499/day →</div>
                </div>
              </div>
            </div>

            {/* Bicycle Card */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl blur opacity-30 group-hover:opacity-75 transition duration-500"></div>
              <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50 hover:border-green-500/50 transition-all duration-300 hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <FaBicycle className="text-3xl text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Eco-Friendly</h3>
                  <p className="text-slate-300 mb-4">Bicycles and electric scooters for green commutes</p>
                  <div className="text-green-400 font-semibold">From ₹199/day →</div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-delay-2">
            <Link
              to="/vehicles"
              className="group/btn relative w-full sm:w-auto px-12 h-16 overflow-hidden rounded-xl font-bold text-white transition-all duration-300 hover:scale-[1.05] active:scale-[0.98] inline-flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 transition-all duration-300 group-hover/btn:from-blue-500 group-hover/btn:via-purple-500 group-hover/btn:to-blue-600"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700"></div>

              <span className="relative flex items-center justify-center gap-3 text-lg uppercase tracking-wider">
                <span>Explore Vehicles</span>
                <FaArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-200" />
              </span>
            </Link>

            <Link
              to="/vehicle/register"
              className="group/reg w-full sm:w-auto px-12 h-16 border-2 border-slate-600 rounded-xl text-slate-300 bg-transparent hover:bg-slate-800/50 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 transition-all duration-300 font-semibold text-lg uppercase tracking-wider hover:scale-[1.05] active:scale-[0.98] relative overflow-hidden inline-flex items-center justify-center"
            >
              <span className="relative z-10">List Your Vehicle</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/10 to-purple-600/0 translate-x-[-100%] group-hover/reg:translate-x-[100%] transition-transform duration-700"></div>
            </Link>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(-100vh) translateX(20px); opacity: 0; }
        }

        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.75; }
          50% { opacity: 1; }
        }

        @keyframes pulse-glow {
          0%, 100% { filter: drop-shadow(0 0 30px rgba(59, 130, 246, 0.8)); }
          50% { filter: drop-shadow(0 0 50px rgba(147, 51, 234, 1)); }
        }

        .animate-blob { animation: blob 7s infinite; }
        .animate-float { animation: float linear infinite; }
        .animate-slide-down { animation: slide-down 0.6s ease-out; }
        .animate-slide-up { animation: slide-up 0.6s ease-out 0.4s both; }
        .animate-fade-in { animation: fade-in 0.6s ease-out 0.2s both; }
        .animate-fade-in-delay { animation: fade-in 0.6s ease-out 0.4s both; }
        .animate-fade-in-delay-2 { animation: fade-in 0.6s ease-out 0.6s both; }
        .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
        .animate-pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </div>
  );
}

export default Hero;
