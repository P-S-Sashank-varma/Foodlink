import React, { useState } from 'react';

const DonationForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        foodItem: '',
        quantity: '',
        latitude: '',  
        longitude: '', 
        location: '',  
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); 
        setError(''); 
        setSuccess(''); 

        try {
            if (formData.quantity <= 0) {
                setError('Quantity must be greater than zero.');
                setLoading(false);
                return;
            }

            if (!formData.latitude || !formData.longitude || !formData.location) {
                setError('Location details are required.');
                setLoading(false);
                return;
            }

            const response = await fetch('http://localhost:5000/api/donate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess('Donation submitted successfully!');
                setFormData({ name: '', foodItem: '', quantity: '', latitude: '', longitude: '', location: '' });
            } else {
                setError(data.message || 'Failed to submit donation. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false); 
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500">
            <form onSubmit={handleSubmit} className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Donate Food</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Food Item:</label>
                    <input
                        type="text"
                        name="foodItem"
                        value={formData.foodItem}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Quantity:</label>
                    <input
                        type="number"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                        min="1"
                    />
                </div>
                {/* New fields for location */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Latitude:</label>
                    <input
                        type="number"
                        name="latitude"
                        value={formData.latitude}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Longitude:</label>
                    <input
                        type="number"
                        name="longitude"
                        value={formData.longitude}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Location (Description):</label>
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
                    disabled={loading}
                >
                    {loading ? 'Submitting...' : 'Submit'}
                </button>

                {error && (
                    <div className="mt-4 text-red-500">
                        <p>{error}</p>
                    </div>
                )}

                {success && (
                    <div className="mt-4 text-green-500">
                        <p>{success}</p>
                    </div>
                )}
            </form>
        </div>
    );
};

export default DonationForm;
