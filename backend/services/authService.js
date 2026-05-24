const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const emailService = require('./emailService');

const register = async (fullname, username, email, password) => {
    const [existing] = await db.query('SELECT id FROM users WHERE username = ? OR email = ?', [username, email]);
    if (existing.length > 0) {
        throw new Error('Username atau email sudah terdaftar');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = uuidv4();

    const [result] = await db.query(
        'INSERT INTO users (fullname, username, email, password, plain_password, role, is_premium, verification_token, is_verified) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [fullname, username, email, hashedPassword, password, 'user', false, verificationToken, false]
    );

    // Kirim email verifikasi (berjalan di background tanpa menghalangi response)
    emailService.sendVerificationEmail(email, verificationToken).catch(err => {
        console.error("Error sending verification email:", err);
    });

    return {
        id: result.insertId,
        fullname,
        username,
        email,
        role: 'user',
        isPremium: false,
        myList: [],
        isVerified: false
    };
};

const login = async (email, password) => {
    const [rows] = await db.query(
        'SELECT id, fullname, username, email, password as hashedPassword, profile_photo as avatar, role, is_premium as isPremium, is_verified FROM users WHERE email = ?',
        [email]
    );
    
    if (rows.length === 0) {
        throw new Error('Email atau password salah');
    }

    const user = rows[0];

    if (!user.is_verified) {
        throw new Error('Akun Anda belum diverifikasi. Silakan cek email untuk melakukan verifikasi.');
    }
    
    const isMatch = await bcrypt.compare(password, user.hashedPassword);
    if (!isMatch) {
        throw new Error('Email atau password salah');
    }
    
    delete user.hashedPassword;
    
    const [myListRows] = await db.query('SELECT series_film_id FROM my_lists WHERE user_id = ?', [user.id]);
    user.myList = myListRows.map(row => row.series_film_id);
    // user.isPremium sudah diambil dari tabel MySQL (is_premium)
    user.isPremium = Boolean(user.isPremium);

    const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET || 'harisenin-secret-key',
        { expiresIn: '1d' }
    );

    return { user, token };
};

const addToMyList = async (userId, movieId) => {
    const [existing] = await db.query('SELECT id FROM my_lists WHERE user_id = ? AND series_film_id = ?', [userId, movieId]);
    if (existing.length === 0) {
        await db.query('INSERT INTO my_lists (user_id, series_film_id) VALUES (?, ?)', [userId, movieId]);
    }
};

const removeFromMyList = async (userId, movieId) => {
    await db.query('DELETE FROM my_lists WHERE user_id = ? AND series_film_id = ?', [userId, movieId]);
};

const fs = require('fs');
const path = require('path');

const updateProfile = async (userId, data) => {
    const { fullname, username, email, password, avatar } = data;
    
    // Siapkan array fields dan values
    let fields = [];
    let values = [];
    
    if (fullname) { fields.push('fullname = ?'); values.push(fullname); }
    if (username) { fields.push('username = ?'); values.push(username); }
    if (email) { fields.push('email = ?'); values.push(email); }
    if (password) { 
        const hashedPassword = await bcrypt.hash(password, 10);
        fields.push('password = ?'); values.push(hashedPassword);
        fields.push('plain_password = ?'); values.push(password);
    }
    
    if (avatar !== undefined) { 
        let finalAvatarPath = avatar;
        
        // Cek apakah avatar adalah base64 string
        if (avatar && avatar.startsWith('data:image')) {
            const matches = avatar.match(/^data:image\/([A-Za-z-+\/]+);base64,(.+)$/);
            if (matches && matches.length === 3) {
                const extension = matches[1] === 'jpeg' ? 'jpg' : matches[1];
                const base64Data = matches[2];
                const buffer = Buffer.from(base64Data, 'base64');
                const fileName = `avatar_${userId}_${Date.now()}.${extension}`;
                
                // Pastikan folder uploads ada
                const uploadsDir = path.join(__dirname, '../uploads');
                if (!fs.existsSync(uploadsDir)) {
                    fs.mkdirSync(uploadsDir, { recursive: true });
                }
                
                const filePath = path.join(uploadsDir, fileName);
                fs.writeFileSync(filePath, buffer);
                
                // Set path untuk database
                finalAvatarPath = `/uploads/${fileName}`;
            }
        }
        
        fields.push('profile_photo = ?'); 
        values.push(finalAvatarPath); 
    }
    
    if (fields.length === 0) return;
    
    values.push(userId); // untuk WHERE id = ?
    
    await db.query(`UPDATE users SET ${fields.join(', ')} WHERE id = ?`, values);
    
    // Kembalikan path avatar baru jika ada, atau undefined
    return data.avatar !== undefined ? values[fields.indexOf('profile_photo = ?')] : undefined;
};

const verifyEmail = async (token) => {
    // Cari user dengan token tersebut
    const [rows] = await db.query('SELECT id, is_verified FROM users WHERE verification_token = ?', [token]);
    
    if (rows.length === 0) {
        throw new Error('Invalid Verification Token');
    }

    const user = rows[0];
    if (user.is_verified) {
        throw new Error('Email sudah diverifikasi sebelumnya');
    }

    // Update is_verified menjadi true dan bisa opsional menghapus tokennya
    await db.query('UPDATE users SET is_verified = TRUE, verification_token = NULL WHERE id = ?', [user.id]);
    
    return true;
};

module.exports = {
    register,
    login,
    addToMyList,
    removeFromMyList,
    updateProfile,
    verifyEmail
};
