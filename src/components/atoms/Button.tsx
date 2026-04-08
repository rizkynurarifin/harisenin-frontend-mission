import React from 'react';
import { NavLink } from 'react-router-dom';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'dark' | 'light';
    children: React.ReactNode;
    to?: string;
}

export const Button = ({
    variant = 'primary',
    children,
    className = "",
    to,
    ...props
}: ButtonProps) => {

    const baseStyle = "flex items-center justify-center px-5 lg:px-6.5 py-2 lg:py-2.5 rounded-full font-bold transition-all duration-300 overflow-hidden text-xs lg:text-base";

    const variants = {
        primary: "bg-primary-400 text-white hover:bg-primary-500 cursor-pointer",
        secondary: "bg-[#181A1C] border border-white/20 text-white hover:bg-white/10 cursor-pointer",
        outline: "border border-primary-default text-primary-default hover:bg-primary-default hover:text-white cursor-pointer",
        dark: "bg-other-body text-white hover:bg-greyscale-800 cursor-pointer",
        light: "bg-text-light-secondary text-primary-300 cursor-default"
    };

    const combinedClass = `${baseStyle} ${variants[variant]} ${className}`;

    if (to) {
        return (
            <NavLink to={to} className={combinedClass}>
                {children}
            </NavLink>
        );
    }

    return (
        <button className={combinedClass} {...props}>
            {children}
        </button>
    );
};