export const ProfileSkeleton = () => {
    return (
        <div className="flex flex-col gap-5 lg:gap-8 px-5 py-5 lg:px-20 lg:py-10 w-full animate-pulse">
            <div className="h-8 w-48 bg-other-paper rounded-md hidden lg:block mb-4" />

            <div className="flex flex-col-reverse lg:flex-row gap-5 lg:gap-20 w-full">
                <div className="flex flex-col gap-8 w-full flex-1">
                    <div className="flex items-center gap-6">
                        <div className="size-20 lg:size-35 rounded-full bg-other-paper" />
                        <div className="flex flex-col gap-2">
                            <div className="h-10 w-28 bg-other-paper rounded-md" />
                            <div className="h-4 w-20 bg-other-paper rounded-md" />
                        </div>
                    </div>

                    <div className="flex flex-col gap-8">
                        <div className="h-14 lg:h-16 w-full bg-other-paper rounded-lg" />
                        <div className="h-14 lg:h-16 w-full bg-other-paper rounded-lg" />
                        <div className="h-14 lg:h-16 w-full bg-other-paper rounded-lg" />
                    </div>

                    <div className="h-12 w-32 bg-other-paper rounded-md hidden lg:block" />
                </div>

                <div className="flex-1">
                    <div className="h-48 lg:h-56 w-full bg-other-paper rounded-xl" />
                </div>
            </div>

            <div className="mt-10">
                <div className="h-8 w-40 bg-other-paper rounded-md mb-6" />
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="aspect-2/3 w-full bg-other-paper rounded-lg" />
                    ))}
                </div>
            </div>
        </div>
    );
};