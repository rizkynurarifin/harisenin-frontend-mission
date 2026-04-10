import { useEffect, useMemo } from "react";
import { HeroSection } from "../components/organisms/HeroSection";
import { MovieSection } from "../components/templates/MovieSection";
import { useMovieStore } from "../store/useMovieStore";
import { PageSkeleton } from "../components/templates/PageSkeleton";

const Movies = () => {
    const { movies, fetchMovies, isLoading } = useMovieStore();

    useEffect(() => {
        if (movies.length === 0) {
            fetchMovies();
        }
    }, [fetchMovies, movies.length]);

    const allMovies = useMemo(() =>
        movies.filter((m) => m.type?.toLowerCase() === "movie"),
        [movies]);

    const continueWatching = useMemo(() =>
        allMovies
            .filter((m) => (m.progress ?? 0) > 0)
            .slice(0, 6),
        [allMovies]);

    const chillExclusiveMovies = useMemo(() =>
        allMovies
            .filter((m) => m.isPremium)
            .slice(0, 6),
        [allMovies]);

    const topRating = useMemo(() =>
        [...allMovies]
            .sort((a, b) => b.rating - a.rating)
            .slice(0, 6),
        [allMovies]);

    const trending = useMemo(() =>
        allMovies
            .filter((m) => m.isTop10)
            .slice(0, 6),
        [allMovies]);

    const newRelease = useMemo(() =>
        allMovies
            .filter((m) => m.year >= 2023)
            .slice(0, 6),
        [allMovies]);

    if (isLoading) {
        return <PageSkeleton withGenre={true} />;
    }

    return (
        <>
            <HeroSection withGenre />

            {continueWatching.length > 0 && (
                <MovieSection
                    title="Melanjutkan Tonton Film"
                    movies={continueWatching}
                    variant="landscape"
                    className="bg-other-page-header -mt-1"
                />
            )}

            <MovieSection
                title="Film Persembahan Chill"
                movies={chillExclusiveMovies}
                variant="portrait"
            />

            <MovieSection
                title="Top Rating Film Hari ini"
                movies={topRating}
                variant="portrait"
            />

            <MovieSection
                title="Film Trending"
                movies={trending}
                variant="portrait"
            />

            <MovieSection
                title="Rilis Baru"
                movies={newRelease}
                variant="portrait"
            />
        </>
    );
};

export default Movies;