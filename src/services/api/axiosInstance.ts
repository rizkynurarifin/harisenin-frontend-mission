import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor Response untuk menangani error global
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        const errorMessage = error.response?.data || error.message;
        console.error('Terjadi kesalahan pada API:', errorMessage);
        return Promise.reject(error);
    }
);

export default axiosInstance;