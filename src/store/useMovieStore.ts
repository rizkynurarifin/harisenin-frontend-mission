import { create } from 'zustand';
import { movieService } from '../services/api/movieService';
import type { Movie } from '../const/movies';

interface MovieStore {
    movies: Movie[];
    isLoading: boolean;
    error: string | null;

    fetchMovies: () => Promise<void>;
    addMovie: (newMovie: Omit<Movie, 'id'>) => Promise<void>;
    updateMovie: (id: string, updatedMovie: Partial<Movie>) => Promise<void>;
    deleteMovie: (id: string) => Promise<void>;
}

export const useMovieStore = create<MovieStore>((set) => ({
    movies: [],
    isLoading: false,
    error: null,

    fetchMovies: async () => {
        set({ isLoading: true, error: null });
        try {
            const data = await movieService.getAllMovies();
            set({ movies: (data || []).reverse(), isLoading: false });
        } catch (err) {
            console.error("Fetch movies error:", err);
            set({
                error: 'Server sedang mengalami gangguan, silakan coba lagi nanti.',
                isLoading: false
            });
        }
    },

    addMovie: async (newMovie) => {
        set({ isLoading: true, error: null });
        try {
            const createdMovie = await movieService.createMovie(newMovie);
            set((state) => ({
                movies: [createdMovie, ...state.movies],
                isLoading: false
            }));
        } catch (err) {
            console.error("Add Movie Error:", err);
            set({ error: 'Gagal menambah data.', isLoading: false });
        }
    },

    updateMovie: async (id, updatedMovie) => {
        set({ isLoading: true, error: null });
        try {
            const result = await movieService.updateMovie(id, updatedMovie);
            set((state) => ({
                movies: state.movies.map((m) => (m.id === id ? result : m)),
                isLoading: false
            }));
        } catch (err) {
            console.error("Update Movie Error:", err);
            set({ error: 'Gagal memperbarui data.', isLoading: false });
        }
    },

    deleteMovie: async (id) => {
        set({ isLoading: true, error: null });
        try {
            await movieService.deleteMovie(id);
            set((state) => ({
                movies: state.movies.filter((m) => m.id !== id),
                isLoading: false
            }));
        } catch (err) {
            console.error("Delete Movie Error:", err);
            set({ error: 'Gagal menghapus data.', isLoading: false });
        }
    },
}));