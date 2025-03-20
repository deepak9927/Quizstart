require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');
const emailService = require('./service/emailService');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

console.log("MONGODB_URI:", MONGODB_URI); // Debugging

// Middleware
app.use(cors());
//app.use(express.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log(`MongoDB connected on ${MONGODB_URI}`))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api', routes);

// API health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Server error',
    error: process.env.NODE_ENV === 'production' ? {} : err
  });
});

// Test email functionality if in development mode
if (process.env.NODE_ENV === 'development') {
  emailService.sendTestEmail(
    'deepak27kumarthakur@gmail.com',
    'Server Started',
    'The Quiz API server has started successfully!'
  ).then(info => {
    if (info && nodemailer.getTestMessageUrl) {
      console.log('Test email preview URL:', nodemailer.getTestMessageUrl(info));
    }
  }).catch(err => {
    console.error('Email test failed:', err);
  });
}

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
