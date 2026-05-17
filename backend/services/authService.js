const db = require('../db');

const register = async (username, email, password) => {
    const [existing] = await db.query('SELECT id FROM users WHERE username = ? OR email = ?', [username, email]);
    if (existing.length > 0) {
        throw new Error('Username atau email sudah terdaftar');
    }

    const [result] = await db.query(
        'INSERT INTO users (username, email, password, role, is_premium) VALUES (?, ?, ?, ?, ?)',
        [username, email, password, 'user', false]
    );

    return {
        id: result.insertId,
        username,
        email,
        role: 'user',
        isPremium: false,
        myList: []
    };
};

const login = async (username, password) => {
    const [rows] = await db.query(
        'SELECT id, username, email, profile_photo as avatar, role, is_premium as isPremium FROM users WHERE username = ? AND password = ?',
        [username, password]
    );
    
    if (rows.length === 0) {
        throw new Error('Username atau password salah');
    }

    const user = rows[0];
    
    const [myListRows] = await db.query('SELECT series_film_id FROM my_lists WHERE user_id = ?', [user.id]);
    user.myList = myListRows.map(row => row.series_film_id);
    // user.isPremium sudah diambil dari tabel MySQL (is_premium)
    user.isPremium = Boolean(user.isPremium);

    return user;
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
    const { username, email, password, avatar } = data;
    
    // Siapkan array fields dan values
    let fields = [];
    let values = [];
    
    if (username) { fields.push('username = ?'); values.push(username); }
    if (email) { fields.push('email = ?'); values.push(email); }
    if (password) { fields.push('password = ?'); values.push(password); }
    
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

module.exports = {
    register,
    login,
    addToMyList,
    removeFromMyList,
    updateProfile
};
