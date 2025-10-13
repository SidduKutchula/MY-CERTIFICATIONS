const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json()); // Parse JSON data

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/mydb')
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.log(err));

// User schema and model
const UserSchema = new mongoose.Schema({
  name: String,
  email: String
});
const User = mongoose.model('User', UserSchema);

// Create user
app.post('/users', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.send(user);
});

// Get all users
app.get('/users', async (req, res) => {
  const users = await User.find();
  res.send(users);
});

// Update user
app.put('/users/:id', async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(user);
});

// Delete user
app.delete('/users/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.send({ message: 'User deleted' });
});

app.listen(3000, () => console.log('🚀 Server running on port 3000'));
