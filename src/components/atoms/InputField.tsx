import { useState } from 'react';
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5"

interface InputFieldProps {
    label: string;
    type: 'text' | 'password';
    placeholder: string;
    id: string;
    className?: string;
}

export const InputField = ({ label, type, placeholder, id, className = "mb-5 lg:mb-9.25" }: InputFieldProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';

    return (
        <div className={`w-full relative text-left ${className}`}>
            <label htmlFor={id} className="block text-white text-[10px] lg:text-lg font-medium mb-1 lg:mb-1.5 opacity-80">
                {label}
            </label>
            <div className="relative">
                <input
                    id={id}
                    type={isPassword ? (showPassword ? 'text' : 'password') : 'text'}
                    placeholder={placeholder}
                    className="w-full bg-transparent border border-[#E7E3FC] rounded-xl lg:rounded-3xl px-3 lg:px-5 py-2 lg:py-3.5 text-[10px] lg:text-base text-text-light-secondary focus:outline-none transition-all placeholder:opacity-50"
                />

                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 lg:right-5 top-1/2 -translate-y-1/2 text-text-light-secondary hover:text-white transition-colors"
                    >
                        {showPassword ? (
                            <IoEyeOutline size={18} className="lg:w-6 lg:h-6" />
                        ) : (
                            <IoEyeOffOutline size={18} className="lg:w-6 lg:h-6" />
                        )}
                    </button>
                )}
            </div>
        </div>
    );
};