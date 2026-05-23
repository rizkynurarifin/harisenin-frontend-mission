const express = require('express');
const router = express.Router();
const authService = require('../services/authService');

router.post('/register', async (req, res) => {
    try {
        const { fullname, username, email, password } = req.body;
        const user = await authService.register(fullname, username, email, password);
        res.status(201).json({ message: 'Registrasi berhasil', user });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await authService.login(email, password);
        res.status(200).json({ message: 'Login berhasil', user: result.user, token: result.token });
    } catch (err) {
        res.status(401).json({ message: err.message });
    }
});

router.post('/mylist', async (req, res) => {
    try {
        const { userId, movieId } = req.body;
        if (!userId || !movieId) return res.status(400).json({ message: 'userId dan movieId wajib diisi' });
        await authService.addToMyList(userId, movieId);
        res.status(201).json({ message: 'Berhasil ditambahkan ke daftar' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.delete('/mylist', async (req, res) => {
    try {
        const { userId, movieId } = req.body;
        if (!userId || !movieId) return res.status(400).json({ message: 'userId dan movieId wajib diisi' });
        await authService.removeFromMyList(userId, movieId);
        res.status(200).json({ message: 'Berhasil dihapus dari daftar' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.put('/profile', async (req, res) => {
    try {
        const { userId, ...data } = req.body;
        if (!userId) return res.status(400).json({ message: 'userId wajib diisi' });
        
        const newAvatarPath = await authService.updateProfile(userId, data);
        res.status(200).json({ 
            message: 'Profil berhasil diperbarui', 
            avatar: newAvatarPath 
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
