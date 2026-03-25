import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";

interface CarouselButtonProps {
    direction: 'left' | 'right';
    onClick: () => void;
    isVisible?: boolean;
}

export const CarouselButton = ({ 
    direction, 
    onClick, 
    isVisible = true,
}: CarouselButtonProps) => {
    if (!isVisible) return null;

    const isLeft = direction === 'left';

    return (
        <button
            type='button'
            onClick={onClick}
            className={`
                hidden lg:flex absolute top-1/2 -translate-y-1/2 
                w-11 h-11 items-center justify-center 
                bg-other-body border border-[#E7E3FC] text-white 
                z-40 cursor-pointer hover:scale-110 transition-all rounded-full
                ${isLeft ? '-left-6' : '-right-6'}
            `}
        >
            {isLeft ? <IoMdArrowBack size={24} /> : <IoMdArrowForward size={24} />}
        </button>
    );
};