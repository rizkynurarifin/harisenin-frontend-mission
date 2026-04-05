export const TransactionSummary = () => {
    return (
        <ul className="space-y-2">
            <li className="flex items-center gap-2 justify-between text-xs md:text-base">
                <span className="text-text-light-secondary">
                    Paket Premium Individual
                </span>
                <span className="text-text-light-primary">Rp.49.000</span>
            </li>
            <li className="flex items-center gap-2 justify-between text-xs md:text-base">
                <span className="text-text-light-secondary">Biaya Admin</span>
                <span className="text-text-light-primary">Rp.3.000</span>
            </li>
            <li className="flex items-center gap-2 justify-between font-semibold text-sm md:text-lg">
                <span className="text-text-light-secondary">Total Pembayaran</span>
                <span className="text-text-light-primary">Rp.52.000</span>
            </li>
        </ul>
    );
};