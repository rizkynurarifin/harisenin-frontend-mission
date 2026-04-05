import { CountdownPayment } from "../components/molecules/CountdownPayment";
import { PaymentSummarySection } from "../components/organisms/PaymentSummarySection";

export const PaymentDetail = () => {
    return (
        <div className="p-5 md:px-10 md:py-8 lg:px-20 lg:py-10 space-y-5 md:space-y-9">
            <CountdownPayment />
            <PaymentSummarySection />
        </div>
    );
};