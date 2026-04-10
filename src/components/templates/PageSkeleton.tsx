interface PageSkeletonProps {
    isGrid?: boolean;
    title?: string;
    withGenre?: boolean;
}

export const PageSkeleton = ({ isGrid = false, title = "Daftar Saya", withGenre = false }: PageSkeletonProps) => {
    return (
        <div className={`bg-background min-h-screen w-full flex flex-col gap-0 animate-pulse ${isGrid ? 'pt-24' : ''}`}>
            {!isGrid && (
                <section className='relative w-full h-75 md:h-100 lg:h-146.75 flex flex-col justify-end overflow-hidden bg-other-paper/50'>

                    <div className='absolute z-20 w-full bottom-5 md:bottom-10 lg:bottom-14 left-0 px-6 md:px-10 lg:px-20 flex flex-col gap-3 lg:gap-10'>

                        {/* Genre Selector */}
                        {withGenre && (
                            <div>
                                <div className="h-10 w-32 bg-other-paper rounded-lg hidden sm:block" />
                            </div>
                        )}

                        {/* Title & Description */}
                        <div className='flex flex-col items-start gap-3 lg:gap-5 md:max-w-125 lg:max-w-167 w-full'>
                            <div className='h-8 md:h-12 lg:h-16 bg-other-paper rounded-md w-3/4' />
                            <div className='flex flex-col gap-2 w-full'>
                                <div className='h-4 md:h-6 bg-other-paper rounded w-full' />
                                <div className='h-4 md:h-6 bg-other-paper rounded w-2/3' />
                            </div>
                        </div>

                        {/* Actions */}
                        <div className='flex justify-between items-center w-full'>
                            <div className='flex items-center gap-2 lg:gap-4'>
                                <div className='h-9 md:h-13 w-20 md:w-28 bg-other-paper rounded-3xl' />
                                <div className='h-9 md:h-13 w-32 md:w-44 bg-other-paper rounded-3xl' />
                                <div className='size-9 md:size-13 bg-other-paper rounded-full' />
                            </div>
                            <div className='size-9 md:size-13 bg-other-paper rounded-full' />
                        </div>
                    </div>

                    <div className="absolute inset-0 bg-linear-to-t from-background via-[#101213db] to-transparent z-10 pointer-events-none"></div>
                </section>
            )}

            <div className="flex flex-col">
                {isGrid ? (
                    <SectionSkeleton title={title} variant="portrait" isGrid={true} />
                ) : (
                    <>
                        <SectionSkeleton title="Melanjutkan Tonton" variant="landscape" />
                        <SectionSkeleton title="Top Rating" variant="portrait" />
                        <SectionSkeleton title="Sedang Tren" variant="portrait" />
                    </>
                )}
            </div>
        </div>
    );
};

const SectionSkeleton = ({ title, variant, isGrid = false }: { title: string; variant: 'landscape' | 'portrait'; isGrid?: boolean }) => {
    const carouselGap = variant === "landscape" ? "gap-4 md:gap-5 lg:gap-6" : "gap-4 md:gap-6 lg:gap-7";

    return (
        <div className="p-5 md:py-5 lg:py-10 md:px-10 lg:px-20 w-full">
            <div className="h-8 lg:h-10 bg-other-paper rounded-md w-64 mb-5 lg:mb-8 flex items-center px-2">
                <span className="text-transparent text-sm select-none">{title}</span>
            </div>

            {isGrid ? (
                <div className={`grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 ${carouselGap} w-full`}>
                    {[...Array(12)].map((_, i) => (
                        <div key={i} className="w-full aspect-2/3 bg-other-paper rounded md:rounded-lg" />
                    ))}
                </div>
            ) : (
                <div className="flex gap-4 md:gap-6 lg:gap-7 overflow-hidden">
                    {[...Array(6)].map((_, i) => (
                        <div
                            key={i}
                            className={variant === 'landscape' ? "flex-none w-75 md:w-[45%] lg:w-75.5 aspect-video" : "flex-none w-23.75 md:w-45 lg:w-58.5 aspect-2/3"}
                        >
                            <div className="w-full h-full bg-other-paper rounded md:rounded-lg" />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};