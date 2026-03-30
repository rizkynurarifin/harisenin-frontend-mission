import { PricingCard } from "../molecules/PricingCard";

export const PricingSection = () => {
    return (
        <section className="flex flex-col items-center text-center gap-10 bg-other-paper px-10.5 py-10 lg:px-20 lg:py-10 w-full mt-0">
            <div className="flex flex-col items-center gap-1.5 lg:gap-3">
                <h2 className="text-white font-bold text-xl lg:text-[32px]">Pilih Paketmu</h2>
                <p className="text-white font-medium text-sm lg:text-lg">
                    Temukan paket sesuai kebutuhanmu!
                </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 lg:gap-18 max-w-7xl justify-center items-center lg:items-stretch">
                <PricingCard
                    title="Individual"
                    price="Rp49,990/bulan"
                    accounts="1 Akun"
                    features={["Tidak ada iklan", "Kualitas 720p", "Download konten pilihan"]}
                />
                <PricingCard
                    title="Berdua"
                    price="Rp79,990/bulan"
                    accounts="2 Akun"
                    features={["Tidak ada iklan", "Kualitas 1080p", "Download konten pilihan"]}
                />
                <PricingCard
                    title="Keluarga"
                    price="Rp159,990/bulan"
                    accounts="5-7 Akun"
                    features={["Tidak ada iklan", "Kualitas 4K", "Download konten pilihan"]}
                />
            </div>
        </section>
    );
};