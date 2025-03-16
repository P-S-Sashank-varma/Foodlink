import React, { useState, useEffect, useCallback } from 'react';

const Donate = () => {
  const [formData, setFormData] = useState({
    name: '',
    foodItem: '',
    quantity: '',
    location: '',
    phoneNumber: '',
    address: '',
  });

  const [stats, setStats] = useState({
    totalDonations: 0,
    claimedDonations: 0,
  });

  const [userInfo, setUserInfo] = useState({
    username: '',
    email: '',
    donationsMade: 0,
    claimedDonations: 0, // 🔄 Fixed key name
  });

  const [refresh, setRefresh] = useState(false); // ✅ Force UI update after donation

  const token = localStorage.getItem('token');

  // ✅ Fetch User Info
  const fetchUserInfo = useCallback(async () => {
    if (!token) return;

    try {
      const response = await fetch('http://localhost:5000/api/user/info', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Failed to fetch user info');

      const data = await response.json();
      console.log('Updated User Info:', data);
      setUserInfo(data); // ✅ Correctly setting state
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  }, [token]);

  // ✅ Fetch Stats
  const fetchStats = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:5000/api/stats');
      const data = await response.json();
      if (response.ok) {
        setStats(data);
      } else {
        console.error('Failed to fetch stats');
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  }, []);

  // ✅ Re-fetch user info when donation is made
  useEffect(() => {
    fetchStats();
    fetchUserInfo();
  }, [fetchStats, fetchUserInfo, refresh]); // 🔄 Added `refresh` to force re-fetch

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      alert('You must be logged in to donate.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/donate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
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
          address: '',
        });

        setRefresh(prev => !prev); // ✅ Trigger UI update
      } else {
        alert(data.message || 'Failed to donate. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while submitting the form.');
    }
  };

  const handleClaimDonation = async (donationId) => {
    if (!token) {
      alert('You must be logged in to claim a donation.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/claim', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ donationId }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Donation claimed successfully!');
        setRefresh(prev => !prev); // ✅ Force update
      } else {
        alert(data.message || 'Failed to claim donation. Please try again.');
      }
    } catch (error) {
      console.error('Error claiming donation:', error);
      alert('An error occurred while claiming the donation.');
    }
  };

  return (
    <div className="flex justify-center items-start space-x-8 mt-16">
      {/* Left Sidebar */}
      <div className="w-1/4 bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-bold text-gray-800 mb-3 text-center">User Info</h2>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm font-medium">Username:</span>
            <span className="text-sm font-bold text-indigo-600">{userInfo.username || 'Loading...'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm font-medium">Email:</span>
            <span className="text-sm font-bold text-green-600">{userInfo.email || 'Loading...'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm font-medium">Donations Made:</span>
            <span className="text-sm font-bold text-indigo-600">{userInfo.donationsMade || '0'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm font-medium">Claimed Donations:</span>
            <span className="text-sm font-bold text-green-600">{userInfo.claimedDonations || '0'}</span>
          </div>
        </div>
      </div>

      {/* Donation Form */}
      <div className="w-1/3 bg-gradient-to-r from-blue-200 via-green-200 to-yellow-200 shadow-xl rounded-lg p-6">
        <h1 className="text-3xl font-extrabold text-teal-500 text-center mb-4">Donate Food</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {Object.keys(formData).map((key) => (
            <div className="flex flex-col" key={key}>
              <label className="text-sm font-semibold text-gray-800 mb-1">
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </label>
              <input
                type="text"
                name={key}
                value={formData[key]}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder={`Enter ${key}`}
                required
              />
            </div>
          ))}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
          >
            Donate Now
          </button>
        </form>
      </div>

      {/* Right Sidebar */}
      <div className="w-1/4 bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-bold text-gray-800 mb-3 text-center">Donation Stats</h2>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm font-medium">Total Donations:</span>
            <span className="text-sm font-bold text-indigo-600">{stats.totalDonations}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm font-medium">Claimed Donations:</span>
            <span className="text-sm font-bold text-green-600">{stats.claimedDonations}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donate;
