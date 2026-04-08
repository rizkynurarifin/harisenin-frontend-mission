interface TransactionSummaryProps {
    planTitle: string;
    planPrice: number;
}
export const TransactionSummary = ({ planTitle, planPrice }: TransactionSummaryProps) => {
    const adminFee = 3000;
    const totalPrice = planPrice + adminFee;

    const formatIDR = (amount: number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(amount).replace("Rp", "Rp.");
    };

    return (
        <ul className="space-y-2">
            <li className="flex items-center gap-2 justify-between text-xs md:text-base">
                <span className="text-text-light-secondary">
                    Paket Premium {planTitle}
                </span>
                <span className="text-text-light-primary">
                    {formatIDR(planPrice)}
                </span>
            </li>
            <li className="flex items-center gap-2 justify-between text-xs md:text-base">
                <span className="text-text-light-secondary">Biaya Admin</span>
                <span className="text-text-light-primary">
                    {formatIDR(adminFee)}
                </span>
            </li>
            <li className="flex items-center gap-2 justify-between font-semibold text-sm md:text-lg border-t border-gray-100 pt-2">
                <span className="text-text-light-secondary">Total Pembayaran</span>
                <span className="text-text-light-primary">
                    {formatIDR(totalPrice)}
                </span>
            </li>
        </ul>
    );
};