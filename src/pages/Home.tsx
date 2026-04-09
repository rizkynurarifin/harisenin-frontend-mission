import { useCallback, useMemo } from "react";
import { HeroSection } from "../components/organisms/HeroSection";
import { MovieSection } from "../components/templates/MovieSection";
import { type Movie } from "../const/movies";
import { useMovieStore } from "../store/useMovieStore";

const Home = () => {
    const movies = useMovieStore((state) => state.movies);

    const getLiveMovie = useCallback((id: number): Movie | undefined => {
        return movies.find((m) => m.id === id);
    }, [movies]);

    const continueWatching = useMemo(() => {
        const config = [
            { id: 1, progress: 80 },
            { id: 14, progress: 0 },
            { id: 15, progress: 0 },
            { id: 2, progress: 20 },
            { id: 3, progress: 65 },
            { id: 4, progress: 45 },
        ];

        return config
            .map((item) => {
                const liveMovie = getLiveMovie(item.id);
                if (!liveMovie) return null;

                return {
                    ...liveMovie,
                    progress: item.progress
                } as Movie;
            })
            .filter((m): m is Movie => m !== null);
    }, [getLiveMovie]);

    const topRating = useMemo(() =>
        [19, 7, 14, 4, 8, 9]
            .map(id => getLiveMovie(id))
            .filter((m): m is Movie => !!m),
        [getLiveMovie]);

    const trending = useMemo(() =>
        [3, 18, 6, 19, 10, 11]
            .map(id => getLiveMovie(id))
            .filter((m): m is Movie => !!m),
        [getLiveMovie]);

    const newRelease = useMemo(() =>
        [6, 19, 13, 14, 5, 20]
            .map(id => getLiveMovie(id))
            .filter((m): m is Movie => !!m),
        [getLiveMovie]);

    return (
        <>
            <HeroSection />

            <MovieSection
                title="Melanjutkan Tonton Film"
                movies={continueWatching}
                variant="landscape"
                className="bg-other-page-header -mt-1"
            />

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