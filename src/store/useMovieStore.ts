import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ALL_CONTENT, type Movie } from '../const/movies';

interface MovieStore {
    movies: Movie[];
    addMovie: (newMovie: Movie) => void;
    updateMovie: (updatedMovie: Movie) => void;
    deleteMovie: (id: number) => void;
}

export const useMovieStore = create<MovieStore>()(
    persist(
        (set) => ({
            movies: Object.values(ALL_CONTENT),

            addMovie: (newMovie) => set((state) => ({
                movies: [newMovie, ...state.movies]
            })),

            updateMovie: (updatedMovie) => set((state) => ({
                movies: state.movies.map(m => m.id === updatedMovie.id ? updatedMovie : m)
            })),

            deleteMovie: (id) => set((state) => ({
                movies: state.movies.filter(m => m.id !== id)
            })),
        }),
        {
            name: 'chill-movie-storage',
        }
    )
);