const express = require('express');
const cors = require('cors');
require('dotenv').config();
const movieRoutes = require('./routes/movieRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Untuk parsing application/json
app.use(express.urlencoded({ extended: true }));

// Routes
// Menggunakan prefix URL tanpa '/api' tambahan untuk match contoh /movies di tabel
app.use('/', movieRoutes); 

// Root endpoint test
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Harisenin Movie API' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
