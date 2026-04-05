import { cn } from "../../libs/cn";

interface CountdownBoxProps {
    value: number;
    label: string;
    className?: string;
}

export const CountdownBox = ({ value, label, className }: CountdownBoxProps) => {
    return (
        <div className={cn("bg-[#E7E3FC]/10 py-2 px-4 rounded-lg flex items-baseline", className)}>
            <span className="text-base md:text-2xl font-bold">
                {value.toString().padStart(2, "0")}
            </span>
            <span className="text-text-light-secondary text-xs md:text-lg font-medium ml-1">
                {label}
            </span>
        </div>
    );
};