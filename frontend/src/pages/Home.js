import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-cover bg-center font-heading"
         style={{ backgroundImage: "url('/images/foodimage.png')" }}>
      
      {/* Overlay to make the text stand out */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content */}
      <div className="relative text-center z-10 text-white pt-32 px-6">
        <h1 className="text-5xl font-extrabold text-yellow-300 mb-8 drop-shadow-lg">
          Welcome to FoodLink
        </h1>
        <p className="text-lg md:text-2xl mb-8 max-w-3xl mx-auto text-yellow-200 drop-shadow-md">
          Join us in reducing food wastage by donating or requesting food! Together, we can make a difference in the fight against hunger.
        </p>
        <div className="flex space-x-6 justify-center">
          <Link to="/login" className="bg-yellow-500 text-white py-3 px-6 rounded-full hover:bg-yellow-400 transition duration-300">
            Login
          </Link>
          <Link to="/signup" className="bg-blue-600 text-white py-3 px-6 rounded-full hover:bg-blue-500 transition duration-300">
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
