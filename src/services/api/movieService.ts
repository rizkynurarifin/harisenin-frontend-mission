import type { Movie } from '../../const/movies';
import axiosInstance from './axiosInstance';

// Fungsi bantuan untuk mengubah snake_case (dari MySQL) menjadi camelCase (untuk React)
const mapToMovie = (dbData: any): Movie => {
    return {
        id: Number(dbData.id),
        title: dbData.title,
        slug: dbData.slug,
        type: dbData.type,
        year: dbData.year,
        duration: dbData.duration,
        thumbnail: dbData.thumbnail,
        thumbnailLandscape: dbData.thumbnail_landscape,
        rating: dbData.rating,
        ageRating: dbData.age_rating,
        description: dbData.description,
        trailerUrl: dbData.trailer_url,
        totalEpisodes: dbData.total_episodes || 0,
        lastWatchedEpisodeId: dbData.last_watched_episode_id || null,
        progress: dbData.progress || 0,
        isNewEpisode: Boolean(dbData.is_new_episode),
        isPremium: Boolean(dbData.is_premium),
        isTop10: Boolean(dbData.is_top_10),

        episodes: dbData.episodes || [],
        genres: dbData.genres || [],
        casts: dbData.casts || [],
        creators: dbData.creators || [],
    } as Movie;
};

// Fungsi bantuan membalikkan camelCase ke snake_case untuk dikirim ke DB
const mapToDB = (movie: any): any => {
    const dbData: any = { ...movie };
    if ('thumbnailLandscape' in movie) { dbData.thumbnail_landscape = movie.thumbnailLandscape; delete dbData.thumbnailLandscape; }
    if ('ageRating' in movie) { dbData.age_rating = movie.ageRating; delete dbData.ageRating; }
    if ('trailerUrl' in movie) { dbData.trailer_url = movie.trailerUrl; delete dbData.trailerUrl; }
    if ('isNewEpisode' in movie) { dbData.is_new_episode = movie.isNewEpisode; delete dbData.isNewEpisode; }
    if ('isPremium' in movie) { dbData.is_premium = movie.isPremium; delete dbData.isPremium; }
    if ('isTop10' in movie) { dbData.is_top_10 = movie.isTop10; delete dbData.isTop10; }
    if ('totalEpisodes' in movie) { dbData.total_episodes = movie.totalEpisodes; delete dbData.totalEpisodes; }
    if ('lastWatchedEpisodeId' in movie) { dbData.last_watched_episode_id = movie.lastWatchedEpisodeId; delete dbData.lastWatchedEpisodeId; }
    if ('progress' in movie) { dbData.progress = movie.progress; delete dbData.progress; }
    
    // Hapus properti React yang tidak ada di tabel series_films
    delete dbData.id;
    
    // Hapus nilai undefined agar mysql2 tidak melempar error 500
    Object.keys(dbData).forEach(key => {
        if (dbData[key] === undefined) {
            delete dbData[key];
        }
    });
    
    return dbData;
};

export const movieService = {
    getData: async (): Promise<Movie[]> => {
        const response = await axiosInstance.get('/movies');
        return response.data.data.map(mapToMovie); 
    },

    createData: async (movie: Omit<Movie, 'id'>): Promise<Movie> => {
        const payload = mapToDB(movie);
        const response = await axiosInstance.post('/movie', payload);
        return mapToMovie(response.data.data);
    },

    updateData: async (id: number | string, movie: Partial<Movie>): Promise<Movie> => {
        const payload = mapToDB(movie);
        await axiosInstance.patch(`/movie/${id}`, payload);
        return { id: Number(id), ...movie } as Movie;
    },

    deleteData: async (id: number | string): Promise<void> => {
        await axiosInstance.delete(`/movie/${id}`);
    }
};