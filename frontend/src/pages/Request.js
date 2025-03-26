import { useState, useEffect, useCallback } from 'react';

// Using regular HTML and CSS instead of shadcn components
const Request = () => {
  const [donations, setDonations] = useState([]);
  const [filteredDonations, setFilteredDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [locationFilter, setLocationFilter] = useState('');
  const [locations, setLocations] = useState([]);

  const fetchDonations = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:5000/api/donations');
      const data = await response.json();

      console.log('Fetched donations data:', data);

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
        setFilteredDonations(unclaimedDonations);

        // Extract unique locations for filtering
        const uniqueLocations = [...new Set(unclaimedDonations.map(donation => donation.location))];
        setLocations(uniqueLocations);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      setError(error.message);
      console.error('Error fetching donations:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDonations();
  }, [fetchDonations]);

  useEffect(() => {
    if (locationFilter) {
      const filtered = donations.filter(donation => donation.location === locationFilter);
      setFilteredDonations(filtered);
    } else {
      setFilteredDonations(donations);
    }
  }, [locationFilter, donations]);

  const fetchImage = async (query) => {
    if (!query) return 'https://via.placeholder.com/100';

    try {
      const response = await fetch(`https://api.unsplash.com/search/photos?query=${query}&client_id=xxcSFJzFcmOvFXtStyIn_IcCwDhhFEwopIxnaEs4mCI&per_page=1`);
      const data = await response.json();
      console.log('Unsplash API response:', data);
      return data.results[0]?.urls?.small || 'https://via.placeholder.com/100';
    } catch (error) {
      console.error('Error fetching image:', error);
      return 'https://via.placeholder.com/100';
    }
  };

  const showToast = (message, type = 'info') => {
    // Simple toast function using alert for now
    alert(message);
  };

  const claimDonation = async (donationId) => {
    const recipientName = prompt('Enter your name to claim the donation:');

    if (!recipientName) {
      showToast('You must enter a name to claim the donation.', 'error');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        showToast('Unauthorized: No token found. Please login first.', 'error');
        return;
      }

      const response = await fetch('http://localhost:5000/api/claim', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ donationId, recipientName }),
      });

      const data = await response.json();
      console.log('🔍 Claim Response:', data);

      if (response.status === 200) {
        showToast(data.message, 'success');
        fetchDonations();
      } else {
        showToast(`Error: ${data.message}`, 'error');
      }
    } catch (error) {
      console.error('🔥 Error claiming donation:', error);
      showToast('There was an error claiming the donation.', 'error');
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl pt-16">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2 text-blue-600">
          Available Donations
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Browse available food donations in your area and help reduce food waste while supporting those in need.
        </p>
      </div>
      
      {/* Filter Controls */}
      <div className="mb-8 flex justify-between items-center">
        <div className="flex-1"></div>
        <div className="flex items-center gap-2 bg-white rounded-lg p-2 shadow-sm border">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
          </svg>
          <select 
            value={locationFilter} 
            onChange={(e) => setLocationFilter(e.target.value)}
            className="w-[180px] border-none shadow-none focus:outline-none bg-transparent"
          >
            <option value="">All Locations</option>
            {locations.map((location, index) => (
              <option key={index} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="border rounded-lg overflow-hidden shadow">
              <div className="h-[200px] relative bg-gray-200 animate-pulse"></div>
              <div className="p-4">
                <div className="h-4 w-3/4 mb-2 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-1/2 mb-2 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-5/6 mb-2 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-9 w-full mt-4 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="bg-red-100 text-red-700 p-4 rounded-md text-center">
          <p className="font-semibold">Error loading donations</p>
          <p className="text-sm">{error}</p>
          <button 
            className="mt-4 px-4 py-2 border border-red-700 text-red-700 rounded-md hover:bg-red-50"
            onClick={fetchDonations}
          >
            Try Again
          </button>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && filteredDonations.length === 0 && (
        <div className="text-center py-12 px-4">
          <div className="rounded-full bg-blue-100 p-3 w-12 h-12 mx-auto mb-4 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
              <path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14"></path>
              <path d="M16.5 9.4 7.55 4.24"></path>
              <polyline points="3.29 7 12 12 20.71 7"></polyline>
              <line x1="12" y1="22" x2="12" y2="12"></line>
              <circle cx="18.5" cy="15.5" r="2.5"></circle>
              <path d="M20.27 17.27 22 19"></path>
            </svg>
          </div>
          <h3 className="text-xl font-semibold">No Donations Available</h3>
          <p className="text-gray-600 mt-2 max-w-md mx-auto">
            There are currently no donations available in this location. Please check back later or try a different location.
          </p>
        </div>
      )}

      {/* Donation List */}
      {!loading && !error && filteredDonations.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredDonations.map((donation, index) => (
            <div key={index} className="border rounded-lg overflow-hidden shadow-md bg-white transition-transform hover:shadow-lg hover:scale-105 flex flex-col h-full">
              <div className="relative h-48 overflow-hidden">
                <div style={{aspectRatio: "16/9"}}>
                  <img
                    src={donation.imageUrl}
                    alt={donation.foodItem || 'Food Item'}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-medium flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14"></path>
                    <path d="M16.5 9.4 7.55 4.24"></path>
                    <polyline points="3.29 7 12 12 20.71 7"></polyline>
                    <line x1="12" y1="22" x2="12" y2="12"></line>
                  </svg>
                  <span>{donation.quantity} items</span>
                </div>
              </div>
              
              <div className="p-4 pb-2">
                <h3 className="text-lg font-semibold line-clamp-1">{donation.foodItem}</h3>
              </div>
              
              <div className="p-4 pt-0 flex-grow">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    <span className="text-gray-600">Donor: {donation.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <span className="text-gray-600 line-clamp-1">
                      {donation.location} - {donation.address}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                      <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
                      <line x1="16" x2="16" y1="2" y2="6"></line>
                      <line x1="8" x2="8" y1="2" y2="6"></line>
                      <line x1="3" x2="21" y1="10" y2="10"></line>
                    </svg>
                    <span className="text-gray-500 text-xs">
                      {new Date(donation.createdAt).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="p-4 pt-2">
                <button 
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-4 py-2 rounded-md transition-colors"
                  onClick={() => claimDonation(donation._id)}
                >
                  Claim Donation
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Request;
