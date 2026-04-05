import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const twMergeExtended = extendTailwindMerge({
    extend: {
        classGroups: {
            "font-size": ["text-mini"],
        },
    },
});

export function cn(...inputs: ClassValue[]) {
    return twMergeExtended(clsx(inputs));
}