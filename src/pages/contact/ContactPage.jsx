import React from 'react';

export default function MyContact() {
  return (
    <section
      className="py-16 px-6 sm:px-12 bg-gray-100 text-gray-800"
      id="MyContact"
      data-aos="fade-up"
    >
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8 space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-indigo-600 mb-2">Help Center</h2>
          <p className="text-gray-500">Feel free to reach out to us!</p>
        </div>

        <form
          className="space-y-6"
          action="https://formspree.io/f/xgvapobj"
          method="POST"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <textarea
            name="message"
            rows="5"
            placeholder="Your Message"
            required
            className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-md transition duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
