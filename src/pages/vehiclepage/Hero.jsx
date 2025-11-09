import React from 'react';
import { FaCar, FaArrowDown } from 'react-icons/fa';

const ProductHero1 = () => {
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

            <div className="w-full px-6 py-16 relative z-10">
                <div className="max-w-7xl mx-auto text-center">
                    {/* Hero Header */}
                    <div className="mb-12 animate-slide-down">
                        <div className="flex justify-center mb-6">
                            <div className="relative group">
                                {/* Glowing background */}
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-3xl opacity-75 group-hover:opacity-100 transition-opacity duration-500 animate-pulse-slow"></div>

                                {/* Icon */}
                                <div className="relative">
                                    <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                                        <FaCar className="text-5xl text-white" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 animate-fade-in">
                            Explore Our Vehicle Collection
                        </h1>
                        <p className="text-xl text-blue-200/90 mb-12 max-w-3xl mx-auto animate-fade-in-delay font-light leading-relaxed">
                            Discover high-quality vehicles ready for your next journey. Browse through our curated selection
                            and find the perfect ride that matches your style and needs.
                        </p>

                        {/* Scroll Indicator */}
                        <div className="flex justify-center animate-fade-in-delay-2">
                            <div className="flex flex-col items-center gap-2">
                                <p className="text-sm text-blue-300/80 uppercase tracking-wider">Scroll to explore</p>
                                <FaArrowDown className="text-blue-400 animate-bounce" />
                            </div>
                        </div>
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

                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                @keyframes pulse-slow {
                    0%, 100% { opacity: 0.75; }
                    50% { opacity: 1; }
                }

                .animate-blob { animation: blob 7s infinite; }
                .animate-float { animation: float linear infinite; }
                .animate-slide-down { animation: slide-down 0.6s ease-out; }
                .animate-fade-in { animation: fade-in 0.6s ease-out 0.2s both; }
                .animate-fade-in-delay { animation: fade-in 0.6s ease-out 0.4s both; }
                .animate-fade-in-delay-2 { animation: fade-in 0.6s ease-out 0.6s both; }
                .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
                .animation-delay-2000 { animation-delay: 2s; }
                .animation-delay-4000 { animation-delay: 4s; }
            `}</style>
        </div>
    );
};

export default ProductHero1;