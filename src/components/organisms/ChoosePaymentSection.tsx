import { useState } from "react";
import { Button } from "../atoms/Button";
import { DetailPaymentTitle } from "../atoms/DetailPaymentTitle";
import { InputVoucher } from "../atoms/InputVoucher";
import { PricingCard } from "../molecules/PricingCard";
import { TransactionSummary } from "../molecules/TransactionSummary";
import { PaymentMethod, type PaymentMethodOption } from "../molecules/PaymentMethod";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

const paymentMethodOptions: PaymentMethodOption[] = [
    {
        images: [
            "/assets/payment-method/visa.png",
            "/assets/payment-method/mastercard.png",
            "/assets/payment-method/jcb.png",
            "/assets/payment-method/american-express.png",
        ],
        label: "Kartu Debit/Kredit",
        value: "credit-debit",
    },
    {
        images: ["/assets/payment-method/bca.png"],
        label: "BCA Virtual Account",
        value: "bca-va",
    },
];

export const ChoosePaymentSection = () => {
    const [selectedPayment, setSeletectedPayment] = useState("");
    const selectedPlan = useAuthStore((state) => state.selectedPlan);

    // Proteksi: Jika tidak ada paket dipilih, kembalikan ke halaman subscription
    if (!selectedPlan) {
        return <Navigate to="/subscription" replace />;
    }

    return (
        <section className="px-5 pt-5 pb-10 md:px-10 md:py-8 lg:px-20 lg:py-10 lg:my-20">
            <h2 className="font-bold text-xl md:text-2xl lg:text-3xl mb-5 md:mb-8 lg:mb-10">
                Ringkasan Pembayaran
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5 md:gap-8 lg:gap-10">
                <aside>
                    <PricingCard
                        title={selectedPlan.title}
                        price={selectedPlan.price}
                        accounts={selectedPlan.accounts}
                        features={selectedPlan.features}
                    />
                </aside>

                <aside className="grid gap-4 lg:px-6">
                    <div className="grid gap-2">
                        <DetailPaymentTitle>Metode Pembayaran</DetailPaymentTitle>
                        <PaymentMethod
                            value={selectedPayment}
                            setValue={setSeletectedPayment}
                            options={paymentMethodOptions}
                        />
                    </div>

                    <div className="grid gap-4">
                        <DetailPaymentTitle>Kode Voucher (Jika Ada)</DetailPaymentTitle>
                        <div className="grid grid-cols-[1fr_max-content] gap-4">
                            <InputVoucher />
                            <Button variant="dark">Gunakan</Button>
                        </div>
                    </div>

                    <div className="grid gap-4">
                        <DetailPaymentTitle>Ringkasan Transaksi</DetailPaymentTitle>
                        <TransactionSummary
                            planTitle={selectedPlan.title}
                            planPrice={selectedPlan.rawPrice}
                        />
                        <Button to="/payment-detail" className="w-fit">
                            Bayar
                        </Button>
                    </div>
                </aside>
            </div>
        </section>
    );
};