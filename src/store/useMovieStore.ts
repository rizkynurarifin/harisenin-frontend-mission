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
            set({ movies: data.reverse(), isLoading: false });
        } catch (err) {
            console.error("Error detail:", err);
            set({ error: 'Gagal memuat konten dari server', isLoading: false });
        }
    },

    addMovie: async (newMovie) => {
        set({ isLoading: true });
        try {
            const createdMovie = await movieService.createMovie(newMovie);
            set((state) => ({
                movies: [createdMovie, ...state.movies],
                isLoading: false
            }));
        } catch (err) {
            console.error("Error detail:", err);
            set({ error: 'Gagal menambah data', isLoading: false });
        }
    },

    updateMovie: async (id, updatedMovie) => {
        set({ isLoading: true });
        try {
            const result = await movieService.updateMovie(id, updatedMovie);
            set((state) => ({
                movies: state.movies.map(m => String(m.id) === String(id) ? result : m),
                isLoading: false
            }));
        } catch (err) {
            console.error("Error detail:", err);
            set({ error: 'Gagal memperbarui data', isLoading: false });
        }
    },

    deleteMovie: async (id) => {
        set({ isLoading: true });
        try {
            await movieService.deleteMovie(id);
            set((state) => ({
                movies: state.movies.filter(m => String(m.id) !== String(id)),
                isLoading: false
            }));
        } catch (err) {
            console.error("Error detail:", err);
            set({ error: 'Gagal menghapus data', isLoading: false });
        }
    },
}));