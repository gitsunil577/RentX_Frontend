import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import heroImage from '../../assets/Rentalimage.jpg';

function Hero() {
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const buttonsRef = useRef(null);

  useEffect(() => {
    const imageElement = imageRef.current;
    const textElement = textRef.current;
    const buttonsElement = buttonsRef.current;

    // Continuous Pulse Animation for Image (using Tailwind classes and inline style for transform)
    if (imageElement) {
      imageElement.classList.add('opacity-0', 'scale-95', 'shadow-md'); // Initial state with Tailwind
      const animateImage = () => {
        imageElement.style.transition = 'transform 1500ms ease-in-out'; // Inline style for transition timing
        imageElement.style.transform = 'scale(1.02)'; // Slight pulse scale up

        setTimeout(() => {
          imageElement.style.transition = 'transform 1500ms ease-in-out'; // Inline style for transition timing
          imageElement.style.transform = 'scale(0.98)'; // Slight pulse scale down
          setTimeout(() => {
            imageElement.style.transition = 'transform 1500ms ease-in-out'; // Inline style for transition timing
            imageElement.style.transform = 'scale(1)'; // Return to normal scale
          }, 1500);
        }, 1500);
      };

      setTimeout(() => { // Start initial animation after slight delay
        imageElement.classList.remove('opacity-0', 'scale-95'); // Fade in and scale up from initial
        imageElement.classList.add(
          'transition-opacity',
          'duration-1000',
          'ease-out',
          'transition-transform',
          'duration-1000',
          'ease-out',
          'transition-shadow',
          'shadow-2xl',       // Animate to a larger shadow
          'scale-100',
        );
        animateImage(); // Start pulsing immediately after initial animation
        const intervalId = setInterval(animateImage, 4500); // Adjusted interval for pulse cycle (3 * 1500ms animation durations)

        return () => clearInterval(intervalId);
      }, 100);
    }


    // Stylish Animation for Text Content (Slide In from Bottom with Tailwind classes and inline for cubic-bezier)
    if (textElement) {
      textElement.classList.add('opacity-0', 'translate-y-8'); // Tailwind for initial state
      setTimeout(() => {
        textElement.style.transition = 'opacity 800ms cubic-bezier(0.4, 0.0, 0.2, 1), transform 800ms cubic-bezier(0.4, 0.0, 0.2, 1) 200ms'; // Inline for standard ease-in-out cubic-bezier
        textElement.classList.remove('opacity-0', 'translate-y-8'); // Tailwind to animate to final state
      }, 400); // Slightly later start for text
    }

    // Stylish Animation for Buttons (Fade In and 3D Rotate with Tailwind classes - Subtler & ease-in-out-sine)
    if (buttonsElement) {
      buttonsElement.classList.add('opacity-0', 'scale-[0.98]', 'rotate-x-[-20deg]'); // Tailwind initial state (subtler)
      setTimeout(() => {
        buttonsElement.classList.add(
          'transition-opacity',
          'duration-500', // Faster duration (subtler)
          'ease-in-out-sine', // Refined easing
          'transition-transform',
          'duration-500', // Faster duration (subtler)
          'ease-in-out-sine', // Refined easing
          'delay-500', // Further delay for buttons (slight overlap with text ending)
          'scale-100',
          'rotate-x-0'
        );
        buttonsElement.classList.remove('opacity-0', 'scale-[0.98]', 'rotate-x-[-20deg]');
      }, 600); // Even later start for buttons
    }

  }, []);

  return (
    <section className="bg-gradient-to-br from-gray-100 to-gray-200 py-24 relative overflow-hidden">
      {/* Decorative Wave Background - SVG Path */}
      <div className="absolute inset-0 -z-10 transform translate-y-24">
        <svg viewBox="0 0 1920 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-50 opacity-75">
          <path d="M0 500H1920V0C1920 0 1612.6 499.5 960 500C307.4 500.5 0 0 0 0V500Z" fill="currentColor"/>
        </svg>
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="md:order-2" ref={imageRef}>
            <div className="relative rounded-xl shadow-2xl overflow-hidden">
              <img
                src={heroImage}
                alt="Variety of Rental Items"
                className="object-cover w-full h-full"
                style={{ minHeight: '400px' }}
              />
              <div className="absolute inset-0 bg-black opacity-10"></div>
            </div>
          </div>
          <div className="md:order-1" ref={textRef}>
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-8">
              Unlock Your City's Resources with Easy Rentals
            </h1>
            <p className="text-gray-700 text-xl mb-10 leading-relaxed">
              Your all-in-one platform to rent tools, equipment, and unique items from your neighbors and local businesses.  Find what you need, save money, and support your community.
            </p>
            <div className="space-x-6" ref={buttonsRef}>
              <Link to="/products" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg shadow-md transition-all duration-300 hover:scale-105">
                Explore Rentals
              </Link>
              <Link to="/product/register" className="inline-block bg-white hover:bg-gray-100 text-gray-800 font-semibold py-4 px-8 rounded-lg shadow-md transition-all duration-300 hover:scale-105">
                List Your Item
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;