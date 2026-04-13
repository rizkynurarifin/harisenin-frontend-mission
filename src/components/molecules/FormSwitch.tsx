import { FormLabel } from "../atoms/FormLabel";

interface FormSwitchProps {
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    activeColor?: string;
}

export const FormSwitch = ({ label, checked, onChange, activeColor = "bg-blue-600" }: FormSwitchProps) => (
    <label className="flex items-center gap-3 cursor-pointer group">
        <div className="relative">
            <input
                type="checkbox"
                className="sr-only"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
            />
            {/* Track */}
            <div className={`w-10 h-5 rounded-full transition-colors ${checked ? activeColor : 'bg-white/10'}`}></div>
            {/* Thumb/Circle */}
            <div className={`absolute top-1 left-1 w-3 h-3 rounded-full bg-white transition-transform ${checked ? 'translate-x-5' : 'translate-x-0'}`}></div>
        </div>
        <FormLabel>{label}</FormLabel>
    </label>
);