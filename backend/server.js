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

// User Schema
const User = mongoose.model('User', new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  donationsMade: { type: Number, default: 0 },
  claimedDonations: { type: Number, default: 0 }
}));

// Unclaimed Donations Schema
const UnclaimedDonation = mongoose.model('UnclaimedDonation', new mongoose.Schema({
  name: { type: String, required: true },
  foodItem: { type: String, required: true },
  quantity: { type: Number, required: true },
  location: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  address: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  donatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}));



// Claimed Donations Schema
const ClaimedDonation = mongoose.model('ClaimedDonation', new mongoose.Schema({
  name: { type: String, required: true },
  foodItem: { type: String, required: true },
  quantity: { type: Number, required: true },
  location: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  address: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  claimedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  donatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}));

app.get('/', (req, res) => {
  res.send('FoodLink Backend is running!');
});

// User Signup
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

// User Login
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
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Create Donation
// Create Donation
app.post('/api/donate', async (req, res) => {
  try {
    const { name, foodItem, quantity, location, phoneNumber, address } = req.body;
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) return res.status(401).json({ message: 'Unauthorized: No token provided' });
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const newDonation = new UnclaimedDonation({ 
      name, 
      foodItem, 
      quantity, 
      location, 
      phoneNumber, 
      address, 
      donatedBy: userId,
      createdAt: new Date()  // ✅ Adds date and time
    });

    await newDonation.save();

    await User.findByIdAndUpdate(userId, { $inc: { donationsMade: 1 } });

    res.status(201).json({ message: 'Donation saved successfully!', donation: newDonation });
  } catch (error) {
    res.status(500).json({ message: 'Failed to save donation', error: error.message });
  }
});


// Fetch All Unclaimed Donations
app.get('/api/donations', async (req, res) => {
  try {
    const donations = await UnclaimedDonation.find();
    res.status(200).json(donations);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Claim Donation
app.post('/api/claim', async (req, res) => {
  try {
    const { donationId } = req.body;
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized: No token provided' });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const donation = await UnclaimedDonation.findById(donationId);
    if (!donation) return res.status(404).json({ message: 'Donation not found' });

    await UnclaimedDonation.findByIdAndDelete(donationId);
    const claimedDonation = new ClaimedDonation({ ...donation.toObject(), claimedBy: userId });
    await claimedDonation.save();

    await User.findByIdAndUpdate(userId, { $inc: { claimedDonations: 1 } });
    res.status(200).json({ message: 'Donation claimed successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to claim donation', error: error.message });
  }
});

app.get('/api/stats', async (req, res) => {
  try {
    const claimedDonations = await ClaimedDonation.countDocuments();
    const unclaimedDonations = await UnclaimedDonation.countDocuments();

    const totalDonations = claimedDonations + unclaimedDonations;

    res.json({ totalDonations, claimedDonations, unclaimedDonations });
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({ message: 'Error fetching stats', error: error.message });
  }
});





app.get('/api/user/info', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) return res.status(403).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ 
      username: user.username, 
      email: user.email,
      donationsMade: user.donationsMade || 0,  // Ensure default value if not present
      claimedDonations: user.claimedDonations || 0
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to authenticate token', error: error.message });
  }
});




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});