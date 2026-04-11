import { useEffect, useMemo } from "react";
import { HeroSection } from "../components/organisms/HeroSection";
import { MovieSection } from "../components/templates/MovieSection";
import { useMovieStore } from "../store/useMovieStore";
import { PageSkeleton } from "../components/templates/PageSkeleton";
import { ServerError } from "./ServerError";

const Series = () => {
    const { movies, fetchMovies, isLoading, error } = useMovieStore();

    useEffect(() => {
        if (movies.length === 0) {
            fetchMovies();
        }
    }, [fetchMovies, movies.length]);

    const allSeries = useMemo(() =>
        movies.filter((m) => m.type?.toLowerCase() === "series"),
        [movies]);

    const continueWatching = useMemo(() =>
        allSeries
            .filter((m) => (m.progress ?? 0) > 0)
            .slice(0, 6),
        [allSeries]);

    const chillExclusiveSeries = useMemo(() =>
        allSeries
            .filter((m) => m.isPremium)
            .slice(0, 6),
        [allSeries]);

    const topRating = useMemo(() =>
        [...allSeries]
            .sort((a, b) => b.rating - a.rating)
            .slice(0, 6),
        [allSeries]);

    const trending = useMemo(() =>
        allSeries
            .filter((m) => m.isTop10)
            .slice(0, 6),
        [allSeries]);

    const newRelease = useMemo(() =>
        allSeries
            .filter((m) => m.isNewEpisode || m.year >= 2023)
            .slice(0, 6),
        [allSeries]);

    if (isLoading && allSeries.length === 0) {
        return <PageSkeleton withGenre={true} />;
    }

    if (error && allSeries.length === 0) {
        return <ServerError message={error} onRetry={fetchMovies} />;
    }

    return (
        <>
            <HeroSection withGenre movie={trending[0] || allSeries[0]} />

            {continueWatching.length > 0 && (
                <MovieSection
                    title="Melanjutkan Tonton Series"
                    movies={continueWatching}
                    variant="landscape"
                    className="bg-other-page-header -mt-1"
                />
            )}

            {chillExclusiveSeries.length > 0 && (
                <MovieSection
                    title="Series Persembahan Chill"
                    movies={chillExclusiveSeries}
                    variant="portrait"
                />
            )}

            {topRating.length > 0 && (
                <MovieSection
                    title="Top Rating Series Hari ini"
                    movies={topRating}
                    variant="portrait"
                />
            )}

            {trending.length > 0 && (
                <MovieSection
                    title="Series Trending"
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

export default Series;