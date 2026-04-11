import { useEffect, useMemo } from "react";
import { HeroSection } from "../components/organisms/HeroSection";
import { MovieSection } from "../components/templates/MovieSection";
import { useMovieStore } from "../store/useMovieStore";
import { PageSkeleton } from "../components/templates/PageSkeleton";
import { ServerError } from "./ServerError";

const Movies = () => {
    const { movies, fetchMovies, isLoading, error } = useMovieStore();

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

    if (isLoading && allMovies.length === 0) {
        return <PageSkeleton withGenre={true} />;
    }

    if (error && allMovies.length === 0) {
        return <ServerError message={error} onRetry={fetchMovies} />;
    }

    return (
        <>
            <HeroSection withGenre movie={trending[0] || allMovies[0]} />

            {continueWatching.length > 0 && (
                <MovieSection
                    title="Melanjutkan Tonton Film"
                    movies={continueWatching}
                    variant="landscape"
                    className="bg-other-page-header -mt-1"
                />
            )}

            {chillExclusiveMovies.length > 0 && (
                <MovieSection
                    title="Film Persembahan Chill"
                    movies={chillExclusiveMovies}
                    variant="portrait"
                />
            )}

            {topRating.length > 0 && (
                <MovieSection
                    title="Top Rating Film Hari ini"
                    movies={topRating}
                    variant="portrait"
                />
            )}

            {trending.length > 0 && (
                <MovieSection
                    title="Film Trending"
                    movies={trending}
                    variant="portrait"
                />
            )}

            <MovieSection
                title="Rilis Baru"
                movies={newRelease}
                variant="portrait"
            />
        </>
    );
};

export default Movies;