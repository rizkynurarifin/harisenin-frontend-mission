import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "../atoms/Button";
import { DetailPaymentTitle } from "../atoms/DetailPaymentTitle";
import { PaymentOption } from "../molecules/PaymentOption";
import { PricingCard } from "../molecules/PricingCard";
import { TransactionSummary } from "../molecules/TransactionSummary";
import { useAuthStore } from "../../store/useAuthStore";
import axiosInstance from "../../services/api/axiosInstance";

export const PaymentSummarySection = () => {
    const { orderId } = useParams<{ orderId: string }>();
    const navigate = useNavigate();
    const setPremium = useAuthStore((state) => state.setPremium);
    const user = useAuthStore((state) => state.user);
    
    const [orderData, setOrderData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isPaying, setIsPaying] = useState(false);

    useEffect(() => {
        const fetchOrder = async () => {
            if (!user) return;
            try {
                const response = await axiosInstance.get(`/plans/order/${orderId}`, {
                    params: { userId: user.id }
                });
                setOrderData(response.data);
            } catch (error) {
                alert("Order tidak ditemukan!");
                navigate("/subscription");
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrder();
    }, [orderId, user, navigate]);

    if (isLoading) {
        return <p className="text-white text-center py-20">Memuat detail pesanan...</p>;
    }

    if (!orderData) {
        return null;
    }

    const handlePaymentAction = async () => {
        try {
            setIsPaying(true);
            await axiosInstance.post(`/plans/order/${orderId}/pay`, { userId: user?.id });
            
            setPremium(true);
            alert("Pembayaran Berhasil! Selamat menonton konten Premium.");
            navigate("/profile");
        } catch (error: any) {
            alert(error.response?.data?.message || "Pembayaran gagal.");
        } finally {
            setIsPaying(false);
        }
    };

    const getFormattedDate = () => {
        const date = new Date(orderData.created_at);
        return new Intl.DateTimeFormat("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        }).format(date);
    };

    const copyCodeToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(orderData.payment_code);
            alert("Kode berhasil disalin!");
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
                        title={orderData.plan_name}
                        price={`Rp${Number(orderData.price).toLocaleString('id-ID')}/bulan`}
                        accounts={orderData.account_count > 1 ? `${orderData.plan_id === 3 ? '5-7' : orderData.account_count} Akun` : '1 Akun'}
                        features={orderData.plan_features}
                    />
                </aside>
                <aside className="grid gap-4 lg:gap-7 lg:px-6">
                    <div className="space-y-2 grid grid-cols-1">
                        <DetailPaymentTitle>Metode Pembayaran</DetailPaymentTitle>
                        <PaymentOption
                            stateValue={orderData.payment_method}
                            value={orderData.payment_method}
                            images={
                                orderData.payment_method === 'bca-va' 
                                ? ["/assets/payment-method/bca.png"] 
                                : ["/assets/payment-method/visa.png", "/assets/payment-method/mastercard.png"]
                            }
                            label={orderData.payment_method === 'bca-va' ? "BCA Virtual Account" : "Kartu Debit/Kredit"}
                        />
                        <ul className="mt-2 space-y-2 text-xs md:text-base">
                            <li className="flex items-center gap-2">
                                <span className="text-text-light-secondary">
                                    Tanggal Pembelian
                                </span>
                                <span className="text-text-light-primary text-right ml-auto">
                                    {getFormattedDate()}
                                </span>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-text-light-secondary">
                                    Kode Pembayaran
                                </span>
                                <span className="text-text-light-primary text-right ml-auto font-bold tracking-wider text-primary">
                                    {orderData.payment_code}
                                </span>
                                <button
                                    onClick={copyCodeToClipboard}
                                    className="cursor-pointer"
                                    title="Salin Kode"
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
                        <TransactionSummary
                            planTitle={orderData.plan_name}
                            planPrice={orderData.total_amount - 3000} 
                        />
                    </div>
                    <div className="space-y-2">
                        <DetailPaymentTitle>Tata Cara Pembayaran</DetailPaymentTitle>
                        <ol className="text-text-light-secondary list-decimal pl-3 md:pl-0 md:list-inside text-xs md:text-base">
                            <li>
                                Buka aplikasi Mobile Banking atau Internet Banking Anda.
                            </li>
                            <li>Login ke akun Anda.</li>
                            <li>Pilih menu "Transfer" atau "Pembayaran".</li>
                            <li>
                                Masukkan kode pembayaran <span className="font-bold">{orderData.payment_code}</span>.
                            </li>
                            <li>
                                Konfirmasikan jumlah pembayaran Rp. {orderData.total_amount.toLocaleString('id-ID')}.
                            </li>
                        </ol>
                    </div>
                    <div>
                        <Button onClick={handlePaymentAction} disabled={isPaying || orderData.status === 'success'}>
                            {isPaying ? 'Memproses...' : orderData.status === 'success' ? 'Sudah Dibayar' : 'Konfirmasi Bayar'}
                        </Button>
                    </div>
                </aside>
            </div>
        </section>
    );
};