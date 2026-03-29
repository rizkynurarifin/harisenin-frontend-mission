import { MovieCard } from "../molecules/MovieCard";
import { MovieCarousel } from "../organisms/MovieCarousel";
import type { Movie } from "../../const/movies";

interface MovieSectionProps {
    title: string;
    movies: Movie[];
    variant?: "landscape" | "portrait";
    className?: string;
    isGrid?: boolean;
}

export const MovieSection = ({
    title,
    movies,
    variant = "portrait",
    className = "",
    isGrid = false,
}: MovieSectionProps) => {
    const carouselGap =
        variant === "landscape"
            ? "gap-4 md:gap-5 lg:gap-6"
            : "gap-4 md:gap-6 lg:gap-7";

    return (
        <section
            className={`text-white w-full flex flex-col items-start p-5 md:py-5 lg:py-10 md:px-10 lg:px-20 relative z-0 hover:z-50 transition-all duration-300 ${className}`}
        >
            <h3 className="text-xl lg:text-[32px] font-bold mb-5 lg:mb-8 w-full">
                {title}
            </h3>

            {isGrid ? (
                <div
                    className={`grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 ${carouselGap} w-full`}
                >
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