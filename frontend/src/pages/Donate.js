import React, { useState } from 'react';

const Donate = () => {
  const [formData, setFormData] = useState({
    name: '',
    foodItem: '',
    quantity: '',
    location: '',
    phoneNumber: '',
    address: '', // Add address field
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/donate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Include all form data
      });

      const data = await response.json();

      if (response.ok) {
        alert('Donation successful!');
        setFormData({
          name: '',
          foodItem: '',
          quantity: '',
          location: '',
          phoneNumber: '',
          address: '', // Reset the fields
        });
      } else {
        alert(data.message || 'Failed to donate. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while submitting the form.');
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-gradient-to-r from-blue-200 via-green-200 to-yellow-200 shadow-xl rounded-lg p-8 mt-16">
<h1 className="text-4xl font-extrabold text-teal-500 text-center mb-6">Donate Food</h1>


  <p className="text-center text-gray-700 mb-6 text-lg">
    Fill out the form below to help those in need by donating surplus food.
  </p>
  <form onSubmit={handleSubmit} className="space-y-6">
    <div className="flex flex-col">
      <label className="text-lg font-semibold text-gray-800 mb-2">Your Name</label>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        placeholder="Enter your name"
        required
      />
    </div>
    <div className="flex flex-col">
      <label className="text-lg font-semibold text-gray-800 mb-2">Food Item</label>
      <input
        type="text"
        name="foodItem"
        value={formData.foodItem}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        placeholder="Enter the food item"
        required
      />
    </div>
    <div className="flex flex-col">
      <label className="text-lg font-semibold text-gray-800 mb-2">Quantity (in kg)</label>
      <input
        type="number"
        name="quantity"
        value={formData.quantity}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        placeholder="Enter quantity"
        required
      />
    </div>
    <div className="flex flex-col">
      <label className="text-lg font-semibold text-gray-800 mb-2">Location</label>
      <input
        type="text"
        name="location"
        value={formData.location}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        placeholder="Enter your location"
        required
      />
    </div>
    <div className="flex flex-col">
      <label className="text-lg font-semibold text-gray-800 mb-2">Phone Number</label>
      <input
        type="text"
        name="phoneNumber"
        value={formData.phoneNumber}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        placeholder="Enter your phone number"
        required
      />
    </div>
    <div className="flex flex-col">
      <label className="text-lg font-semibold text-gray-800 mb-2">Address</label>
      <input
        type="text"
        name="address"
        value={formData.address}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        placeholder="Enter your address"
        required
      />
    </div>
    <button
      type="submit"
      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200"
    >
      Donate Now
    </button>
  </form>
</div>
  )
};

export default Donate;
