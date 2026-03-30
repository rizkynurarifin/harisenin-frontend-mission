import { Button } from "../components/atoms/Button";
import { InputInsetLabel } from "../components/atoms/InputInsetLabel";
import { ProfileHeader } from "../components/molecules/ProfileHeader";
import { SubscriptionCard } from "../components/molecules/SubscriptionCard";
import { MovieSection } from "../components/templates/MovieSection";
import { MY_LIST } from "../const/movies";

const Profile = () => {
    const isPremiumUser = false;

    return (
        <main>
            <section className="flex flex-col gap-5 lg:gap-8 px-5 py-5 lg:px-20 lg:py-10 w-full">
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
                            <ProfileHeader />
                        </div>

                        <div className="flex flex-col gap-8">
                            <InputInsetLabel label="Nama Pengguna" placeholder="Rizky" hasEdit />
                            <InputInsetLabel label="Email" placeholder="arifinnurrizky@gmail.com" />
                            <InputInsetLabel type="password" label="Kata Sandi" placeholder="***************" hasEdit />
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
                            isPremium={isPremiumUser}
                            expiryDate="31 Desember 2026"
                        />
                    </div>
                </div>
            </section>

            <MovieSection
                title="Daftar Saya"
                movies={MY_LIST}
                variant="portrait"
                isGrid={true}
                className="-mt-5 lg:-mt-10"
            />
        </main>
    );
};

export default Profile;