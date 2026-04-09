import { useCallback, useMemo } from "react";
import { HeroSection } from "../components/organisms/HeroSection";
import { MovieSection } from "../components/templates/MovieSection";
import { type Movie } from "../const/movies";
import { useMovieStore } from "../store/useMovieStore";

const Movies = () => {
    const movies = useMovieStore((state) => state.movies);

    const getLiveMovie = useCallback((id: number): Movie | undefined => {
        return movies.find((m) => m.id === id);
    }, [movies]);

    const continueWatchingMovies = useMemo(() => {
        const config = [
            { id: 1, progress: 80 },
            { id: 2, progress: 20 },
            { id: 3, progress: 65 },
            { id: 4, progress: 45 },
            { id: 5, progress: 75 },
            { id: 6, progress: 15 },
        ];

        return config
            .map((item) => {
                const live = getLiveMovie(item.id);
                if (!live) return null;

                return {
                    ...live,
                    progress: item.progress
                } as Movie;
            })
            .filter((m): m is Movie => m !== null);
    }, [getLiveMovie]);

    const chillExclusiveMovies = useMemo(() =>
        [7, 4, 8, 9, 2, 11]
            .map(id => getLiveMovie(id))
            .filter((m): m is Movie => !!m),
        [getLiveMovie]);

    const topRatingMovies = useMemo(() =>
        [8, 2, 3, 7, 4, 6]
            .map(id => getLiveMovie(id))
            .filter((m): m is Movie => !!m),
        [getLiveMovie]);

    const trendingMovies = useMemo(() =>
        [3, 6, 10, 11, 5, 12]
            .map(id => getLiveMovie(id))
            .filter((m): m is Movie => !!m),
        [getLiveMovie]);

    const newReleaseMovies = useMemo(() =>
        [6, 13, 5, 12, 11, 8]
            .map(id => getLiveMovie(id))
            .filter((m): m is Movie => !!m),
        [getLiveMovie]);

    return (
        <>
            <HeroSection withGenre />

            <MovieSection
                title="Melanjutkan Tonton Film"
                movies={continueWatchingMovies}
                variant="landscape"
                className="bg-other-page-header -mt-1"
            />

            <MovieSection
                title="Film Persembahan Chill"
                movies={chillExclusiveMovies}
                variant="portrait"
            />

            <MovieSection
                title="Top Rating Film Hari ini"
                movies={topRatingMovies}
                variant="portrait"
            />

            <MovieSection
                title="Film Trending"
                movies={trendingMovies}
                variant="portrait"
            />

            <MovieSection
                title="Rilis Baru"
                movies={newReleaseMovies}
                variant="portrait"
            />
        </>
    );
};

export default Movies;