import { MovieCard } from "../molecules/MovieCard";
import { MovieCarousel } from "../organisms/MovieCarousel";
import type { Movie } from "../../const/movies";
import { MdMovie } from "react-icons/md";

interface MovieSectionProps {
    title: string;
    movies: Movie[];
    variant?: "landscape" | "portrait";
    className?: string;
    isGrid?: boolean;
    rightNode?: React.ReactNode;
}

export const MovieSection = ({
    title,
    movies,
    variant = "portrait",
    className = "",
    isGrid = false,
    rightNode,
}: MovieSectionProps) => {
    const carouselGap =
        variant === "landscape"
            ? "gap-4 md:gap-5 lg:gap-6"
            : "gap-4 md:gap-6 lg:gap-7";

    return (
        <section
            className={`text-white w-full flex flex-col items-start p-5 md:py-5 lg:py-10 md:px-10 lg:px-20 relative z-0 hover:z-50 transition-all duration-300 ${className}`}
        >
            <div className="flex flex-col md:flex-row md:items-center justify-between w-full mb-5 lg:mb-8 gap-4">
                <h3 className="text-xl lg:text-[32px] font-bold">
                    {title}
                </h3>
                {rightNode && <div>{rightNode}</div>}
            </div>

            {movies.length === 0 ? (
                <div className="w-full py-16 flex flex-col items-center justify-center border border-dashed border-gray-700 rounded-2xl bg-gray-900/20 px-4">
                    <MdMovie filter="grayscale(1)" className="text-6xl text-gray-600 mb-4" />
                    <div className="max-w-xs text-center"> {/* Pembungkus agar teks tetap di tengah dan tidak melebar */}
                        <p className="text-gray-400 font-medium text-lg leading-tight">
                            Wah, {title.toLowerCase()} masih kosong!
                        </p>
                        <p className="text-gray-500 text-sm mt-2">
                            Coba cek kategori lain atau refresh halaman.
                        </p>
                    </div>
                </div>
            ) : isGrid ? (
                <div className={`grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 ${carouselGap} w-full`}>
                    {movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} variant={variant} />
                    ))}
                </div>
            ) : (
                <MovieCarousel variant={variant} gapClass={carouselGap}>
                    {movies.map((movie) => (
                        <div
                            key={movie.id}
                            className={
                                variant === "landscape"
                                    ? "flex-none w-75 md:w-[45%] lg:w-75.5"
                                    : "flex-none w-23.75 md:w-45 lg:w-58.5"
                            }
                        >
                            <MovieCard movie={movie} variant={variant} />
                        </div>
                    ))}
                </MovieCarousel>
            )}
        </section>
    );
};