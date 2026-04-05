import { Button } from "../atoms/Button";
import { DetailPaymentTitle } from "../atoms/DetailPaymentTitle";
import { PaymentOption } from "../molecules/PaymentOption";
import { PricingCard } from "../molecules/PricingCard";
import { TransactionSummary } from "../molecules/TransactionSummary";

export const PaymentSummarySection = () => {
    const paymentCode = "3KDJ5XFOV";

    const copyCodeToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(paymentCode);
        } catch {
            if (import.meta.env.DEV) {
                console.error("Failed copy to clipboard");
            }
        }
    };

    return (
        <section>
            <h2 className="font-bold text-xl md:text-2xl lg:text-3xl mb-5 md:mb-8 lg:mb-10">
                Ringkasan Pembayaran
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5 md:gap-8 lg:gap-10">
                <aside>
                    <PricingCard
                        title="Individual"
                        price="Rp49,990/bulan"
                        accounts="1 Akun"
                        features={[
                            "Tidak ada iklan",
                            "Kualitas 720p",
                            "Download konten pilihan",
                        ]}
                    />
                </aside>
                <aside className="grid gap-4 lg:gap-7 lg:px-6">
                    <div className="space-y-2 grid grid-cols-1">
                        <DetailPaymentTitle>Metode Pembayaran</DetailPaymentTitle>
                        <PaymentOption
                            stateValue="bca"
                            value="bca"
                            images={["/assets/payment-method/bca.png"]}
                            label="BCA Virtual Account"
                        />
                        <ul className="mt-2 space-y-2 text-xs md:text-base">
                            <li className="flex items-center gap-2">
                                <span className="text-text-light-secondary">
                                    Tanggal Pembelian
                                </span>
                                <span className="text-text-light-primary text-right ml-auto">
                                    08 Juni 2023
                                </span>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-text-light-secondary">
                                    Kode Pembayaran
                                </span>
                                <span className="text-text-light-primary text-right ml-auto">
                                    {paymentCode}
                                </span>
                                <button
                                    onClick={copyCodeToClipboard}
                                    className="cursor-pointer"
                                >
                                    <svg
                                        className="size-4 md:size-5"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M13.3346 0.833252H3.33464C2.41797 0.833252 1.66797 1.58325 1.66797 2.49992V14.1666H3.33464V2.49992H13.3346V0.833252ZM15.8346 4.16658H6.66797C5.7513 4.16658 5.0013 4.91658 5.0013 5.83325V17.4999C5.0013 18.4166 5.7513 19.1666 6.66797 19.1666H15.8346C16.7513 19.1666 17.5013 18.4166 17.5013 17.4999V5.83325C17.5013 4.91658 16.7513 4.16658 15.8346 4.16658ZM15.8346 17.4999H6.66797V5.83325H15.8346V17.4999Z"
                                            fill="#3254FF"
                                        />
                                    </svg>
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-3 lg:space-y-4">
                        <DetailPaymentTitle>Ringkasan Transaksi</DetailPaymentTitle>
                        <TransactionSummary />
                    </div>
                    <div className="space-y-2">
                        <DetailPaymentTitle>Tata Cara Pembayaran</DetailPaymentTitle>
                        <ol className="text-text-light-secondary list-decimal pl-3 md:pl-0 md:list-inside text-xs md:text-base">
                            <li>
                                Buka aplikasi BCA Mobile Banking atau akses BCA Internet
                                Banking.
                            </li>
                            <li>Login ke akun Anda.</li>
                            <li>Pilih menu "Transfer" atau "Pembayaran".</li>
                            <li>
                                Pilih opsi "Virtual Account" atau "Virtual Account Number".
                            </li>
                            <li>
                                Masukkan nomor virtual account dan jumlah pembayaran, lalu
                                konfirmasikan pembayaran.
                            </li>
                        </ol>
                    </div>
                    <div>
                        <Button>Bayar</Button>
                    </div>
                </aside>
            </div>
        </section>
    );
};