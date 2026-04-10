// src/components/atoms/SkeletonCard.tsx
export const SkeletonCard = ({ variant }: { variant: 'landscape' | 'portrait' }) => {
    const cardSizeClass = variant === 'landscape'
        ? 'w-full aspect-video'
        : 'w-full aspect-[2/3]';

    return (
        <div className={`relative bg-gray-800 animate-pulse rounded md:rounded-lg overflow-hidden ${cardSizeClass}`}>
            {variant === 'landscape' && (
                <div className="absolute bottom-0 left-0 w-full p-3 md:p-4 flex justify-between items-end">
                    <div className="h-4 w-2/3 bg-gray-700 rounded"></div>
                    <div className="h-4 w-8 bg-gray-700 rounded"></div>
                </div>
            )}
        </div>
    );
};