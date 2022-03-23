const express = require('express');
const path = require('path');
const dotenv = require('dotenv').config();
const colors = require('colors');
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const PORT = process.env.PORT || 5000;

//CONNECT TO DB
connectDB();

const app = express();

//MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ROUTES
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/tickets', require('./routes/ticketRoutes'));

// Serve frontend
if (process.env.NODE_ENV === 'production') {
  // Set build folder as static
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  app.get('*', (_, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to the Support desk API' });
  });
}

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
