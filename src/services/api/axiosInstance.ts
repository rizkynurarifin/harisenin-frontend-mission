import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor Request untuk menyematkan token
axiosInstance.interceptors.request.use((config) => {
    const authStorage = localStorage.getItem('chill-auth-storage');
    if (authStorage) {
        try {
            const parsed = JSON.parse(authStorage);
            const token = parsed?.state?.token;
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        } catch (error) {
            console.error("Gagal membaca token:", error);
        }
    }
    return config;
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