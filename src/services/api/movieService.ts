import type { Movie } from '../../const/movies';
import axiosInstance from './axiosInstance';

const RESOURCE = '/movies';

export const movieService = {
    getData: async (): Promise<Movie[]> => {
        const response = await axiosInstance.get<Movie[]>(RESOURCE);
        return response.data;
    },

    createData: async (movie: Omit<Movie, 'id'>): Promise<Movie> => {
        const response = await axiosInstance.post<Movie>(RESOURCE, movie);
        return response.data;
    },

    updateData: async (id: string, movie: Partial<Movie>): Promise<Movie> => {
        const response = await axiosInstance.put<Movie>(`${RESOURCE}/${id}`, movie);
        return response.data;
    },

    deleteData: async (id: string): Promise<void> => {
        await axiosInstance.delete(`${RESOURCE}/${id}`);
    }
};