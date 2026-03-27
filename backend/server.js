require('dotenv').config();
const express = require('express');
const cors = require('cors');
const runExpiryChecker = require('./jobs/expiryChecker');

const authRoutes  = require('./routes/auth');
const itemRoutes  = require('./routes/items');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/items', itemRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'FRESHLY API is running!' });
});

// Run expiry checker every 24 hours
setInterval(runExpiryChecker, 24 * 60 * 60 * 1000);
runExpiryChecker(); // also run on startup

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});