import { Button } from "../atoms/Button";

interface SubscriptionCardProps {
    isPremium: boolean;
    expiryDate?: string;
}

export const SubscriptionCard = ({ isPremium, expiryDate }: SubscriptionCardProps) => {
    if (isPremium) {
        return (
            <article className="flex flex-col justify-center gap-5 w-full bg-[linear-gradient(286.17deg,#192DB7_0%,#5370D4_100%)] rounded-xl h-min p-5 lg:p-6">
                <Button variant="light" className="w-max">
                    Aktif
                </Button>
                <div className="flex flex-col gap-3">
                    <h2 className="text-white font-bold text-lg lg:text-2xl">Akun Premium Individual✨</h2>
                    <p className="text-white text-sm lg:text-lg">Saat ini kamu sedang menggunakan akses akun premium</p>
                </div>
                <p className="font-medium text-text-light-secondary text-sm lg:text-base">Berlaku hingga {expiryDate}</p>
            </article>
        );
    }

    return (
        <article className="flex flex-col justify-center items-end gap-5 w-full bg-other-extra rounded-xl h-min p-5 lg:p-6">
            <div className="flex items-center gap-5 w-full">
                <img src="/warning.png" className="w-19.5 h-19.5 shrink-0" alt="Warning" />
                <div className="flex flex-col gap-3 flex-1">
                    <h2 className="text-white font-bold text-lg lg:text-2xl">
                        <span className="hidden lg:inline">Saat ini anda belum berlangganan</span>
                        <span className="lg:hidden">Berlangganan</span>
                    </h2>
                    <p className="text-white text-sm lg:text-lg">Dapatkan Akses Tak Terbatas ke Ribuan Film dan Series Kesukaan Kamu!</p>
                </div>
            </div>
            <Button to="/subscription" variant="dark">
                Mulai Berlangganan
            </Button>
        </article>
    );
};