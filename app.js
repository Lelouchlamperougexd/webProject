const express = require('express');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');

// Import database connection
const connectDB = require('./config/db');

// Initialize express app
const app = express();

// Connect to database
connectDB();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 1000 * 60 * 60 // 1 hour
    }
  })
);

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Routes
app.use('/', authRoutes);
app.use('/', studentRoutes);

app.use((req, res, next) => {
  res.status(404).render('error', { 
    error: 'Page not found',
    status: 404,
    message: 'The page you are looking for does not exist'
  });
});

// Replace your existing error handler with this more detailed one
app.use((err, req, res, next) => {
  console.error('Error details:', err);
  
  // Default to 500 server error, but use err.status if available
  const statusCode = err.status || 500;
  
  res.status(statusCode).render('error', {
    error: err.message || 'Something went wrong!',
    status: statusCode,
    stack: process.env.NODE_ENV === 'development' ? err.stack : ''
  });
});

// Error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;