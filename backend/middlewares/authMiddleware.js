const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Autentikasi gagal, token tidak ditemukan' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'harisenin-secret-key');
        req.user = decoded; // Menyimpan data user ke request
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Token tidak valid' });
    }
};

module.exports = {
    verifyToken
};
