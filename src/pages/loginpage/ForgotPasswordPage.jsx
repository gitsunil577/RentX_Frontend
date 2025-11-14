import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaArrowRight, FaArrowLeft } from "react-icons/fa";

export default function ForgotPasswordPage() {
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // Debug log for step changes
  useEffect(() => {
    console.log("Current step:", step);
    console.log("Email:", email);
  }, [step, email]);

  // Step 1: Send OTP to email
  const handleSendOTP = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      console.log("Sending OTP to:", email);
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/user/forgot-password`,
        { email }
      );

      console.log("OTP Response:", response.data);
      setSuccessMessage("OTP sent successfully! Check your email.");

      setTimeout(() => {
        console.log("Moving to step 2");
        setStep(2);
        setSuccessMessage("");
        setError("");
      }, 2000);
    } catch (err) {
      console.error("Send OTP error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      console.log("Verifying OTP:", otp, "for email:", email);
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/user/verify-otp`,
        { email, otp }
      );

      console.log("Verify OTP Response:", response.data);
      setSuccessMessage("OTP verified successfully!");

      setTimeout(() => {
        console.log("Moving to step 3");
        setStep(3);
        setSuccessMessage("");
        setError("");
      }, 1500);
    } catch (err) {
      console.error("Verify OTP error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Invalid OTP");
    } finally {
      setIsLoading(false);
    }
  };

  // Step 3: Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccessMessage("");

    // Validate password match
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    // Validate password length
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long");
      setIsLoading(false);
      return;
    }

    try {
      console.log("Resetting password for email:", email);
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/user/reset-password`,
        { email, otp, newPassword }
      );

      console.log("Reset Password Response:", response.data);
      setSuccessMessage("Password reset successfully! Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      console.error("Reset password error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Failed to reset password");
    } finally {
      setIsLoading(false);
    }
  };

  const renderStepContent = () => {
    console.log("Rendering step:", step);

    switch (step) {
      case 1:
        return (
          <form onSubmit={handleSendOTP} className="space-y-5">
            <div className="relative group/input">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-0 group-hover/input:opacity-30 transition duration-300"></div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaEnvelope className="h-5 w-5 text-slate-400 group-focus-within/input:text-blue-400 transition-colors duration-200" />
                </div>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full h-14 pl-12 pr-4 bg-slate-800/50 border-2 border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-slate-800/70 transition-all duration-200 hover:border-slate-500"
                  required
                  type="email"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="group/btn relative w-full h-14 overflow-hidden rounded-xl font-bold text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 transition-all duration-300 group-hover/btn:from-blue-500 group-hover/btn:via-purple-500 group-hover/btn:to-blue-600"></div>
              <span className="relative flex items-center justify-center gap-2 text-base uppercase tracking-wider">
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Sending OTP...</span>
                  </>
                ) : (
                  <>
                    <span>Send OTP</span>
                    <FaArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-200" />
                  </>
                )}
              </span>
            </button>
          </form>
        );

      case 2:
        return (
          <form onSubmit={handleVerifyOTP} className="space-y-5">
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 mb-4">
              <p className="text-blue-300 text-sm text-center">
                OTP has been sent to <strong>{email}</strong>
              </p>
            </div>

            <div className="relative group/input">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-0 group-hover/input:opacity-30 transition duration-300"></div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-slate-400 group-focus-within/input:text-blue-400 transition-colors duration-200" />
                </div>
                <input
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter 6-digit OTP"
                  className="w-full h-14 pl-12 pr-4 bg-slate-800/50 border-2 border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-slate-800/70 transition-all duration-200 hover:border-slate-500 text-center text-2xl tracking-widest"
                  required
                  type="text"
                  maxLength="6"
                  pattern="[0-9]{6}"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setStep(1);
                  setOtp("");
                  setError("");
                }}
                className="group/back flex-1 h-14 border-2 border-slate-600 rounded-xl text-slate-300 hover:border-blue-500 transition-all duration-300 font-semibold text-base uppercase tracking-wider"
              >
                <span className="flex items-center justify-center gap-2">
                  <FaArrowLeft className="w-4 h-4" />
                  Back
                </span>
              </button>

              <button
                type="submit"
                disabled={isLoading}
                className="group/btn relative flex-[2] h-14 overflow-hidden rounded-xl font-bold text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600"></div>
                <span className="relative flex items-center justify-center gap-2 text-base uppercase tracking-wider">
                  {isLoading ? (
                    <>
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Verifying...</span>
                    </>
                  ) : (
                    <>
                      <span>Verify OTP</span>
                      <FaArrowRight className="w-5 h-5" />
                    </>
                  )}
                </span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => {
                setStep(1);
                setOtp("");
                setError("");
                setSuccessMessage("");
              }}
              className="w-full text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium"
            >
              Didn't receive OTP? Resend
            </button>
          </form>
        );

      case 3:
        return (
          <form onSubmit={handleResetPassword} className="space-y-5">
            <div className="relative group/input">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-0 group-hover/input:opacity-30 transition duration-300"></div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-slate-400 group-focus-within/input:text-blue-400 transition-colors duration-200" />
                </div>
                <input
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="New Password"
                  className="w-full h-14 pl-12 pr-4 bg-slate-800/50 border-2 border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-slate-800/70 transition-all duration-200 hover:border-slate-500"
                  required
                  type="password"
                  minLength="6"
                />
              </div>
            </div>

            <div className="relative group/input">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-0 group-hover/input:opacity-30 transition duration-300"></div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-slate-400 group-focus-within/input:text-blue-400 transition-colors duration-200" />
                </div>
                <input
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm New Password"
                  className="w-full h-14 pl-12 pr-4 bg-slate-800/50 border-2 border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-slate-800/70 transition-all duration-200 hover:border-slate-500"
                  required
                  type="password"
                  minLength="6"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="group/btn relative w-full h-14 overflow-hidden rounded-xl font-bold text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600"></div>
              <span className="relative flex items-center justify-center gap-2 text-base uppercase tracking-wider">
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Resetting...</span>
                  </>
                ) : (
                  <>
                    <span>Reset Password</span>
                    <FaArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-200" />
                  </>
                )}
              </span>
            </button>
          </form>
        );

      default:
        return <div className="text-white">Invalid step</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex items-center justify-center relative overflow-hidden">
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
        {/* Logo Section */}
        <div className="text-center mb-8 animate-slide-down">
          <div className="flex justify-center mb-6">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-500 animate-pulse-slow"></div>
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
            Forgot Password
          </h2>
          <p className="text-lg text-blue-200/80 animate-fade-in-delay font-light">
            {step === 1 && "Enter your email to receive OTP"}
            {step === 2 && "Enter the OTP sent to your email"}
            {step === 3 && "Create your new password"}
          </p>
        </div>

        {/* Card */}
        <div className="relative group animate-slide-up">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-75 transition duration-500"></div>

          <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent translate-x-[-100%] animate-shimmer"></div>

            <div className="px-8 py-10 space-y-6 relative">
              {/* Progress Indicator */}
              <div className="flex justify-center items-center gap-3 mb-6">
                {[1, 2, 3].map((s) => (
                  <div
                    key={s}
                    className={`h-2 flex-1 rounded-full transition-all duration-500 ${
                      s <= step
                        ? "bg-gradient-to-r from-blue-600 to-purple-600"
                        : "bg-slate-700"
                    }`}
                  ></div>
                ))}
              </div>

              {/* Error/Success Messages */}
              {error && (
                <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-4 backdrop-blur-sm animate-shake">
                  <p className="text-red-300 text-center text-sm font-medium flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    {error}
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

              {/* Render current step content */}
              {renderStepContent()}

              {/* Divider */}
              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-700"></div>
                </div>
              </div>

              {/* Back to Login */}
              <button
                onClick={() => navigate("/login")}
                className="group/reg w-full h-14 border-2 border-slate-600 rounded-xl text-slate-300 bg-transparent hover:bg-slate-800/50 hover:border-blue-500 focus:outline-none transition-all duration-300 font-semibold text-base uppercase tracking-wider hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <FaArrowLeft className="w-4 h-4" />
                  Back to Login
                </span>
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
