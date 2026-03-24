const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const cors = require('cors'); // ← เพิ่ม

// Load env vars
dotenv.config({ path: './config/config.env' });

// Connect to database
connectDB();

// Route files
const providers = require('./routes/providers');
const bookings = require('./routes/bookings');
const auth = require('./routes/auth');

const app = express();
app.set('query parser', 'extended');

// CORS ← เพิ่ม (ต้องอยู่ก่อน routes ทุกอัน)
app.use(cors({
  origin: [
    "*"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

// Handle OPTIONS preflight ← เพิ่ม
app.options('*', cors());

app.use(express.json());
app.use(cookieParser());

// Mount routers
app.use('/api/v1/providers', providers);
app.use('/api/v1/bookings', bookings);
app.use('/api/v1/auth', auth);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, console.log('Server running in ', process.env.NODE_ENV, ' mode on port ', PORT)); // ← เพิ่ม const server =

process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});