import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000'; // Adjust based on your backend URL

export const fetchDonations = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/donations`);
        return response.data;
    } catch (error) {
        console.error('Error fetching donations:', error);
        throw error;
    }
};

export const submitDonation = async (donationData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/donate`, donationData);
        return response.data;
    } catch (error) {
        console.error('Error submitting donation:', error);
        throw error;
    }
};

export const claimDonation = async (donationId, recipientName) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/claim`, {
            donationId,
            recipientName,
        });
        return response.data;
    } catch (error) {
        console.error('Error claiming donation:', error);
        throw error;
    }
};
