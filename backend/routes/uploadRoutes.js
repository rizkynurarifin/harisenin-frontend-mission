const express = require('express');
const router = express.Router();
const upload = require('../services/uploadService');

router.post('/', upload.single('file'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'Tidak ada file yang diunggah' });
        }
        
        // Return URL format untuk Frontend
        const fileUrl = `/uploads/${req.file.filename}`;
        
        res.status(200).json({
            success: true,
            message: 'File berhasil diunggah',
            url: fileUrl
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
