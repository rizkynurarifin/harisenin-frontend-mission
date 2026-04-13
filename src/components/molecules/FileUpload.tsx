import { FormLabel } from "../atoms/FormLabel";

interface FileUploadProps {
    label: string;
    value: string;
    aspectRatio: "aspect-2/3" | "aspect-video";
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FileUpload = ({ label, value, aspectRatio, onChange }: FileUploadProps) => (
    <div className="space-y-3">
        <FormLabel>{label}</FormLabel>
        <div className={`relative group ${aspectRatio} sm:h-64 w-full bg-white/5 border border-dashed border-white/20 rounded-xl flex flex-col items-center justify-center overflow-hidden hover:border-blue-500 transition-all`}>
            {value ? (
                <img src={value} className="w-full h-full object-cover" alt="Preview" />
            ) : (
                <div className="text-center p-4">
                    <svg className="mx-auto h-8 w-8 text-secondary/50 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                    <span className="text-[9px] text-secondary uppercase font-black">Klik untuk Upload</span>
                </div>
            )}
            <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={onChange} />
        </div>
    </div>
);