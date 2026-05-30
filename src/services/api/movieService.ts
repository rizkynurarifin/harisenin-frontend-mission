import type { Movie } from '../../const/movies';
import axiosInstance from './axiosInstance';

// Definisi tipe data yang diterima dari Backend (Database)
interface MovieDBRow {
    id?: number | string;
    title?: string;
    slug?: string;
    type?: string;
    year?: number;
    duration?: number;
    thumbnail?: string;
    thumbnail_landscape?: string;
    rating?: number;
    age_rating?: string;
    description?: string;
    trailer_url?: string;
    total_episodes?: number;
    last_watched_episode_id?: number | null;
    progress?: number;
    is_new_episode?: number | boolean;
    is_premium?: number | boolean;
    is_top_10?: number | boolean;
    episodes?: unknown[];
    genres?: string[];
    casts?: string[];
    creators?: string[];
    [key: string]: unknown; // Mengizinkan properti dinamis lainnya tanpa menggunakan 'any'
}

// Interface untuk Parameter Pencarian
export interface MovieQueryParams {
    search?: string;
    filter?: string;
    sort?: string;
    [key: string]: string | undefined;
}

// Fungsi bantuan untuk mengubah snake_case (dari MySQL) menjadi camelCase (untuk React)
const mapToMovie = (dbData: MovieDBRow): Movie => {
    const isSeries = dbData.type === 'series';
    
    const common = {
        id: Number(dbData.id),
        title: String(dbData.title || ''),
        slug: String(dbData.slug || ''),
        year: Number(dbData.year || 0),
        thumbnail: String(dbData.thumbnail || '').replace('http://localhost:5000', ''),
        thumbnailLandscape: String(dbData.thumbnail_landscape || '').replace('http://localhost:5000', ''),
        rating: Number(dbData.rating || 0),
        ageRating: String(dbData.age_rating || ''),
        description: String(dbData.description || ''),
        trailerUrl: String(dbData.trailer_url || ''),
        progress: Number(dbData.progress || 0),
        isNewEpisode: Boolean(dbData.is_new_episode),
        isPremium: Boolean(dbData.is_premium),
        isTop10: Boolean(dbData.is_top_10),
        genres: Array.isArray(dbData.genres) ? dbData.genres : [],
        casts: Array.isArray(dbData.casts) ? dbData.casts : [],
        creators: Array.isArray(dbData.creators) ? dbData.creators : [],
    };

    if (isSeries) {
        return {
            ...common,
            type: 'series',
            totalEpisodes: Number(dbData.total_episodes || 0),
            lastWatchedEpisodeId: dbData.last_watched_episode_id ? Number(dbData.last_watched_episode_id) : undefined,
            episodes: Array.isArray(dbData.episodes) ? dbData.episodes : [],
        } as Movie;
    }

    return {
        ...common,
        type: 'movie',
        duration: Number(dbData.duration || 0),
    } as Movie;
};

// Tipe gabungan yang aman untuk input ke database (menggabungkan semua kemungkinan properti)
type MovieInput = Partial<Omit<Movie, 'id'>> & { id?: number | string; [key: string]: any };

// Fungsi bantuan membalikkan camelCase ke snake_case untuk dikirim ke DB
const mapToDB = (movie: MovieInput): MovieDBRow => {
    const dbData: MovieDBRow = { ...movie } as unknown as MovieDBRow;
    
    if ('thumbnailLandscape' in movie) { dbData.thumbnail_landscape = movie.thumbnailLandscape; delete (dbData as Record<string, unknown>).thumbnailLandscape; }
    if ('ageRating' in movie) { dbData.age_rating = movie.ageRating; delete (dbData as Record<string, unknown>).ageRating; }
    if ('trailerUrl' in movie) { dbData.trailer_url = movie.trailerUrl; delete (dbData as Record<string, unknown>).trailerUrl; }
    if ('isNewEpisode' in movie) { dbData.is_new_episode = movie.isNewEpisode ? 1 : 0; delete (dbData as Record<string, unknown>).isNewEpisode; }
    if ('isPremium' in movie) { dbData.is_premium = movie.isPremium ? 1 : 0; delete (dbData as Record<string, unknown>).isPremium; }
    if ('isTop10' in movie) { dbData.is_top_10 = movie.isTop10 ? 1 : 0; delete (dbData as Record<string, unknown>).isTop10; }
    if ('totalEpisodes' in movie) { dbData.total_episodes = movie.totalEpisodes; delete (dbData as Record<string, unknown>).totalEpisodes; }
    if ('lastWatchedEpisodeId' in movie) { dbData.last_watched_episode_id = movie.lastWatchedEpisodeId; delete (dbData as Record<string, unknown>).lastWatchedEpisodeId; }
    if ('progress' in movie) { dbData.progress = movie.progress; delete (dbData as Record<string, unknown>).progress; }
    
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
    getData: async (params?: MovieQueryParams): Promise<Movie[]> => {
        const response = await axiosInstance.get('/movies', { params });
        return response.data.data.map((item: MovieDBRow) => mapToMovie(item)); 
    },

    createData: async (movie: Omit<Movie, 'id'>): Promise<Movie> => {
        const payload = mapToDB(movie as MovieInput);
        const response = await axiosInstance.post('/movie', payload);
        return mapToMovie(response.data.data);
    },

    updateData: async (id: number | string, movie: Partial<Movie>): Promise<Movie> => {
        const payload = mapToDB(movie as MovieInput);
        await axiosInstance.patch(`/movie/${id}`, payload);
        return { id: Number(id), ...movie } as Movie;
    },

    deleteData: async (id: number | string): Promise<void> => {
        await axiosInstance.delete(`/movie/${id}`);
    },

    uploadFile: async (file: File) => {
        const formData = new FormData();
        formData.append('file', file);
        const response = await axiosInstance.post('/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data.url;
    }
};