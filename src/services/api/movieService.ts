import type { Movie } from '../../const/movies';
import axiosInstance from './axiosInstance';

const RESOURCE = '/movies';

export const movieService = {
    // GET: Ambil semua data film & series
    getAllMovies: async (): Promise<Movie[]> => {
        const response = await axiosInstance.get<Movie[]>(RESOURCE);
        return response.data;
    },

    // POST: Tambah data baru
    createMovie: async (movie: Omit<Movie, 'id'>): Promise<Movie> => {
        const response = await axiosInstance.post<Movie>(RESOURCE, movie);
        return response.data;
    },

    // PUT: Update data berdasarkan ID
    updateMovie: async (id: number | string, movie: Partial<Movie>): Promise<Movie> => {
        const response = await axiosInstance.put<Movie>(`${RESOURCE}/${id}`, movie);
        return response.data;
    },

    // DELETE: Hapus data
    deleteMovie: async (id: number | string): Promise<void> => {
        await axiosInstance.delete(`${RESOURCE}/${id}`);
    }
};