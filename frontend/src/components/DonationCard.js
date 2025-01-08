import React from "react";

const DonationCard = ({ donation, onClaim, onDelete }) => {
  return (
    <div className="border p-4 mb-4 rounded-md">
      <h3 className="text-xl font-semibold">{donation.foodItem}</h3>
      <p><strong>Quantity:</strong> {donation.quantity}</p>
      <p><strong>Location:</strong> {donation.location}</p>
      <p><strong>Address:</strong> {donation.address}</p>
      <p><strong>Phone:</strong> {donation.phoneNumber}</p>
      <p><strong>Created At:</strong> {new Date(donation.createdAt).toLocaleString()}</p>
      <div className="mt-4">
        {onDelete && (
          <button
            className="bg-red-500 text-white p-2 rounded-md"
            onClick={() => onDelete(donation._id)}
          >
            Delete
          </button>
        )}
        {onClaim && (
          <button
            className="bg-green-500 text-white p-2 ml-2 rounded-md"
            onClick={() => onClaim(donation._id)}
          >
            Claim Donation
          </button>
        )}
      </div>
    </div>
  );
};

export default DonationCard;
