import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, Youtube, Mail } from 'lucide-react';

function Footer({ className }) {
    return (
        <footer className={`${className} bg-gray-900 py-16 border-t border-gray-800 text-gray-300`}>
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    <div>
                        <h4 className="text-lg font-semibold text-indigo-500 mb-5">About</h4>
                        <p className="text-sm leading-relaxed">
                            Discover the ease of renting with our platform. We connect you with a wide range of quality products for all your needs.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold text-indigo-500 mb-5">Explore</h4>
                        <ul className="text-sm">
                            <li className="mb-3"><Link to="/" className="hover:text-indigo-400 transition-colors duration-200">Home</Link></li>
                            <li className="mb-3"><Link to="/products" className="hover:text-indigo-400 transition-colors duration-200">Products</Link></li>
                            <li className="mb-3"><Link to="/about" className="hover:text-indigo-400 transition-colors duration-200">About Us</Link></li>
                            <li><Link to="/contact" className="hover:text-indigo-400 transition-colors duration-200">Contact Us</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold text-indigo-500 mb-5">Contact</h4>
                        <address className="text-sm not-italic leading-relaxed">
                            <p className="mb-3">Find us at 456 Oak Avenue, Tech City</p>
                            <p className="mb-3">Email: <a href="mailto:support@rentalsystem.com" className="hover:text-indigo-400 transition-colors duration-200 flex items-center"><Mail className="w-4 h-4 mr-2" /> support@rentalsystem.com</a></p>
                            <p className="flex items-center">Phone: <span className="ml-2">+1 (555) 123-4567</span></p>
                        </address>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold text-indigo-500 mb-5">Connect</h4>
                        <p className="text-sm mb-4">Stay updated on our social platforms:</p>
                        <div className="flex items-center gap-4">
                            <Link to="#" className="hover:text-indigo-400 transition-colors duration-200">
                                <Instagram className="w-7 h-7" />
                            </Link>
                            <Link to="#" className="hover:text-indigo-400 transition-colors duration-200">
                                <Twitter className="w-7 h-7" />
                            </Link>
                            <Link to="#" className="hover:text-indigo-400 transition-colors duration-200">
                                <Facebook className="w-7 h-7" />
                            </Link>
                            <Link to="#" className="hover:text-indigo-400 transition-colors duration-200">
                                <Youtube className="w-7 h-7" />
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="mt-12 py-4 border-t border-gray-800 text-center text-sm text-gray-400">
                    <p>&copy; {new Date().getFullYear()} <strong className="font-semibold text-indigo-500">Rental System</strong>. Crafted with ❤️</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;