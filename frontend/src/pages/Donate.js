import React, { useState, useEffect, useCallback } from 'react';
import { 
  Apple, 
  Utensils, 
  MapPin, 
  Phone, 
  Home, 
  Gift, 
  ShoppingBag, 
  ArrowRight, 
  User, 
  Mail 
} from 'lucide-react';

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
    claimedDonations: 0,
  });

  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('token');

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
      setUserInfo(data);
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  }, [token]);

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

  useEffect(() => {
    fetchStats();
    fetchUserInfo();
  }, [fetchStats, fetchUserInfo, refresh]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      alert('You must be logged in to donate.');
      return;
    }

    setLoading(true);

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

        setRefresh(prev => !prev);
      } else {
        alert(data.message || 'Failed to donate. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while submitting the form.');
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8 pt-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-4">Food Donation Platform</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Help reduce food waste and support those in need by donating food items in your community.
            </p>
          </div>
      
        <div className="flex flex-col lg:flex-row gap-8">
          {/* User Profile Card */}
          <div className="w-full lg:w-1/4">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full border border-gray-100">
              <div className="h-2 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 flex flex-col items-center pt-8 pb-6">
                <div className="h-20 w-20 bg-indigo-100 rounded-full flex items-center justify-center border-4 border-white shadow-md">
                  {userInfo.username ? (
                    <span className="text-xl font-bold text-indigo-800">
                      {userInfo.username.charAt(0).toUpperCase()}
                    </span>
                  ) : (
                    <User className="h-8 w-8 text-indigo-400" />
                  )}
                </div>
                <h3 className="mt-3 text-xl font-bold">
                  {userInfo.username || 'Loading...'}
                </h3>
                <p className="text-sm text-gray-500">{userInfo.email || 'Loading...'}</p>
                <span className="mt-2 px-3 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full font-medium">
                  Food Hero
                </span>
              </div>

              <div className="p-6">
                <h3 className="font-medium text-gray-700 mb-4">Your Impact</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center p-3 bg-indigo-50 rounded-lg">
                    <div className="p-2 bg-indigo-100 rounded-full">
                      <Gift className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div className="ml-3 flex-1">
                      <p className="text-sm font-medium text-gray-700">Donations Made</p>
                      <p className="text-xl font-bold text-indigo-600">{userInfo.donationsMade || '0'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 bg-purple-50 rounded-lg">
                    <div className="p-2 bg-purple-100 rounded-full">
                      <ShoppingBag className="h-5 w-5 text-purple-600" />
                    </div>
                    <div className="ml-3 flex-1">
                      <p className="text-sm font-medium text-gray-700">Claimed Donations</p>
                      <p className="text-xl font-bold text-purple-600">{userInfo.claimedDonations || '0'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Donation Form */}
          <div className="w-full lg:w-2/4">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100">
              <div className="h-2 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400"></div>
              <div className="bg-gradient-to-r from-green-50 to-blue-50 pb-8 pt-6 px-6">
                <h2 className="text-center text-2xl text-gray-800 font-bold">Donate Food</h2>
              </div>
              <div className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="pl-10 w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      placeholder="Your Name"
                      required
                    />
                  </div>
                  
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Apple className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="foodItem"
                      value={formData.foodItem}
                      onChange={handleChange}
                      className="pl-10 w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      placeholder="Food Item"
                      required
                    />
                  </div>
                  
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Utensils className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                      className="pl-10 w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      placeholder="Quantity"
                      required
                    />
                  </div>
                  
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="pl-10 w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      placeholder="Pickup Location"
                      required
                    />
                  </div>
                  
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className="pl-10 w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      placeholder="Phone Number"
                      required
                    />
                  </div>
                  
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Home className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="pl-10 w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      placeholder="Full Address"
                      required
                    />
                  </div>
                  
                  <button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white py-3 rounded-lg transition duration-300 flex items-center justify-center font-medium"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        Donate Now <ArrowRight className="ml-2 h-5 w-5" />
                      </span>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
          
          {/* Donation Stats Card */}
          <div className="w-full lg:w-1/4">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full border border-gray-100">
              <div className="h-2 bg-gradient-to-r from-green-500 to-teal-500"></div>
              <div className="bg-gradient-to-r from-green-50 to-teal-50 pb-6 pt-6 px-6">
                <h2 className="text-center text-xl text-gray-800 font-bold">Community Impact</h2>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <h3 className="text-sm font-medium text-gray-700">Total Donations</h3>
                      <span className="text-sm font-medium text-gray-700">{stats.totalDonations}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                    <p className="mt-2 text-xs text-gray-500">75% of our monthly goal</p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <h3 className="text-sm font-medium text-gray-700">Claimed Donations</h3>
                      <span className="text-sm font-medium text-gray-700">{stats.claimedDonations}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-teal-500 h-2.5 rounded-full" style={{ width: stats.totalDonations > 0 ? `${stats.claimedDonations / stats.totalDonations * 100}%` : '0%' }}></div>
                    </div>
                    <p className="mt-2 text-xs text-gray-500">
                      {stats.totalDonations > 0 ? Math.round(stats.claimedDonations / stats.totalDonations * 100) : 0}% claimed by recipients
                    </p>
                  </div>
                  
                  <div className="pt-4 mt-4 border-t border-gray-100">
                    <h3 className="text-base font-medium text-gray-800 mb-3">Top Donation Categories</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Non-perishables</span>
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">42%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Fresh Produce</span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">28%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Prepared Meals</span>
                        <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">18%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Beverages</span>
                        <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-full">12%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donate;
