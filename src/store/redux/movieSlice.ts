import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { movieService } from '../../services/api/movieService';
import type { Movie } from '../../const/movies';
import axios from 'axios';

interface MovieState {
    movies: Movie[];
    isLoading: boolean;
    error: string | null;
}

const initialState: MovieState = {
    movies: [],
    isLoading: false,
    error: null,
};

const getErrorMessage = (err: unknown, defaultMessage: string): string => {
    if (axios.isAxiosError(err)) {
        return err.response?.data || err.message;
    }
    return defaultMessage;
};

// --- Async Thunks (Pengganti fungsi di Zustand) ---

// export const fetchMovies = createAsyncThunk('movies/fetchAll', async () => {
//     const data = await movieService.getAllMovies();
//     return data.reverse();
// });

// export const addMovieAction = createAsyncThunk('movies/add', async (newMovie: Omit<Movie, 'id'>) => {
//     return await movieService.createMovie(newMovie);
// });

// export const updateMovieAction = createAsyncThunk(
//     'movies/update',
//     async ({ id, data }: { id: string; data: Partial<Movie> }) => {
//         return await movieService.updateMovie(id, data);
//     }
// );

// export const deleteMovieAction = createAsyncThunk('movies/delete', async (id: string) => {
//     await movieService.deleteMovie(id);
//     return id;
// });

export const fetchMovies = createAsyncThunk<
    Movie[],
    void,
    { rejectValue: string }
>(
    'movies/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            const data = await movieService.getData();
            return data.reverse();
        } catch (err) {
            return rejectWithValue(getErrorMessage(err, "Gagal mengambil data"));
        }
    }
);

export const addMovieAction = createAsyncThunk<
    Movie,
    Omit<Movie, 'id'>,
    { rejectValue: string }
>(
    'movies/add',
    async (newMovie, { rejectWithValue }) => {
        try {
            return await movieService.createData(newMovie);
        } catch (err) {
            return rejectWithValue(getErrorMessage(err, "Gagal menambah film"));
        }
    }
);

export const updateMovieAction = createAsyncThunk<
    Movie,
    { id: string; data: Partial<Movie> },
    { rejectValue: string }
>(
    'movies/update',
    async ({ id, data }, { rejectWithValue }) => {
        try {
            return await movieService.updateData(id, data);
        } catch (err) {
            return rejectWithValue(getErrorMessage(err, "Gagal memperbarui data"));
        }
    }
);

export const deleteMovieAction = createAsyncThunk<
    string | number,
    string,
    { rejectValue: string }
>(
    'movies/delete',
    async (id, { rejectWithValue }) => {
        try {
            await movieService.deleteData(id);
            return id;
        } catch (err) {
            return rejectWithValue(getErrorMessage(err, "Gagal menghapus data"));
        }
    }
);

// --- Slice ---

const movieSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Handle Fetch
            .addCase(fetchMovies.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchMovies.fulfilled, (state, action) => {
                state.isLoading = false;
                state.movies = action.payload;
            })
            .addCase(fetchMovies.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || "Gagal mengambil data";
            })
            // Handle Add
            .addCase(addMovieAction.fulfilled, (state, action) => {
                state.movies.unshift(action.payload);
                state.error = null;
            })
            .addCase(addMovieAction.rejected, (state, action) => {
                state.error = action.payload || "Gagal menambah data";
            })
            // Handle Update
            .addCase(updateMovieAction.fulfilled, (state, action) => {
                const index = state.movies.findIndex(m => String(m.id) === String(action.payload.id));
                if (index !== -1) state.movies[index] = action.payload;
                state.error = null;
            })
            .addCase(updateMovieAction.rejected, (state, action) => {
                state.error = action.payload || "Gagal update data";
            })
            // Handle Delete
            .addCase(deleteMovieAction.fulfilled, (state, action) => {
                state.movies = state.movies.filter(m => String(m.id) !== String(action.payload));
                state.error = null;
            })
            .addCase(deleteMovieAction.rejected, (state, action) => {
                state.error = action.payload || "Gagal menghapus data";
            });
    },
});

export const { clearError } = movieSlice.actions;
export default movieSlice.reducer;