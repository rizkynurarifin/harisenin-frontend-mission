const db = require('../db');

// Service SELECT all movies
const getAllMovies = async () => {
    // Menggunakan tabel series_films sesuai ERD sebelumnya
    const [rows] = await db.query('SELECT * FROM series_films');
    return rows;
};

// Service SELECT by Id
const getMovieById = async (id) => {
    const [rows] = await db.query('SELECT * FROM series_films WHERE id = ?', [id]);
    return rows[0];
};

// Service INSERT
const insertMovie = async (movieData) => {
    const { title, type, year, thumbnail, thumbnail_landscape, rating, age_rating, description, trailer_url, is_new_episode, is_premium, is_top_10 } = movieData;
    
    const [result] = await db.query(
        `INSERT INTO series_films (title, type, year, thumbnail, thumbnail_landscape, rating, age_rating, description, trailer_url, is_new_episode, is_premium, is_top_10) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [title, type, year, thumbnail, thumbnail_landscape, rating, age_rating, description, trailer_url, is_new_episode || false, is_premium || false, is_top_10 || false]
    );
    
    return { id: result.insertId, ...movieData };
};

// Service UPDATE
const updateMovie = async (id, movieData) => {
    const keys = Object.keys(movieData);
    const values = Object.values(movieData);
    
    if (keys.length === 0) return null;

    const setString = keys.map(key => `${key} = ?`).join(', ');
    
    const [result] = await db.query(
        `UPDATE series_films SET ${setString} WHERE id = ?`,
        [...values, id]
    );
    
    return result.affectedRows;
};

// Service DELETE
const deleteMovie = async (id) => {
    const [result] = await db.query('DELETE FROM series_films WHERE id = ?', [id]);
    return result.affectedRows;
};

module.exports = {
    getAllMovies,
    getMovieById,
    insertMovie,
    updateMovie,
    deleteMovie
};
