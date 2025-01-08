import React from 'react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 py-8">
      {/* Header Section */}
      <div className="text-white text-center py-8">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">Contact Us</h1>
        <p className="text-lg text-gray-600">We’re here to help. Reach out to us with any questions!</p>
      </div>

      {/* Contact Form Section */}
      <div className="max-w-lg mx-auto bg-white rounded-lg shadow-xl p-8 mt-8">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">We'd Love to Hear From You!</h2>

        <form className="space-y-6">
          {/* Name Input */}
          <div>
            <label htmlFor="name" className="block text-lg font-medium text-gray-800">Your Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-lg font-medium text-gray-800">Your Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Message Textarea */}
          <div>
            <label htmlFor="message" className="block text-lg font-medium text-gray-800">Your Message</label>
            <textarea
              id="message"
              name="message"
              rows="4"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Write your message here"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-600 text-white text-lg font-semibold py-3 px-8 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>

      {/* Footer Section */}
      <div className="text-center text-gray-600 mt-8">
        <p className="text-sm">&copy; 2024 FoodLink | All Rights Reserved</p>
      </div>
    </div>
  );
};

export default Contact;
