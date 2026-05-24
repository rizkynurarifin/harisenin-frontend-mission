const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Pastikan folder uploads tersedia
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Konfigurasi Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadsDir); // arahkan ke folder upload
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        // Format: file-123456789.jpg
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 } // limit 10MB
});

module.exports = upload;
