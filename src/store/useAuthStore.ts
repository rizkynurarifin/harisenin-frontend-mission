import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Plan {
    title: string;
    price: string;
    rawPrice: number;
    accounts: string;
    features: string[];
}

interface UserData {
    username: string;
    email: string;
    password?: string;
    avatar?: string;
    role: 'user' | 'admin';
    isPremium: boolean;
}

interface AuthStore {
    user: UserData | null;
    isLoggedIn: boolean;
    registeredUsers: UserData[];
    selectedPlan: Plan | null;

    // Actions
    register: (newUser: UserData) => void;
    login: (username: string, pass: string) => { success: boolean; message: string };
    logout: () => void;
    updateProfile: (updatedData: Partial<UserData>) => void;
    setPremium: (status: boolean) => void;
    setSelectedPlan: (plan: Plan | null) => void;
}

export const useAuthStore = create<AuthStore>()(
    persist(
        (set, get) => ({
            user: null,
            isLoggedIn: false,
            selectedPlan: null,
            registeredUsers: [
                {
                    username: 'admin',
                    email: 'admin@chill.com',
                    password: '123',
                    role: 'admin',
                    avatar: '/src/assets/my-profile.jpeg',
                    isPremium: true,
                }
            ],

            // Fungsi Daftar
            register: (newUser) => {
                const { registeredUsers } = get();
                const isExist = registeredUsers.find(
                    (u) => u.username === newUser.username || u.email === newUser.email
                );

                if (!isExist) {
                    const userWithAvatar = {
                        ...newUser,
                        isPremium: false,
                        avatar: newUser.avatar || '/src/assets/profile.png'
                    };
                    set({ registeredUsers: [...registeredUsers, userWithAvatar] });
                }
            },

            // Fungsi Login
            login: (username, pass) => {
                const { registeredUsers } = get();
                const foundUser = registeredUsers.find(
                    (u) => u.username === username && u.password === pass
                );

                if (foundUser) {
                    set({ user: foundUser, isLoggedIn: true });
                    return { success: true, message: "Login Berhasil" };
                }
                return { success: false, message: "Username atau password salah" };
            },

            // Fungsi Update Profile
            updateProfile: (updatedData) => {
                const { user, registeredUsers } = get();
                if (!user) return;

                const updatedUser = { ...user, ...updatedData };
                const updatedList = registeredUsers.map((u) =>
                    u.email === user.email ? { ...u, ...updatedData } : u
                );

                set({ user: updatedUser, registeredUsers: updatedList });
            },

            // Fungsi Status Premium
            setPremium: (status) => {
                const { user, registeredUsers } = get();
                if (!user) return;

                const updatedUser = { ...user, isPremium: status };
                const updatedList = registeredUsers.map((u) =>
                    u.email === user.email ? updatedUser : u
                );

                set({ user: updatedUser, registeredUsers: updatedList });
            },

            // Fungsi untuk menyimpan paket yang dipilih user
            setSelectedPlan: (plan) => set({ selectedPlan: plan }),

            // Fungsi Logout
            logout: () => set({ user: null, isLoggedIn: false }),
        }),
        {
            name: 'chill-auth-storage',
        }
    )
);