const express = require('express');
const cors = require('cors');
require('dotenv').config();
const movieRoutes = require('./routes/movieRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

const path = require('path');

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' })); // Perbesar limit JSON untuk menerima Base64 yang dikirim
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Serve folder uploads sebagai static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const authRoutes = require('./routes/authRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

// Routes
// Menggunakan prefix URL tanpa '/api' tambahan untuk match contoh /movies di tabel
app.use('/', movieRoutes); 
app.use('/auth', authRoutes); 
app.use('/plans', subscriptionRoutes);
app.use('/upload', uploadRoutes);

// Root endpoint test
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Harisenin Movie API' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
