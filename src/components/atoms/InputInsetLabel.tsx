import { useRef } from "react";

// Menggunakan React.InputHTMLAttributes agar semua props input standar bisa masuk
interface InputInsetLabelProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    hasEdit?: boolean;
}

export const InputInsetLabel = ({ label, hasEdit, id, ...props }: InputInsetLabelProps) => {
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <div className="relative flex items-center gap-2 w-full h-14 lg:h-16 bg-other-paper rounded-lg border border-[#e7e3fc3b] px-4 py-2">
            <div className="flex-1 flex flex-col gap-0.5">
                {/* Label Inset */}
                <span className="text-[#9d9ea1] font-semibold text-sm lg:text-base">
                    {label}
                </span>

                {/* Input Field */}
                <input
                    id={id}
                    ref={inputRef}
                    className="block w-full text-white font-medium text-base lg:text-lg bg-transparent border-0 p-0 focus:ring-0 focus:outline-none"
                    {...props}
                />
            </div>

            {/* Tombol Edit/Pensil */}
            {hasEdit && (
                <button
                    type="button"
                    onClick={() => inputRef?.current?.focus()}
                    className="p-1 cursor-pointer hover:bg-white/10 rounded-full transition-colors"
                >
                    <svg
                        className="w-5 h-5 lg:w-6 lg:h-6 shrink-0"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04Z"
                            fill="#FFFFFF"
                        />
                    </svg>
                </button>
            )}
        </div>
    );
};