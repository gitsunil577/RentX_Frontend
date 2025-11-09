import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaArrowRight, FaUserPlus, FaStore, FaShoppingCart } from "react-icons/fa";

function RegisterPage() {
  const [userType, setUserType] = useState("Buyer"); // "Buyer" or "Owner"
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState("");
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    if (password !== value) {
      setPasswordMatchError("Passwords do not match");
    } else {
      setPasswordMatchError("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setServerError("");
    setPasswordMatchError("");

    if (!fullName || !userName || !email || !password || !confirmPassword) {
      setServerError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setPasswordMatchError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/user/register`, {
        fullname: fullName,
        username: userName,
        email,
        password,
        typeOfCustomer: userType,
      });

      console.log("Registration success:", response.data);
      setSuccessMessage("Registration successful! Redirecting to login...");

      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate("/login");
      }, 2000);

      // Reset form
      setFullName("");
      setUserName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      setServerError(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex items-center justify-center relative overflow-hidden py-8">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e510_1px,transparent_1px),linear-gradient(to_bottom,#4f46e510_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

      {/* Animated gradient orbs */}
      <div className="absolute top-0 -left-40 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 -right-40 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-40 left-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
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

      <div className="max-w-md w-full mx-4 relative z-10">
        {/* Logo Section with Enhanced Animation */}
        <div className="text-center mb-8 animate-slide-down">
          <div className="flex justify-center mb-6">
            <div className="relative group">
              {/* Glowing background */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-500 animate-pulse-slow"></div>

              {/* Logo */}
              <div className="relative">
                <h1 className="text-7xl font-black tracking-tight">
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

          <h2 className="text-4xl font-bold text-white mb-3 animate-fade-in">
            Create Account
          </h2>
          <p className="text-lg text-blue-200/80 animate-fade-in-delay font-light">
            Start renting vehicles in minutes
          </p>
        </div>

        {/* Register Card */}
        <div className="relative group animate-slide-up">
          {/* Card glow effect */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-75 transition duration-500"></div>

          <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 overflow-hidden">
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent translate-x-[-100%] animate-shimmer"></div>

            <div className="px-8 py-10 space-y-6 relative">
              {/* Error/Success Messages */}
              {(serverError || passwordMatchError) && (
                <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-4 backdrop-blur-sm animate-shake">
                  <p className="text-red-300 text-center text-sm font-medium flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    {serverError || passwordMatchError}
                  </p>
                </div>
              )}

              {successMessage && (
                <div className="bg-green-500/10 border border-green-500/50 rounded-xl p-4 backdrop-blur-sm animate-bounce-in">
                  <p className="text-green-300 text-center text-sm font-medium flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {successMessage}
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* User Type Selection */}
                <div className="mb-6">
                  <label className="block text-slate-300 mb-3 text-sm font-medium text-center">
                    I want to register as:
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    {/* Customer Option */}
                    <button
                      type="button"
                      onClick={() => setUserType("Buyer")}
                      className={`relative group/type h-24 rounded-xl transition-all duration-300 overflow-hidden ${
                        userType === "Buyer"
                          ? 'ring-2 ring-blue-500'
                          : 'hover:scale-105'
                      }`}
                    >
                      <div className={`absolute inset-0 transition-all duration-300 ${
                        userType === "Buyer"
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600'
                          : 'bg-slate-800/50 border-2 border-slate-600'
                      }`}></div>
                      <div className="relative h-full flex flex-col items-center justify-center gap-2 text-white">
                        <FaShoppingCart className={`h-8 w-8 transition-transform duration-300 ${
                          userType === "Buyer" ? 'scale-110' : 'group-hover/type:scale-110'
                        }`} />
                        <span className="font-semibold">Customer</span>
                        <span className="text-xs text-slate-300">Rent Vehicles</span>
                      </div>
                    </button>

                    {/* Owner Option */}
                    <button
                      type="button"
                      onClick={() => setUserType("Owner")}
                      className={`relative group/type h-24 rounded-xl transition-all duration-300 overflow-hidden ${
                        userType === "Owner"
                          ? 'ring-2 ring-blue-500'
                          : 'hover:scale-105'
                      }`}
                    >
                      <div className={`absolute inset-0 transition-all duration-300 ${
                        userType === "Owner"
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600'
                          : 'bg-slate-800/50 border-2 border-slate-600'
                      }`}></div>
                      <div className="relative h-full flex flex-col items-center justify-center gap-2 text-white">
                        <FaStore className={`h-8 w-8 transition-transform duration-300 ${
                          userType === "Owner" ? 'scale-110' : 'group-hover/type:scale-110'
                        }`} />
                        <span className="font-semibold">Owner</span>
                        <span className="text-xs text-slate-300">List Vehicles</span>
                      </div>
                    </button>
                  </div>

                  {/* Info Text */}
                  <p className="mt-3 text-xs text-center text-slate-400">
                    {userType === "Buyer"
                      ? "📱 Browse and rent vehicles from different owners"
                      : "🏪 List your vehicles and manage bookings from customers"}
                  </p>
                </div>

                {/* Full Name Input */}
                <div className="relative group/input">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-0 group-hover/input:opacity-30 transition duration-300"></div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FaUser className="h-5 w-5 text-slate-400 group-focus-within/input:text-blue-400 transition-colors duration-200" />
                    </div>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Full Name"
                      className="w-full h-14 pl-12 pr-4 bg-slate-800/50 border-2 border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-slate-800/70 transition-all duration-200 hover:border-slate-500"
                      required
                    />
                  </div>
                </div>

                {/* Username Input */}
                <div className="relative group/input">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-0 group-hover/input:opacity-30 transition duration-300"></div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FaUserPlus className="h-5 w-5 text-slate-400 group-focus-within/input:text-blue-400 transition-colors duration-200" />
                    </div>
                    <input
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="Username"
                      className="w-full h-14 pl-12 pr-4 bg-slate-800/50 border-2 border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-slate-800/70 transition-all duration-200 hover:border-slate-500"
                      required
                    />
                  </div>
                </div>

                {/* Email Input */}
                <div className="relative group/input">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-0 group-hover/input:opacity-30 transition duration-300"></div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FaEnvelope className="h-5 w-5 text-slate-400 group-focus-within/input:text-blue-400 transition-colors duration-200" />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                      className="w-full h-14 pl-12 pr-4 bg-slate-800/50 border-2 border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-slate-800/70 transition-all duration-200 hover:border-slate-500"
                      required
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="relative group/input">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-0 group-hover/input:opacity-30 transition duration-300"></div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FaLock className="h-5 w-5 text-slate-400 group-focus-within/input:text-blue-400 transition-colors duration-200" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      className="w-full h-14 pl-12 pr-14 bg-slate-800/50 border-2 border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-slate-800/70 transition-all duration-200 hover:border-slate-500"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-blue-400 transition-colors duration-200 focus:outline-none"
                    >
                      {showPassword ? (
                        <FaEyeSlash className="h-5 w-5" />
                      ) : (
                        <FaEye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm Password Input */}
                <div className="relative group/input">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-0 group-hover/input:opacity-30 transition duration-300"></div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FaLock className="h-5 w-5 text-slate-400 group-focus-within/input:text-blue-400 transition-colors duration-200" />
                    </div>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={handleConfirmPasswordChange}
                      placeholder="Confirm Password"
                      className="w-full h-14 pl-12 pr-14 bg-slate-800/50 border-2 border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-slate-800/70 transition-all duration-200 hover:border-slate-500"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-blue-400 transition-colors duration-200 focus:outline-none"
                    >
                      {showConfirmPassword ? (
                        <FaEyeSlash className="h-5 w-5" />
                      ) : (
                        <FaEye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group/btn relative w-full h-14 overflow-hidden rounded-xl font-bold text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] mt-6"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 transition-all duration-300 group-hover/btn:from-blue-500 group-hover/btn:via-purple-500 group-hover/btn:to-blue-600"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700"></div>

                  <span className="relative flex items-center justify-center gap-2 text-base uppercase tracking-wider">
                    {isLoading ? (
                      <>
                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Creating Account...</span>
                      </>
                    ) : (
                      <>
                        <span>Create Account</span>
                        <FaArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-200" />
                      </>
                    )}
                  </span>
                </button>
              </form>

              {/* Divider */}
              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-700"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="px-4 bg-slate-900 text-slate-400 text-sm">
                    Already have an account?
                  </span>
                </div>
              </div>

              {/* Login Link */}
              <button
                onClick={() => navigate("/login")}
                className="group/reg w-full h-14 border-2 border-slate-600 rounded-xl text-slate-300 bg-transparent hover:bg-slate-800/50 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 transition-all duration-300 font-semibold text-base uppercase tracking-wider hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden"
              >
                <span className="relative z-10">Sign In Instead</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/10 to-purple-600/0 translate-x-[-100%] group-hover/reg:translate-x-[100%] transition-transform duration-700"></div>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-slate-400 mt-8 animate-fade-in-delay-2">
          © 2025 RentX. All rights reserved.
        </p>
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

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
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

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }

        @keyframes bounce-in {
          0% { transform: scale(0.8); opacity: 0; }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); opacity: 1; }
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
        .animate-shimmer { animation: shimmer 3s infinite; }
        .animate-slide-down { animation: slide-down 0.6s ease-out; }
        .animate-slide-up { animation: slide-up 0.6s ease-out 0.2s both; }
        .animate-fade-in { animation: fade-in 0.6s ease-out; }
        .animate-fade-in-delay { animation: fade-in 0.6s ease-out 0.3s both; }
        .animate-fade-in-delay-2 { animation: fade-in 0.6s ease-out 0.5s both; }
        .animate-shake { animation: shake 0.4s ease-in-out; }
        .animate-bounce-in { animation: bounce-in 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55); }
        .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
        .animate-pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </div>
  );
}

export default RegisterPage;
