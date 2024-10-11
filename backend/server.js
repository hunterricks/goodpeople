require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Define a simple schema
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String, // Note: In a real app, you should hash this password
});

const User = mongoose.model('User', UserSchema);

// Define routes
app.post('/api/users', async (req, res) => {
  try {
    const { email, password } = req.body;
    // Add validation here
    const user = new User({ email, password });
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error creating user', error: error.message });
  }
});

app.get('/api/users', async (req, res) => {
  const users = await User.find();
  res.send(users);
});

app.get('/api/test', (req, res) => {
  res.send('Server is reachable');
});

app.get('/api/check-user/:email', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (user) {
      res.json({ exists: true, user: { email: user.email } });
    } else {
      res.json({ exists: false });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error checking user', error: error.message });
  }
});

app.post('/api/create-test-user', async (req, res) => {
  try {
    const testUser = new User({
      email: 'test@test.com',
      password: 'test123' // In a real app, this should be hashed
    });
    await testUser.save();
    res.status(201).json({ message: 'Test user created successfully', user: testUser });
  } catch (error) {
    res.status(500).json({ message: 'Error creating test user', error: error.message });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && user.password === password) { // In a real app, use proper password comparison
      res.json({ success: true, token: 'dummy-token' });
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error during login', error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
