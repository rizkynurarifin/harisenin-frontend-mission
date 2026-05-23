const express = require('express');
const router = express.Router();
const movieService = require('../services/movieService');
const authMiddleware = require('../middlewares/authMiddleware');

// Terapkan middleware ke semua endpoint movies
router.use(authMiddleware.verifyToken);

// GET /movies - List semua movies
router.get('/movies', async (req, res) => {
    try {
        const movies = await movieService.getAllMovies();
        res.status(200).json({ success: true, data: movies });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// GET /movie/:id - Menampilkan satu movie berdasarkan id
router.get('/movie/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const movie = await movieService.getMovieById(id);
        
        if (!movie) {
            return res.status(404).json({ success: false, message: 'Movie not found' });
        }
        
        res.status(200).json({ success: true, data: movie });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// POST /movie - Menambahkan data movie
router.post('/movie', async (req, res) => {
    try {
        const movieData = req.body;
        const newMovie = await movieService.insertMovie(movieData);
        res.status(201).json({ success: true, data: newMovie, message: 'Movie created successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// PUT/PATCH /movie/:id - Mengubah data berdasarkan id
router.patch('/movie/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const movieData = req.body;
        
        const affectedRows = await movieService.updateMovie(id, movieData);
        
        if (affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Movie not found or no changes made' });
        }
        
        res.status(200).json({ success: true, message: 'Movie updated successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// DELETE /movie/:id - Menghapus data berdasarkan id
router.delete('/movie/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const affectedRows = await movieService.deleteMovie(id);
        
        if (affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Movie not found' });
        }
        
        res.status(200).json({ success: true, message: 'Movie deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
