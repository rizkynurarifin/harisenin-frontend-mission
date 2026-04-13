import { FormLabel } from "../atoms/FormLabel";
import { FormInput } from "../atoms/FormInput";

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> {
    label: string;
    as?: 'input' | 'select' | 'textarea';
    rows?: number;
}

export const FormField = ({ label, ...props }: FormFieldProps) => (
    <div className="space-y-2">
        <FormLabel>{label}</FormLabel>
        <FormInput {...props} />
    </div>
);