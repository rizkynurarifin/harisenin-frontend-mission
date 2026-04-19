import React from 'react';

interface ControlButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    className?: string;
}

export const ControlButton = ({
    children,
    className = "",
    ...props
}: ControlButtonProps) => {
    return (
        <button
            type="button"
            className={`
                flex items-center justify-center
                p-0 bg-transparent border-none
                cursor-pointer hover:scale-110 hover:brightness-125
                active:scale-90 active:brightness-75
                transition-all duration-150 ease-out
                outline-none disabled:opacity-50
                disabled:cursor-not-allowed
                ${className}
            `}
            {...props}
        >
            {children}
        </button>
    );
};