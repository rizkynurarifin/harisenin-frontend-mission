import { useEffect, useMemo } from "react";
import { HeroSection } from "../components/organisms/HeroSection";
import { MovieSection } from "../components/templates/MovieSection";
import { useMovieStore } from "../store/useMovieStore";
import { PageSkeleton } from "../components/templates/PageSkeleton";

const Home = () => {
    const { movies, fetchMovies, isLoading } = useMovieStore();

    useEffect(() => {
        if (movies.length === 0) {
            fetchMovies();
        }
    }, [fetchMovies, movies.length]);

    const continueWatching = useMemo(() =>
        movies
            .filter((m) => (m.progress ?? 0) > 0)
            .slice(0, 6),
        [movies]);

    const topRating = useMemo(() =>
        [...movies]
            .sort((a, b) => b.rating - a.rating)
            .slice(0, 6),
        [movies]);

    const trending = useMemo(() =>
        movies
            .filter((m) => m.isTop10)
            .slice(0, 6),
        [movies]);

    const newRelease = useMemo(() =>
        movies
            .filter((m) => m.isNewEpisode || m.year >= 2023)
            .slice(0, 6),
        [movies]);

    if (isLoading) {
        return <PageSkeleton />;
    }

    return (
        <>
            <HeroSection movie={trending[0] || movies[0]} />

            {continueWatching.length > 0 && (
                <MovieSection
                    title="Melanjutkan Tonton Film"
                    movies={continueWatching}
                    variant="landscape"
                    className="bg-other-page-header -mt-1"
                />
            )}

            <MovieSection
                title="Top Rating Film dan Series Hari ini"
                movies={topRating}
                variant="portrait"
            />

            <MovieSection
                title="Film dan Series Trending"
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

export default Home;