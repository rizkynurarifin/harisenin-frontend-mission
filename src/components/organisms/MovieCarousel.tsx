import { type ReactNode, useState, useRef, useLayoutEffect } from "react"
import { CarouselButton } from "../atoms/CarouselButton";

interface MovieCarouselProps {
    children: ReactNode;
    gapClass?: string;
}

export const MovieCarousel = ({ children, gapClass = 'lg:gap-7' }: MovieCarouselProps) => {
    const [translateX, setTranslateX] = useState(0);
    const [isAtEnd, setIsAtEnd] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const getPreciseMaxScroll = () => {
        if (!containerRef.current) return 0;
        const container = containerRef.current;

        // Gunakan getBoundingClientRect untuk akurasi sub-pixel di mobile
        const viewPortWidth = container.parentElement?.getBoundingClientRect().width || 0;
        const scrollWidth = container.scrollWidth;

        // Jika isi carousel lebih kecil dari layar, tidak perlu scroll (maxScroll = 0)
        if (scrollWidth <= viewPortWidth) return 0;

        // Nilai maksimal geser ke kiri adalah selisih lebar konten dan lebar layar
        return -(scrollWidth - viewPortWidth);
    };

    useLayoutEffect(() => {
        const updateStatus = () => {
            const maxScroll = getPreciseMaxScroll();
            setIsAtEnd(translateX <= maxScroll + 5);
        };

        updateStatus();

        window.addEventListener('resize', updateStatus);
        return () => window.removeEventListener('resize', updateStatus);
    }, [translateX, children]);

    const handleSlide = (direction: 'right' | 'left') => {
        if (containerRef.current) {
            const container = containerRef.current;
            const maxScroll = getPreciseMaxScroll();

            const firstItem = container.firstElementChild as HTMLElement;
            if (!firstItem) return;

            const itemWidth = firstItem.getBoundingClientRect().width;
            const style = window.getComputedStyle(container);
            const gap = parseFloat(style.columnGap) || 0;
            const slideAmount = itemWidth + gap;

            if (direction === "left") {
                setTranslateX((prev) => {
                    const next = prev + slideAmount;
                    return next > 0 ? 0 : next;
                });
            } else {
                setTranslateX((prev) => {
                    const next = prev - slideAmount;
                    // Kunci agar berhenti tepat di kartu terakhir
                    return next <= maxScroll ? maxScroll : next;
                });
            }
        }
    };

    return (
        <div className='relative w-full lg:group'>

            <CarouselButton
                direction="left"
                onClick={() => handleSlide("left")}
                isVisible={translateX < 0}
            />
            <CarouselButton
                direction="right"
                onClick={() => handleSlide("right")}
                isVisible={!isAtEnd}
            />

            <div className="w-full overflow-hidden overflow-x-auto sm:overflow-x-hidden">
                <div
                    ref={containerRef}
                    className={`flex ${gapClass} transition-transform duration-500 ease-out`}
                    style={{ transform: `translateX(${translateX}px)` }}
                >
                    {children}
                </div>
            </div>
        </div>
    )
}