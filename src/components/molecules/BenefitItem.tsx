interface BenefitItemProps {
    icon: React.ReactNode;
    text: string;
}

export const BenefitItem = ({ icon, text }: BenefitItemProps) => {
    return (
        <div className="flex flex-col items-center gap-6">
            <div className="text-white">
                {icon}
            </div>
            <p className="text-[#c1c2c4] font-medium lg:font-bold text-sm lg:text-xl text-center whitespace-pre-line">
                {text}
            </p>
        </div>
    );
};