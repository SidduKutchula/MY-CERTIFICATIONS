const express = require('express');
const session = require('express-session');
const app = express();

app.use(session({
  secret: 'abc',
  resave: false,
  saveUninitialized: true
}));

// Root route to confirm app is running
app.get('/', (req, res) => {
  res.send('Session Management App is running');
});

// Login route
app.get('/login', (req, res) => {
  req.session.username = 'Ambika';
  res.send('User logged in');
});

// Profile route
app.get('/profile', (req, res) => {
  if (req.session.username) {
    res.send(`Welcome ${req.session.username}`);
  } else {
    res.send('Please login first');
  }
});

// Logout route
app.get('/logout', (req, res) => {
  req.session.destroy();
  res.send('User logged out');
});

app.listen(3000, () => {
  console.log('http://localhost:3000');
});
