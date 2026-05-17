import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axiosInstance from '../services/api/axiosInstance';

export interface Plan {
    title: string;
    price: string;
    rawPrice: number;
    accounts: string;
    features: string[];
}

interface UserData {
    id?: number;
    username: string;
    email: string;
    password?: string;
    avatar?: string;
    role: 'user' | 'admin';
    isPremium: boolean;
    myList: number[];
}

interface AuthStore {
    user: UserData | null;
    isLoggedIn: boolean;
    selectedPlan: Plan | null;

    // Actions
    register: (newUser: UserData) => Promise<{ success: boolean; message: string }>;
    login: (username: string, pass: string) => Promise<{ success: boolean; message: string }>;
    logout: () => void;
    updateProfile: (updatedData: Partial<UserData>) => void;
    setPremium: (status: boolean) => void;
    setSelectedPlan: (plan: Plan | null) => void;
    addToMyList: (movieId: number) => Promise<void>;
    removeFromMyList: (movieId: number) => Promise<void>;
}

export const useAuthStore = create<AuthStore>()(
    persist(
        (set, get) => ({
            user: null,
            isLoggedIn: false,
            selectedPlan: null,

            // Fungsi Daftar
            register: async (newUser) => {
                try {
                    await axiosInstance.post('/auth/register', newUser);
                    return { success: true, message: "Pendaftaran Berhasil" };
                } catch (error: any) {
                    return { success: false, message: error.response?.data?.message || "Gagal mendaftar" };
                }
            },

            // Fungsi Login
            login: async (username, pass) => {
                try {
                    const response = await axiosInstance.post('/auth/login', { username, password: pass });
                    const user = response.data.user;
                    set({ user, isLoggedIn: true });
                    return { success: true, message: "Login Berhasil" };
                } catch (error: any) {
                    return { success: false, message: error.response?.data?.message || "Username atau password salah" };
                }
            },

            // Fungsi Update Profile (Masih local untuk saat ini)
            updateProfile: (updatedData) => {
                const { user } = get();
                if (!user) return;
                const updatedUser = { ...user, ...updatedData } as UserData;
                set({ user: updatedUser });
            },

            // Fungsi Status Premium (Masih local)
            setPremium: (status) => {
                const { user } = get();
                if (!user) return;
                set({ user: { ...user, isPremium: status } });
            },

            // Fungsi untuk menyimpan paket yang dipilih user
            setSelectedPlan: (plan) => set({ selectedPlan: plan }),

            // Fungsi Logout
            logout: () => set({ user: null, isLoggedIn: false }),

            // Logika menambahkan film ke daftar
            addToMyList: async (movieId) => {
                const { user } = get();
                if (!user || user.myList.includes(movieId)) return;

                try {
                    await axiosInstance.post('/auth/mylist', { userId: user.id, movieId });
                    const updatedUser = { ...user, myList: [...user.myList, movieId] };
                    set({ user: updatedUser });
                } catch (error) {
                    console.error("Gagal menambahkan ke daftar", error);
                }
            },

            // Logika menghapus film dari daftar
            removeFromMyList: async (movieId) => {
                const { user } = get();
                if (!user) return;

                try {
                    await axiosInstance.delete('/auth/mylist', { data: { userId: user.id, movieId } });
                    const updatedUser = {
                        ...user,
                        myList: user.myList.filter(id => id !== movieId)
                    };
                    set({ user: updatedUser });
                } catch (error) {
                    console.error("Gagal menghapus dari daftar", error);
                }
            },
        }),
        {
            name: 'chill-auth-storage',
        }
    )
);