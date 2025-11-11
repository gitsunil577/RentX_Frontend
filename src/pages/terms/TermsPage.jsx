import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Shield, AlertCircle, CheckCircle } from 'lucide-react';

function TermsPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e510_1px,transparent_1px),linear-gradient(to_bottom,#4f46e510_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>

                <div className="relative container mx-auto px-4 py-16 md:py-24">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-500/20 rounded-full mb-6 border border-blue-500/30">
                            <FileText className="w-10 h-10 text-blue-400" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Terms & Conditions
                        </h1>
                        <p className="text-lg text-slate-300 mb-2">
                            Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                        <p className="text-slate-400">
                            Please read these terms carefully before using our service
                        </p>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="relative container mx-auto px-4 pb-20">
                <div className="max-w-4xl mx-auto">
                    {/* Quick Links Navigation */}
                    <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6 mb-8">
                        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                            <AlertCircle className="w-5 h-5 text-blue-400" />
                            Quick Navigation
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                            <a href="#acceptance" className="text-blue-400 hover:text-blue-300 transition-colors">→ Acceptance of Terms</a>
                            <a href="#services" className="text-blue-400 hover:text-blue-300 transition-colors">→ Services Description</a>
                            <a href="#user-accounts" className="text-blue-400 hover:text-blue-300 transition-colors">→ User Accounts</a>
                            <a href="#rental" className="text-blue-400 hover:text-blue-300 transition-colors">→ Rental Terms</a>
                            <a href="#payments" className="text-blue-400 hover:text-blue-300 transition-colors">→ Payments & Fees</a>
                            <a href="#responsibilities" className="text-blue-400 hover:text-blue-300 transition-colors">→ User Responsibilities</a>
                            <a href="#liability" className="text-blue-400 hover:text-blue-300 transition-colors">→ Liability</a>
                            <a href="#termination" className="text-blue-400 hover:text-blue-300 transition-colors">→ Termination</a>
                        </div>
                    </div>

                    {/* Terms Content */}
                    <div className="space-y-8">
                        {/* Section 1 */}
                        <section id="acceptance" className="bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-8">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <span className="text-blue-400 font-bold">1</span>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-white mb-3">Acceptance of Terms</h2>
                                    <p className="text-slate-300 leading-relaxed mb-3">
                                        By accessing and using the RentX platform, you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.
                                    </p>
                                    <p className="text-slate-300 leading-relaxed">
                                        These terms apply to all users of the platform, including but not limited to browsers, vendors, customers, merchants, and content contributors.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Section 2 */}
                        <section id="services" className="bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-8">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <span className="text-blue-400 font-bold">2</span>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-white mb-3">Services Description</h2>
                                    <p className="text-slate-300 leading-relaxed mb-4">
                                        RentX provides an online platform connecting vehicle owners with individuals seeking to rent vehicles. Our services include:
                                    </p>
                                    <ul className="space-y-2 text-slate-300">
                                        <li className="flex items-start gap-3">
                                            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                            <span>Vehicle listing and browsing functionality</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                            <span>Booking and reservation management</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                            <span>Secure payment processing</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                            <span>User account management</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                            <span>Customer support services</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* Section 3 */}
                        <section id="user-accounts" className="bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-8">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <span className="text-blue-400 font-bold">3</span>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-white mb-3">User Accounts</h2>
                                    <p className="text-slate-300 leading-relaxed mb-3">
                                        To use certain features of our platform, you must create an account. You agree to:
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 text-slate-300 ml-4">
                                        <li>Provide accurate, current, and complete information</li>
                                        <li>Maintain and update your account information</li>
                                        <li>Keep your password secure and confidential</li>
                                        <li>Accept responsibility for all activities under your account</li>
                                        <li>Notify us immediately of any unauthorized access</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* Section 4 */}
                        <section id="rental" className="bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-8">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <span className="text-blue-400 font-bold">4</span>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-white mb-3">Rental Terms</h2>
                                    <div className="space-y-4 text-slate-300">
                                        <div>
                                            <h3 className="font-semibold text-white mb-2">4.1 Booking Process</h3>
                                            <p className="leading-relaxed">
                                                All vehicle rentals are subject to availability. A confirmed booking requires full payment and acceptance of the rental agreement.
                                            </p>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-white mb-2">4.2 Rental Period</h3>
                                            <p className="leading-relaxed">
                                                The rental period begins and ends at the times specified in your booking confirmation. Late returns may incur additional charges.
                                            </p>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-white mb-2">4.3 Vehicle Condition</h3>
                                            <p className="leading-relaxed">
                                                Renters must inspect the vehicle before use and report any pre-existing damage. You are responsible for the vehicle during the rental period.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Section 5 */}
                        <section id="payments" className="bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-8">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <span className="text-blue-400 font-bold">5</span>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-white mb-3">Payments & Fees</h2>
                                    <p className="text-slate-300 leading-relaxed mb-3">
                                        All rental prices are displayed in INR (Indian Rupees) and include applicable taxes unless otherwise stated. Payment terms include:
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 text-slate-300 ml-4">
                                        <li>Payment is required at the time of booking</li>
                                        <li>We accept major credit cards, debit cards, and digital payment methods</li>
                                        <li>Additional charges may apply for insurance, driver services, or late returns</li>
                                        <li>Refunds are subject to our cancellation policy</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* Section 6 */}
                        <section id="responsibilities" className="bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-8">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <span className="text-blue-400 font-bold">6</span>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-white mb-3">User Responsibilities</h2>
                                    <p className="text-slate-300 leading-relaxed mb-3">
                                        As a user of our platform, you agree to:
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 text-slate-300 ml-4">
                                        <li>Use vehicles only for lawful purposes</li>
                                        <li>Comply with all traffic laws and regulations</li>
                                        <li>Not sublease or transfer rental vehicles to third parties</li>
                                        <li>Maintain the vehicle in good condition during the rental period</li>
                                        <li>Report any accidents or damage immediately</li>
                                        <li>Return the vehicle in the same condition as received</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* Section 7 */}
                        <section id="liability" className="bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-8">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Shield className="w-6 h-6 text-blue-400" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-white mb-3">Limitation of Liability</h2>
                                    <p className="text-slate-300 leading-relaxed mb-3">
                                        E-Rental System acts as an intermediary platform connecting vehicle owners and renters. We are not liable for:
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 text-slate-300 ml-4">
                                        <li>Vehicle condition, maintenance, or mechanical issues</li>
                                        <li>Accidents, injuries, or damages during the rental period</li>
                                        <li>Disputes between vehicle owners and renters</li>
                                        <li>Loss or theft of personal belongings</li>
                                        <li>Indirect or consequential damages arising from platform use</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* Section 8 */}
                        <section id="termination" className="bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-8">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <span className="text-blue-400 font-bold">8</span>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-white mb-3">Termination</h2>
                                    <p className="text-slate-300 leading-relaxed mb-3">
                                        We reserve the right to suspend or terminate your account at any time if you:
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 text-slate-300 ml-4">
                                        <li>Violate these Terms and Conditions</li>
                                        <li>Provide false or misleading information</li>
                                        <li>Engage in fraudulent activities</li>
                                        <li>Cause damage to vehicles or other users</li>
                                        <li>Fail to make required payments</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* Contact Section */}
                        <section className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 backdrop-blur-xl rounded-2xl border border-blue-500/30 p-8">
                            <div className="text-center">
                                <h2 className="text-2xl font-bold text-white mb-3">Questions About Our Terms?</h2>
                                <p className="text-slate-300 mb-6">
                                    If you have any questions or concerns about these Terms and Conditions, please contact us.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Link
                                        to="/contact"
                                        className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold rounded-lg transition-all duration-300"
                                    >
                                        Contact Support
                                    </Link>
                                    <Link
                                        to="/"
                                        className="inline-flex items-center justify-center px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition-all duration-300"
                                    >
                                        Back to Home
                                    </Link>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TermsPage;
