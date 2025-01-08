import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const Request = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Use useCallback to memoize fetchDonations function
  const fetchDonations = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:5000/api/donations');
      const data = await response.json();

      console.log('Fetched donations data:', data);  // Log the response

      if (Array.isArray(data)) {
        const donationsWithImages = await Promise.all(
          data.map(async (donation) => {
            const imageUrl = await fetchImage(donation.foodItem);
            return { ...donation, imageUrl };
          })
        );
        // Filter out claimed donations
        const unclaimedDonations = donationsWithImages.filter(donation => !donation.claimed);
        setDonations(unclaimedDonations);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      setError(error.message);
      console.error('Error fetching donations:', error);
    } finally {
      setLoading(false);
    }
  }, []); // Empty dependency array ensures it's created only once

  // Call fetchDonations when the component mounts
  useEffect(() => {
    fetchDonations();
  }, [fetchDonations]); // Include fetchDonations in the dependency array

  const fetchImage = async (query) => {
    if (!query) return 'https://via.placeholder.com/100';

    try {
      const response = await axios.get('https://api.unsplash.com/search/photos', {
        params: {
          query: query,
          client_id: 'xxcSFJzFcmOvFXtStyIn_IcCwDhhFEwopIxnaEs4mCI', // Use environment variable for the API key
          per_page: 1, // Fetch one image
        },
      });
      console.log('Unsplash API response:', response.data);
      return response.data.results[0]?.urls?.small || 'https://via.placeholder.com/100';
    } catch (error) {
      console.error('Error fetching image:', error.response?.data || error.message);
      return 'https://via.placeholder.com/100';
    }
  };

  // Handle donation claim
  const claimDonation = async (donationId) => {
    const recipientName = prompt('Enter your name to claim the donation:');

    if (!recipientName) {
      alert('You must enter a name to claim the donation.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/claim', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ donationId, recipientName }),
      });
      const data = await response.json();

      if (response.status === 200) {
        alert(data.message);
        // Refetch donations after claiming
        fetchDonations();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error claiming donation:', error);
      alert('There was an error claiming the donation.');
    }
  };

  if (loading) {
    return <div className="text-center text-xl font-semibold">Loading donations...</div>;
  }

  if (error) {
    return <div className="text-center text-xl text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Available Donations</h1>
      <div className="text-center text-2xl font-semibold mb-6 text-red-500">
        {donations.length === 0
          ? 'No donations available at the moment.'
          : 'Select a donation to claim!'}
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {donations.length > 0 ? (
          donations.map((donation, index) => (
            <li
              key={index}
              className="border p-4 rounded-lg shadow-md bg-white transition-transform transform hover:scale-105"
            >
              <div className="flex flex-col items-center">
                <img
                  src={donation.imageUrl}
                  alt={donation.foodItem || 'Food Item'}
                  className="w-20 h-20 object-cover rounded-lg mb-4"
                />
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-2">
                    {donation.foodItem} - {donation.quantity} items
                  </h3>
                  <p className="text-gray-700 mb-4">Donor: {donation.name}</p>
                  <p className="text-gray-600 mb-2">Location: {donation.location}</p>
                  <p className="text-gray-600 mb-4">Address: {donation.address}</p> {/* Added Address */}
                  <button
                    className="bg-green-500 text-white p-2 rounded-full mt-2 hover:bg-green-600 transition duration-300"
                    onClick={() => claimDonation(donation._id)}
                  >
                    Claim Donation
                  </button>
                </div>
              </div>
            </li>
          ))
        ) : (
          <p className="text-center text-gray-500">No available donations</p>
        )}
      </ul>
    </div>
  );
};

export default Request;
