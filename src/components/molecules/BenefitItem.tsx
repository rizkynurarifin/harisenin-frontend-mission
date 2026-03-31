interface BenefitItemProps {
    icon: React.ReactNode;
    text: string;
    variant?: 'default' | 'compact';
}

export const BenefitItem = ({ icon, text, variant = 'default' }: BenefitItemProps) => {
    const isCompact = variant === 'compact';

    return (
        <div className="flex flex-col items-center gap-6">
            <div className="text-white">
                {icon}
            </div>
            <p className={`
                text-[#c1c2c4] font-medium text-center whitespace-pre-line
                ${isCompact
                    ? 'text-xs lg:text-sm'
                    : 'lg:font-bold text-sm lg:text-xl'
                }
            `}>
                {text}
            </p>
        </div>
    );
};