import { useEffect, useMemo } from "react";
import { HeroSection } from "../components/organisms/HeroSection";
import { MovieSection } from "../components/templates/MovieSection";
import { PageSkeleton } from "../components/templates/PageSkeleton";
import { ServerError } from "./ServerError";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/redux/store";
import { fetchMovies } from "../store/redux/movieSlice";

const Home = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { movies, isLoading, error } = useSelector((state: RootState) => state.movieData);

    useEffect(() => {
        if (movies.length === 0) {
            dispatch(fetchMovies());
        }
    }, [dispatch, movies.length]);

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

    if (isLoading && movies.length === 0) {
        return <PageSkeleton />;
    }

    if (error && movies.length === 0) {
        return (
            <ServerError
                message={error}
                onRetry={() => dispatch(fetchMovies())}
            />
        );
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

            {topRating.length > 0 && (
                <MovieSection
                    title="Top Rating Film dan Series Hari ini"
                    movies={topRating}
                    variant="portrait"
                />
            )}

            {trending.length > 0 && (
                <MovieSection
                    title="Film dan Series Trending"
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

export default Home;