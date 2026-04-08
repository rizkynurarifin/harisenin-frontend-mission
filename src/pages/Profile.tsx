import { useState } from "react";
import { Button } from "../components/atoms/Button";
import { InputInsetLabel } from "../components/atoms/InputInsetLabel";
import { ProfileHeader } from "../components/molecules/ProfileHeader";
import { SubscriptionCard } from "../components/molecules/SubscriptionCard";
import { MovieSection } from "../components/templates/MovieSection";
import { ALL_CONTENT } from "../const/movies";
import { useAuthStore } from "../store/useAuthStore";

const Profile = () => {
    const { user, updateProfile } = useAuthStore();

    const myMovies = user?.myList
        ? [...user.myList]
            .reverse()
            .map((id) => ALL_CONTENT[id])
            .filter((movie) => movie !== undefined)
        : [];

    const [formData, setFormData] = useState({
        username: user?.username || "",
        email: user?.email || "",
        password: user?.password || "",
        avatar: user?.avatar || "",
        isPremium: user?.isPremium || false
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        updateProfile(formData);
        alert("Profil berhasil diperbarui!");
    };

    return (
        <main key={user?.username}>
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

            <MovieSection
                title="Daftar Saya"
                movies={myMovies}
                variant="portrait"
                isGrid={true}
                className="-mt-5 lg:-mt-10"
            />
        </main>
    );
};

export default Profile;