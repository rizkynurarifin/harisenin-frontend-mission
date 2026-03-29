import { Button } from "../atoms/Button";

export const ProfileHeader = () => {
    return (
        <div className="flex items-center gap-6">
            <div className="size-20 lg:size-35 rounded-full overflow-hidden shrink-0">
                <div className="w-full h-full bg-greyscale-700">
                    <img
                        src="src\assets\my-profile.jpeg"
                        alt="Profile"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
            <div className="flex flex-col justify-center gap-2">
                <div className="relative">
                    <Button
                        variant="outline"
                        className="text-sm lg:text-base relative"
                        type="button"
                    >
                        <span>Ubah Foto</span>
                        <input
                            type="file"
                            accept="image/*"
                            className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
                        />
                    </Button>
                </div>
                <div className="flex items-center gap-1">
                    <svg className="size-6 shrink-0" viewBox="0 0 24 24" fill="none">
                        <path
                            d="M14 2H6C4.89 2 4 2.89 4 4V20C4 21.11 4.89 22 6 22H18C19.11 22 20 21.11 20 20V8L14 2ZM18 20H6V4H13V9H18V20ZM8 17L10.38 13.81L12 15.94L14.62 12.5L18 17H8Z"
                            fill="#c1c2c4"
                        />
                    </svg>
                    <span className="text-[#c1c2c4] text-xs lg:text-sm">
                        Maksimal 2MB
                    </span>
                </div>
            </div>
        </div>
    );
};