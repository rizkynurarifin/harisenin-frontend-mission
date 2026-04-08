import { Button } from "../atoms/Button";

interface PricingCardProps {
    title: string;
    price: string;
    accounts: string;
    features: string[];
    onClick?: () => void;
}

export const PricingCard = ({ title, price, accounts, features, onClick }: PricingCardProps) => {
    return (
        <article className="flex flex-col items-center gap-6 lg:gap-9.5 rounded-xl p-6 bg-[linear-gradient(286.17deg,#192DB7_0%,#5370D4_100%)]">
            <div className="flex flex-col gap-6 w-full grow">
                <span className="inline-flex self-start items-center px-5 py-2.5 rounded-3xl bg-other-extra text-text-light-primary font-semibold text-base lg:text-lg">
                    {title}
                </span>

                <div className="flex flex-col gap-1 text-left">
                    <p className="text-white text-xs lg:text-sm">Mulai dari {price}</p>
                    <p className="text-white text-xs lg:text-sm">{accounts}</p>
                </div>

                <div className="flex flex-col gap-2">
                    {features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <svg className="w-5 h-5 shrink-0" viewBox="0 0 20 20" fill="none">
                                <path d="M4 10L8 14L16 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span className="text-white text-xs lg:text-sm">{feature}</span>
                        </div>
                    ))}
                </div>
            </div>

            <hr className="w-full border-[#e7e3fc3b]" />

            <div className="flex flex-col items-center gap-1">
                <Button
                    onClick={onClick}
                    className="w-full bg-white text-primary-300! hover:bg-white/90 py-2.5"
                >
                    Langganan
                </Button>
                <span className="text-white text-xs">
                    Syarat dan Ketentuan Berlaku
                </span>
            </div>
        </article>
    );
};