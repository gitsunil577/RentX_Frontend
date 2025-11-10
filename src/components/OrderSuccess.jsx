import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaHome, FaCar } from "react-icons/fa";

function OrderSuccess() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    // Countdown timer
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e510_1px,transparent_1px),linear-gradient(to_bottom,#4f46e510_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      <div className="relative z-10 max-w-2xl w-full">
        <div className="relative group">
          {/* Glowing border effect */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 rounded-2xl blur opacity-50 group-hover:opacity-75 transition duration-500 animate-pulse"></div>

          <div className="relative bg-slate-900/95 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-8 md:p-12">
            {/* Success Icon */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-green-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
                <FaCheckCircle className="relative text-green-400 text-8xl md:text-9xl animate-bounce" />
              </div>
            </div>

            {/* Success Message */}
            <h1 className="text-3xl md:text-5xl font-extrabold text-center mb-4 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Payment Successful!
            </h1>

            <p className="text-xl md:text-2xl text-center text-slate-300 mb-3">
              Your booking has been confirmed
            </p>

            <p className="text-center text-slate-400 mb-8">
              Thank you for choosing <span className="text-blue-400 font-semibold">RentX</span>. Your vehicle rental has been successfully processed.
            </p>

            {/* Info Box */}
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 md:p-6 mb-8">
              <p className="text-blue-300 text-center text-sm md:text-base">
                A confirmation email has been sent to your registered email address with all the booking details.
              </p>
            </div>

            {/* Countdown */}
            <div className="text-center mb-8">
              <p className="text-slate-400 text-sm mb-2">
                Redirecting to home page in
              </p>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-2xl font-bold shadow-lg">
                {countdown}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate("/")}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-blue-500/50 hover:scale-105 active:scale-95"
              >
                <FaHome className="text-lg" />
                Go to Home
              </button>

              <button
                onClick={() => navigate("/vehicles")}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-lg border border-slate-600 transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <FaCar className="text-lg" />
                Browse More Vehicles
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccess;
