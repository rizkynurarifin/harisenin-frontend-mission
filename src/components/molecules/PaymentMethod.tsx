import { PaymentOption } from "./PaymentOption";

export interface PaymentMethodOption {
    label: string;
    images: string[];
    value: string;
}

interface PaymentMethodProps {
    value: string;
    options: PaymentMethodOption[];
    setValue: (value: string) => void;
}

export const PaymentMethod = ({
    options,
    value,
    setValue,
}: PaymentMethodProps) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {options.map((option) => (
                <PaymentOption
                    images={option.images}
                    label={option.label}
                    setStateValue={setValue}
                    stateValue={value}
                    value={option.value}
                />
            ))}
        </div>
    );
};