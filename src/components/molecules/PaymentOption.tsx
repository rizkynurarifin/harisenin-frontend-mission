import { cn } from "../../libs/cn";

export interface PaymentOption {
    label: string;
    images: string[];
    value: string;
}

interface PaymentOptionProps extends PaymentOption {
    stateValue: string;
    setStateValue?: (value: string) => void;
}

export const PaymentOption = ({
    stateValue,
    setStateValue,
    images,
    label,
    value,
}: PaymentOptionProps) => {
    const getIsActive = (optionValue: string): boolean => {
        return optionValue === stateValue;
    };

    return (
        <button
            type="button"
            key={value}
            onClick={() => setStateValue?.(value)}
            className={cn(
                "flex items-center gap-2 border rounded-md py-2 px-2.5 cursor-pointer",
                getIsActive(value) ? "border-text-light-primary" : "border-[#E0E0E0]",
            )}
        >
            <span
                id="credit-debit"
                className={cn(
                    "size-5 grow-0 shrink-0 border-2 rounded-full flex items-center justify-center",
                    getIsActive(value) ? "border-text-light-primary" : "border-[#7E8299]",
                )}
            >
                {getIsActive(value) && (
                    <span className="size-2  rounded-full bg-text-light-primary" />
                )}
            </span>
            {images.map((image) => (
                <img src={image} alt={label} className="grow-0 shrink-0 h-4" />
            ))}
            <span className="text-text-light-primary text-xs md:text-base">
                {label}
            </span>
        </button>
    );
};