export const TableSkeleton = () => {
    return (
        <div className="p-4 md:p-10 lg:px-20 bg-other-page-header min-h-screen animate-pulse">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div className="space-y-2">
                    <div className="h-8 w-48 bg-white/10 rounded-md"></div>
                    <div className="h-4 w-32 bg-white/5 rounded-md"></div>
                </div>
                <div className="h-10 w-full md:w-48 bg-white/10 rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="h-10 bg-white/5 border border-white/10 rounded-lg"></div>
                ))}
            </div>

            <div className="overflow-hidden bg-[#222426] rounded-xl border border-white/5 shadow-2xl">
                <div className="hidden md:block border-b border-white/10 bg-white/5">
                    <div className="flex p-5">
                        <div className="w-[45%] h-4 bg-white/10 rounded-md"></div>
                        <div className="w-[15%] h-4 bg-white/10 rounded-md mx-auto max-w-12.5"></div>
                        <div className="w-[10%] h-4 bg-white/10 rounded-md mx-auto max-w-10"></div>
                        <div className="w-[15%] h-4 bg-white/10 rounded-md mx-auto max-w-15"></div>
                        <div className="w-[15%] h-4 bg-white/10 rounded-md mx-auto max-w-15"></div>
                    </div>
                </div>

                <div className="divide-y divide-white/5">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i}>
                            <div className="hidden md:flex p-5 items-center">
                                <div className="w-[45%] flex items-center gap-4">
                                    <div className="w-12 h-16 bg-white/10 rounded-md shrink-0"></div>
                                    <div className="h-5 w-full bg-white/5 rounded"></div>
                                </div>

                                <div className="w-[15%] flex justify-center">
                                    <div className="h-6 w-16 bg-white/10 rounded-full"></div>
                                </div>

                                <div className="w-[10%] flex justify-center">
                                    <div className="h-5 w-10 bg-white/5 rounded"></div>
                                </div>

                                <div className="w-[15%] flex justify-center gap-1">
                                    <div className="h-4 w-10 bg-white/5 rounded"></div>
                                    <div className="h-4 w-10 bg-white/5 rounded"></div>
                                </div>
                                
                                <div className="w-[15%] flex justify-center gap-3">
                                    <div className="w-8 h-8 bg-white/5 rounded-lg"></div>
                                    <div className="w-8 h-8 bg-white/5 rounded-lg"></div>
                                </div>
                            </div>

                            {/* Mobile Card Skeleton */}
                            <div className="md:hidden p-4 flex flex-col gap-4">
                                <div className="flex items-start gap-4">
                                    <div className="w-20 h-28 bg-white/10 rounded-lg shrink-0"></div>
                                    <div className="flex-1 space-y-3">
                                        <div className="flex justify-between items-start">
                                            <div className="h-4 w-3/4 bg-white/10 rounded"></div>
                                            <div className="h-4 w-10 bg-white/5 rounded-full"></div>
                                        </div>
                                        <div className="h-3 w-1/4 bg-white/5 rounded"></div>
                                        <div className="flex gap-1 mt-4">
                                            <div className="h-4 w-12 bg-white/5 rounded"></div>
                                            <div className="h-4 w-12 bg-white/5 rounded"></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <div className="flex-1 h-9 bg-white/5 rounded-lg"></div>
                                    <div className="flex-1 h-9 bg-white/5 rounded-lg"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};