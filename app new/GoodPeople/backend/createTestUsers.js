const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://hunter:dpWBOLey0BS9qAuC@goodpeoplecluster.cmy0h.mongodb.net/?retryWrites=true&w=majority&appName=GoodPeopleCluster';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('Could not connect to MongoDB', err);
    process.exit(1);
  });

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const User = mongoose.model('User', UserSchema);

const testUsers = [
  { email: 'test1@example.com', password: 'password1' },
  { email: 'test2@example.com', password: 'password2' },
  { email: 'test@etest.com', password: 'test123' },
];

async function createTestUsers() {
  for (let user of testUsers) {
    try {
      const existingUser = await User.findOne({ email: user.email });
      if (!existingUser) {
        await User.create(user);
        console.log(`Created test user: ${user.email}`);
      } else {
        console.log(`Test user already exists: ${user.email}`);
      }
    } catch (error) {
      console.error(`Error creating test user ${user.email}:`, error);
    }
  }
  await mongoose.connection.close();
  console.log('Finished creating test users');
}

createTestUsers().catch(console.error);