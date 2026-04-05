import type { ReactNode } from "react";

interface DetailPaymentTitleProps {
    children: ReactNode;
}

export const DetailPaymentTitle = ({ children }: DetailPaymentTitleProps) => {
    return <h3 className="font-semibold text-base md:text-lg">{children}</h3>;
};