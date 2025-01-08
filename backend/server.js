const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');  
const app = express();

dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
console.log('JWT_SECRET:', process.env.JWT_SECRET); 

// Middleware
app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000' }));

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};
connectDB();

const Donation = mongoose.model('Donation', new mongoose.Schema({
  name: { type: String, required: true },
  foodItem: { type: String, required: true },
  quantity: { type: Number, required: true },
  location: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  address: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  claimed: { type: Boolean, default: false },
  claimedBy: { type: String, default: null },
}));

const User = mongoose.model('User', new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}));

app.get('/', (req, res) => {
  res.send('FoodLink Backend is running!');
});


app.post('/api/signup', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Login route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ message: 'Invalid password' });

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET, 

      { expiresIn: '1h' } 
    );


    res.status(200).json({
      message: 'Login successful',
      token,
      username: user.username
    });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/api/donate', async (req, res) => {
  const { name, foodItem, quantity, location, phoneNumber, address } = req.body;

  if (!name || !foodItem || !quantity || !location || !phoneNumber || !address) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const parsedQuantity = parseInt(quantity, 10);
  if (isNaN(parsedQuantity)) {
    return res.status(400).json({ message: 'Invalid data type for quantity.' });
  }

  const newDonation = new Donation({
    name,
    foodItem,
    quantity: parsedQuantity,
    location,
    phoneNumber,
    address,
  });

  try {
    const savedDonation = await newDonation.save();
    res.status(201).json({ message: 'Donation saved successfully!', donation: savedDonation });
  } catch (error) {
    console.error('Error Saving Donation:', error);
    res.status(500).json({ message: 'Failed to save donation', error: error.message });
  }
});

app.get('/api/donations', async (req, res) => {
  try {
    const donations = await Donation.find();
    res.status(200).json(donations);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Claim donation route
app.post('/api/claim', async (req, res) => {
  const { donationId, recipientName } = req.body;

  if (!donationId || !recipientName) {
    return res.status(400).json({ message: 'Donation ID and recipient name are required.' });
  }

  try {
    const donation = await Donation.findById(donationId);

    if (!donation) {
      return res.status(404).json({ message: 'Donation not found.' });
    }

    if (donation.claimed) {
      return res.status(400).json({ message: 'Donation already claimed.' });
    }

    donation.claimed = true;
    donation.claimedBy = recipientName;
    await donation.save();

    res.status(200).json({ message: 'Donation successfully claimed!' });
  } catch (error) {
    console.error('Error claiming donation:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});


// Fetch donations by donor (donor's history)
app.get('/api/donations/by-donor/:donorName', async (req, res) => {
  const { donorName } = req.params;

  try {
    const donations = await Donation.find({ name: donorName });
    if (!donations.length) {
      return res.status(404).json({ message: 'No donations found for this donor.' });
    }
    res.status(200).json(donations);
  } catch (error) {
    console.error('Error fetching donor donations:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Update a donation (for CRUD operations)
app.put('/api/donations/:donationId', async (req, res) => {
  const { donationId } = req.params;
  const updateData = req.body;

  try {
    const donation = await Donation.findById(donationId);
    if (!donation) {
      return res.status(404).json({ message: 'Donation not found.' });
    }

    if (donation.claimed) {
      return res.status(400).json({ message: 'Cannot update a claimed donation.' });
    }

    Object.keys(updateData).forEach((key) => {
      if (key in donation) {
        donation[key] = updateData[key];
      }
    });

    const updatedDonation = await donation.save();
    res.status(200).json({ message: 'Donation updated successfully!', donation: updatedDonation });
  } catch (error) {
    console.error('Error updating donation:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Delete a donation
app.delete('/api/donations/:donationId', async (req, res) => {
  const { donationId } = req.params;

  try {
    const donation = await Donation.findById(donationId);
    if (!donation) {
      return res.status(404).json({ message: 'Donation not found.' });
    }

    if (donation.claimed) {
      return res.status(400).json({ message: 'Cannot delete a claimed donation.' });
    }

    await donation.remove();
    res.status(200).json({ message: 'Donation deleted successfully!' });
  } catch (error) {
    console.error('Error deleting donation:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Fetch filtered donations (recipient dashboard filtering)
app.get('/api/donations/filter', async (req, res) => {
  const { location, foodItem } = req.query;

  const filter = {};
  if (location) filter.location = location;
  if (foodItem) filter.foodItem = foodItem;

  try {
    const donations = await Donation.find({ ...filter, claimed: false });
    res.status(200).json(donations);
  } catch (error) {
    console.error('Error filtering donations:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Matching system: Get nearby unclaimed donations
app.get('/api/matching-donations', async (req, res) => {
  const { location } = req.query;

  try {
    const donations = await Donation.find({ location, claimed: false });
    if (!donations.length) {
      return res.status(404).json({ message: 'No matching donations found in this location.' });
    }
    res.status(200).json(donations);
  } catch (error) {
    console.error('Error fetching matching donations:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
