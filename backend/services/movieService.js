const db = require('../db');
const fs = require('fs');
const path = require('path');

const saveBase64Image = (base64Str, type, slug) => {
    if (!base64Str || !base64Str.startsWith('data:image/')) return base64Str; // Jika sudah URL atau kosong

    const matches = base64Str.match(/^data:image\/([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) return base64Str;

    const ext = matches[1] === 'jpeg' ? 'jpg' : matches[1];
    const buffer = Buffer.from(matches[2], 'base64');
    
    // type adalah 'portrait' atau 'landscape'
    const uploadsDir = path.join(__dirname, '..', 'uploads', 'thumbnail', type);
    if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const safeSlug = slug || Date.now().toString();
    const filename = `${safeSlug}.${ext}`;
    const filepath = path.join(uploadsDir, filename);
    
    fs.writeFileSync(filepath, buffer);
    return `http://localhost:5000/uploads/thumbnail/${type}/${filename}`;
};

// Service SELECT all movies
const getAllMovies = async (filter, sort, search) => {
    let query = 'SELECT * FROM series_films';
    let conditions = [];
    let params = [];

    // Kriteria Penyaringan (Filter)
    if (filter) {
        conditions.push('type = ?');
        params.push(filter);
    }

    // Kriteria Pencarian (Search)
    if (search) {
        conditions.push('title LIKE ?');
        params.push(`%${search}%`);
    }

    if (conditions.length > 0) {
        query += ' WHERE ' + conditions.join(' AND ');
    }

    // Kriteria Pengurutan (Sort)
    if (sort) {
        // Asumsi format sort = 'field' atau 'field:desc'
        const validSortFields = ['id', 'title', 'year', 'rating', 'duration'];
        const [sortField, sortOrderStr] = sort.split(':');
        const sortOrder = sortOrderStr && sortOrderStr.toLowerCase() === 'desc' ? 'DESC' : 'ASC';
        
        if (validSortFields.includes(sortField)) {
            query += ` ORDER BY ${sortField} ${sortOrder}`;
        }
    }

    const [movies] = await db.query(query, params);
    
    const [allGenres] = await db.query(`
        SELECT sfg.series_film_id, g.name 
        FROM series_film_genres sfg 
        JOIN genres g ON sfg.genre_id = g.id
    `);
    
    const [allCrew] = await db.query(`
        SELECT sfcc.series_film_id, c.name, sfcc.role 
        FROM series_film_cast_and_crew sfcc 
        JOIN cast_and_crew c ON sfcc.cast_and_crew_id = c.id
    `);

    const [allEpisodes] = await db.query(`SELECT * FROM episodes`);

    // Grouping
    const genreMap = {};
    allGenres.forEach(row => {
        if (!genreMap[row.series_film_id]) genreMap[row.series_film_id] = [];
        genreMap[row.series_film_id].push(row.name);
    });

    const castMap = {};
    const creatorMap = {};
    allCrew.forEach(row => {
        if (row.role === 'actor') {
            if (!castMap[row.series_film_id]) castMap[row.series_film_id] = [];
            castMap[row.series_film_id].push(row.name);
        } else if (row.role === 'creator') {
            if (!creatorMap[row.series_film_id]) creatorMap[row.series_film_id] = [];
            creatorMap[row.series_film_id].push(row.name);
        }
    });

    const episodeMap = {};
    allEpisodes.forEach(row => {
        if (!episodeMap[row.series_film_id]) episodeMap[row.series_film_id] = [];
        episodeMap[row.series_film_id].push({
            id: row.id,
            episodeNumber: row.episode_number,
            title: row.title,
            duration: row.duration,
            description: row.description,
            thumbnail: row.thumbnail,
            videoUrl: row.video_url,
            progress: row.progress || 0
        });
    });

    // Assign to movies
    movies.forEach(movie => {
        movie.genres = genreMap[movie.id] || [];
        movie.casts = castMap[movie.id] || [];
        movie.creators = creatorMap[movie.id] || [];
        movie.episodes = episodeMap[movie.id] || [];
    });

    return movies;
};

// Service SELECT by Id
const getMovieById = async (id) => {
    const [rows] = await db.query('SELECT * FROM series_films WHERE id = ?', [id]);
    if (rows.length === 0) return null;
    const movie = rows[0];

    const [genres] = await db.query(`
        SELECT g.name 
        FROM series_film_genres sfg 
        JOIN genres g ON sfg.genre_id = g.id 
        WHERE sfg.series_film_id = ?`, [id]);
    movie.genres = genres.map(g => g.name);

    const [crew] = await db.query(`
        SELECT c.name, sfcc.role 
        FROM series_film_cast_and_crew sfcc 
        JOIN cast_and_crew c ON sfcc.cast_and_crew_id = c.id 
        WHERE sfcc.series_film_id = ?`, [id]);
    
    movie.casts = crew.filter(c => c.role === 'actor').map(c => c.name);
    movie.creators = crew.filter(c => c.role === 'creator').map(c => c.name);

    const [episodes] = await db.query(`SELECT * FROM episodes WHERE series_film_id = ?`, [id]);
    movie.episodes = episodes.map(row => ({
        id: row.id,
        episodeNumber: row.episode_number,
        title: row.title,
        duration: row.duration,
        description: row.description,
        thumbnail: row.thumbnail,
        videoUrl: row.video_url,
        progress: row.progress || 0
    }));

    return movie;
};

// Helper functions
const getOrCreateGenreId = async (genreName) => {
    const [rows] = await db.query('SELECT id FROM genres WHERE name = ?', [genreName]);
    if (rows.length > 0) return rows[0].id;
    const [result] = await db.query('INSERT INTO genres (name) VALUES (?)', [genreName]);
    return result.insertId;
};

const getOrCreateCastAndCrewId = async (name) => {
    const [rows] = await db.query('SELECT id FROM cast_and_crew WHERE name = ?', [name]);
    if (rows.length > 0) return rows[0].id;
    const [result] = await db.query('INSERT INTO cast_and_crew (name) VALUES (?)', [name]);
    return result.insertId;
};

// Service INSERT
const insertMovie = async (movieData) => {
    let { title, slug, type, duration, year, thumbnail, thumbnail_landscape, rating, age_rating, description, trailer_url, is_new_episode, is_premium, is_top_10, genres, casts, creators, total_episodes, last_watched_episode_id, progress, episodes } = movieData;
    
    // Konversi base64 ke URL statis dengan slug
    thumbnail = saveBase64Image(thumbnail, 'portrait', slug);
    thumbnail_landscape = saveBase64Image(thumbnail_landscape, 'landscape', slug);

    const [result] = await db.query(
        `INSERT INTO series_films (title, slug, type, duration, year, thumbnail, thumbnail_landscape, rating, age_rating, description, trailer_url, is_new_episode, is_premium, is_top_10, total_episodes, last_watched_episode_id, progress) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [title, slug || null, type, duration || 0, year, thumbnail, thumbnail_landscape, rating, age_rating, description, trailer_url, is_new_episode || false, is_premium || false, is_top_10 || false, total_episodes || 0, last_watched_episode_id || null, progress || 0]
    );
    
    const insertId = result.insertId;

    if (genres && genres.length > 0) {
        const genreIds = await Promise.all(genres.map(g => getOrCreateGenreId(g)));
        const genreValues = genreIds.map(gId => [insertId, gId]);
        await db.query(`INSERT INTO series_film_genres (series_film_id, genre_id) VALUES ?`, [genreValues]);
    }

    if ((casts && casts.length > 0) || (creators && creators.length > 0)) {
        let crewValues = [];
        if (casts && casts.length > 0) {
            const castIds = await Promise.all(casts.map(c => getOrCreateCastAndCrewId(c)));
            castIds.forEach(cId => crewValues.push([insertId, cId, 'actor']));
        }
        if (creators && creators.length > 0) {
            const creatorIds = await Promise.all(creators.map(c => getOrCreateCastAndCrewId(c)));
            creatorIds.forEach(cId => crewValues.push([insertId, cId, 'creator']));
        }
        
        if (crewValues.length > 0) {
            await db.query(`INSERT INTO series_film_cast_and_crew (series_film_id, cast_and_crew_id, role) VALUES ?`, [crewValues]);
        }
    }

    if (episodes && Array.isArray(episodes) && episodes.length > 0) {
        const episodeValues = episodes.map(ep => [
            insertId,
            ep.episodeNumber || ep.episode_number || 1,
            ep.title || '',
            ep.duration || 0,
            ep.description || '',
            saveBase64Image(ep.thumbnail, 'episode', `${slug}_ep${ep.episodeNumber || 1}`),
            ep.videoUrl || ep.video_url || '',
            ep.progress || 0
        ]);

        await db.query(`INSERT INTO episodes (series_film_id, episode_number, title, duration, description, thumbnail, video_url, progress) VALUES ?`, [episodeValues]);
    }
    
    return { id: insertId, ...movieData };
};

// Service UPDATE
const updateMovie = async (id, movieData) => {
    const { genres, casts, creators, episodes, ...mainData } = movieData;
    
    let finalSlug = mainData.slug;
    if (!finalSlug) {
        const [rows] = await db.query('SELECT slug FROM series_films WHERE id = ?', [id]);
        if (rows.length > 0) finalSlug = rows[0].slug;
    }

    // Konversi base64 ke URL statis jika ada update gambar
    if (mainData.thumbnail) {
        mainData.thumbnail = saveBase64Image(mainData.thumbnail, 'portrait', finalSlug);
    }
    if (mainData.thumbnail_landscape) {
        mainData.thumbnail_landscape = saveBase64Image(mainData.thumbnail_landscape, 'landscape', finalSlug);
    }

    const keys = Object.keys(mainData);
    let affectedRows = 0;
    
    if (keys.length > 0) {
        const values = Object.values(mainData);
        const setString = keys.map(key => `${key} = ?`).join(', ');
        
        const [result] = await db.query(
            `UPDATE series_films SET ${setString} WHERE id = ?`,
            [...values, id]
        );
        affectedRows = result.affectedRows;
    }

    if (genres !== undefined) {
        const [existingRows] = await db.query(`SELECT genre_id FROM series_film_genres WHERE series_film_id = ?`, [id]);
        const existingGenreIds = existingRows.map(r => r.genre_id);

        let incomingGenreIds = [];
        if (genres.length > 0) {
            incomingGenreIds = await Promise.all(genres.map(g => getOrCreateGenreId(g)));
        }

        const toDelete = existingGenreIds.filter(gId => !incomingGenreIds.includes(gId));
        const toAdd = incomingGenreIds.filter(gId => !existingGenreIds.includes(gId));

        if (toDelete.length > 0) {
            await db.query(`DELETE FROM series_film_genres WHERE series_film_id = ? AND genre_id IN (?)`, [id, toDelete]);
        }
        if (toAdd.length > 0) {
            const genreValues = toAdd.map(gId => [id, gId]);
            await db.query(`INSERT INTO series_film_genres (series_film_id, genre_id) VALUES ?`, [genreValues]);
        }
    }

    if (casts !== undefined || creators !== undefined) {
        const [existingRows] = await db.query(`SELECT id, cast_and_crew_id, role FROM series_film_cast_and_crew WHERE series_film_id = ?`, [id]);
        const existingCasts = existingRows.filter(r => r.role === 'actor').map(r => r.cast_and_crew_id);
        const existingCreators = existingRows.filter(r => r.role === 'creator').map(r => r.cast_and_crew_id);

        if (casts !== undefined) {
            let incomingCastIds = [];
            if (casts.length > 0) {
                incomingCastIds = await Promise.all(casts.map(c => getOrCreateCastAndCrewId(c)));
            }

            const castsToDelete = existingCasts.filter(cId => !incomingCastIds.includes(cId));
            const castsToAdd = incomingCastIds.filter(cId => !existingCasts.includes(cId));

            if (castsToDelete.length > 0) {
                await db.query(`DELETE FROM series_film_cast_and_crew WHERE series_film_id = ? AND role = 'actor' AND cast_and_crew_id IN (?)`, [id, castsToDelete]);
            }
            if (castsToAdd.length > 0) {
                const castValues = castsToAdd.map(cId => [id, cId, 'actor']);
                await db.query(`INSERT INTO series_film_cast_and_crew (series_film_id, cast_and_crew_id, role) VALUES ?`, [castValues]);
            }
        }

        if (creators !== undefined) {
            let incomingCreatorIds = [];
            if (creators.length > 0) {
                incomingCreatorIds = await Promise.all(creators.map(c => getOrCreateCastAndCrewId(c)));
            }

            const creatorsToDelete = existingCreators.filter(cId => !incomingCreatorIds.includes(cId));
            const creatorsToAdd = incomingCreatorIds.filter(cId => !existingCreators.includes(cId));

            if (creatorsToDelete.length > 0) {
                await db.query(`DELETE FROM series_film_cast_and_crew WHERE series_film_id = ? AND role = 'creator' AND cast_and_crew_id IN (?)`, [id, creatorsToDelete]);
            }
            if (creatorsToAdd.length > 0) {
                const creatorValues = creatorsToAdd.map(cId => [id, cId, 'creator']);
                await db.query(`INSERT INTO series_film_cast_and_crew (series_film_id, cast_and_crew_id, role) VALUES ?`, [creatorValues]);
            }
        }
    }

    if (episodes && Array.isArray(episodes)) {
        await db.query(`DELETE FROM episodes WHERE series_film_id = ?`, [id]);
        if (episodes.length > 0) {
            const episodeValues = episodes.map(ep => [
                id,
                ep.episodeNumber || ep.episode_number || 1,
                ep.title || '',
                ep.duration || 0,
                ep.description || '',
                saveBase64Image(ep.thumbnail, 'episode', `${finalSlug}_ep${ep.episodeNumber || 1}`),
                ep.videoUrl || ep.video_url || '',
                ep.progress || 0
            ]);

            await db.query(`INSERT INTO episodes (series_film_id, episode_number, title, duration, description, thumbnail, video_url, progress) VALUES ?`, [episodeValues]);
        }
    }
    
    return affectedRows || 1;
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
