import { useEffect, useMemo, useState } from "react";
import { Button } from "../components/atoms/Button";
import { InputInsetLabel } from "../components/atoms/InputInsetLabel";
import { ProfileHeader } from "../components/molecules/ProfileHeader";
import { SubscriptionCard } from "../components/molecules/SubscriptionCard";
import { MovieSection } from "../components/templates/MovieSection";
import { useAuthStore } from "../store/useAuthStore";
import { ProfileSkeleton } from "../components/templates/ProfileSkeleton";
import type { Movie } from "../const/movies";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/redux/store";
import { fetchMovies } from "../store/redux/movieSlice";

const Profile = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { user, updateProfile } = useAuthStore();

    const { movies, isLoading, error } = useSelector((state: RootState) => state.movieData);

    useEffect(() => {
        if (movies.length === 0) {
            dispatch(fetchMovies());
        }
    }, [dispatch, movies.length]);

    const myMovies = useMemo<Movie[]>(() => {
        const userList = user?.myList;
        if (!userList) return [];

        return [...userList]
            .reverse()
            .map((id) => movies.find((m) => m.id === id))
            .filter((movie): movie is Movie => !!movie);
    }, [user?.myList, movies]);

    const [formData, setFormData] = useState({
        fullname: user?.fullname || "",
        username: user?.username || "",
        email: user?.email || "",
        password: "", 
        avatar: user?.avatar || "",
        isPremium: user?.isPremium || false
    });

    // isSaving unused

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;
        
        setIsSaving(true);
        try {
            // Hanya kirim password jika pengguna mengisi input (mengubahnya)
            const payload = { 
                userId: user.id, 
                fullname: formData.fullname,
                username: formData.username, 
                email: formData.email,
                avatar: formData.avatar,
                ...(formData.password ? { password: formData.password } : {})
            };

            const axiosInstance = (await import('../services/api/axiosInstance')).default;
            const response = await axiosInstance.put('/auth/profile', payload);
            
            const newAvatar = response.data.avatar || formData.avatar;
            
            // Update auth store (lokal)
            updateProfile({
                fullname: formData.fullname,
                username: formData.username,
                email: formData.email,
                avatar: newAvatar,
                password: formData.password || user.password // Tetap pakai yang lama jika tidak diubah
            });
            
            setFormData(prev => ({ ...prev, avatar: newAvatar }));
            
            alert("Profil berhasil diperbarui!");
        } catch (error: any) {
            alert(error.response?.data?.message || "Gagal memperbarui profil.");
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading && movies.length === 0) {
        return <ProfileSkeleton />;
    }

    return (
        <div key={user?.username}>
            <form onSubmit={handleSave} className="flex flex-col gap-5 lg:gap-8 px-5 py-5 lg:px-20 lg:py-10 w-full">
                {/* Title Desktop */}
                <h1 className="hidden lg:inline text-white font-bold text-xl lg:text-3xl text-left">
                    Profil Saya
                </h1>

                <div className="flex flex-col-reverse lg:flex-row gap-5 lg:gap-20 w-full">
                    {/* Kolom Kiri: Form Profil */}
                    <div className="flex flex-col gap-8 w-full flex-1">
                        <div>
                            {/* Title Mobile */}
                            <h1 className="lg:hidden text-white font-bold text-xl text-left mb-8">
                                Profil Saya
                            </h1>
                            <ProfileHeader
                                avatar={formData.avatar}
                                onAvatarChange={(newAvatar) => setFormData(prev => ({ ...prev, avatar: newAvatar }))}
                            />
                        </div>

                        <div className="flex flex-col gap-8">
                            <InputInsetLabel
                                id="fullname"
                                label="Nama Lengkap"
                                value={formData.fullname}
                                onChange={handleChange}
                                hasEdit
                            />
                            <InputInsetLabel
                                id="username"
                                label="Nama Pengguna"
                                value={formData.username}
                                onChange={handleChange}
                                hasEdit
                            />
                            <InputInsetLabel
                                id="email"
                                label="Email"
                                value={formData.email}
                                onChange={handleChange}
                                hasEdit
                            />
                            <InputInsetLabel
                                id="password"
                                type="password"
                                label="Kata Sandi"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                hasEdit
                            />
                        </div>

                        <Button
                            type="submit"
                            variant="primary"
                            className="hidden lg:flex self-start text-base"
                        >
                            Simpan
                        </Button>
                    </div>

                    {/* Kolom Kanan: Informasi Langganan */}
                    <div className="flex-1 flex flex-col gap-2">
                        <SubscriptionCard
                            isPremium={user?.isPremium}
                            expiryDate="31 Desember 2026"
                        />
                    </div>
                </div>
            </form>

            {error && movies.length === 0 ? (
                <div className="flex flex-col items-center py-10 gap-3">
                    <p className="text-red-500">Gagal memuat daftar tontonan.</p>
                    <button
                        onClick={() => dispatch(fetchMovies())}
                        className="text-white underline text-sm"
                    >
                        Coba Lagi
                    </button>
                </div>
            ) : (
                <MovieSection
                    title="Daftar Saya"
                    movies={myMovies}
                    variant="portrait"
                    isGrid={true}
                    className="-mt-5 lg:-mt-10"
                />
            )}
        </div>
    );
};

export default Profile;