interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> {
    as?: 'input' | 'select' | 'textarea';
}

export const FormInput = ({ className, as = 'input', ...props }: FormInputProps) => {
    const baseClass = "w-full bg-white/5 border border-white/10 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all text-white placeholder:text-white/20";

    // Gunakan React.ElementType untuk menghindari 'any'
    const Component = as as React.ElementType;

    return (
        <Component
            className={`${baseClass} ${className}`}
            {...(props as React.ComponentPropsWithoutRef<typeof Component>)}
        />
    );
};