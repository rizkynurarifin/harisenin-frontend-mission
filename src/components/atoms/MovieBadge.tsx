interface MovieBadgeProps {
    type: 'premium' | 'new-episode' | 'top-10';
    isLandscape: boolean;
}

export const MovieBadge = ({ type, isLandscape }: MovieBadgeProps) => {
    const baseClasses = "flex justify-center items-center border rounded-xl sm:rounded-3xl shadow-md leading-none";

    if (type === 'premium') {
        const size = isLandscape
            ? 'w-[68px] h-[25px] sm:w-[78px] sm:h-[28px] text-[12px] sm:text-sm'
            : 'w-[37.56px] h-[14px] sm:w-[78px] sm:h-[28px] text-[5.74px] sm:text-sm';

        return (
            <span className={`${baseClasses} border-warning-pressed bg-warning-pressed text-text-light-primary ${size}`}>
                Premium
            </span>
        );
    }

    if (type === 'new-episode') {
        const size = isLandscape
            ? 'w-[93px] h-[25px] sm:w-[104px] sm:h-[28px] text-[12px] sm:text-sm'
            : 'w-[44.56px] h-[14px] sm:w-[104px] sm:h-[28px] text-[5.74px] sm:text-sm';

        return (
            <span className={`${baseClasses} border-primary-300 bg-primary-300 text-text-light-primary ${size}`}>
                Episode Baru
            </span>
        );
    }

    if (type === 'top-10') {
        const size = isLandscape
            ? 'w-[24px] h-[36px] sm:w-8 sm:h-12 text-[10px] sm:text-sm'
            : 'w-3.7 h-5.5 sm:w-8 sm:h-12 text-[5.74px] sm:text-sm';

        return (
            <span className={`flex flex-col justify-center items-center text-center p-1 gap-1 absolute right-1.25 sm:right-2.5 top-0 bg-error-pressed rounded-tr-xs sm:rounded-tr rounded-bl-xs sm:rounded-bl z-10 font-bold text-white leading-none ${size}`}>
                <span>Top</span>
                <span>10</span>
            </span>
        );
    }

    return null;
};