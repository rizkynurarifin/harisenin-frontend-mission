import { useCallback, useMemo } from "react";
import { HeroSection } from "../components/organisms/HeroSection";
import { MovieSection } from "../components/templates/MovieSection";
import { type Movie } from "../const/movies";
import { useMovieStore } from "../store/useMovieStore";

const Series = () => {
    const movies = useMovieStore((state) => state.movies);

    const getLiveMovie = useCallback((id: number): Movie | undefined => {
        return movies.find((m) => m.id === id);
    }, [movies]);

    const continueWatchingSeries = useMemo(() =>
        [16, 17, 14, 18, 19, 15]
            .map(id => getLiveMovie(id))
            .filter((m): m is Movie => !!m),
        [getLiveMovie]);

    const chillExclusiveSeries = useMemo(() =>
        [17, 19, 18, 14, 16, 20]
            .map(id => getLiveMovie(id))
            .filter((m): m is Movie => !!m),
        [getLiveMovie]);

    const topRatingSeries = useMemo(() =>
        [19, 17, 14, 18, 16, 20]
            .map(id => getLiveMovie(id))
            .filter((m): m is Movie => !!m),
        [getLiveMovie]);

    const trendingSeries = useMemo(() =>
        [18, 19, 17, 16, 15, 20]
            .map(id => getLiveMovie(id))
            .filter((m): m is Movie => !!m),
        [getLiveMovie]);

    const newReleaseSeries = useMemo(() =>
        [19, 14, 20, 16, 18, 17]
            .map(id => getLiveMovie(id))
            .filter((m): m is Movie => !!m),
        [getLiveMovie]);

    return (
        <>
            <HeroSection withGenre />

            <MovieSection
                title="Melanjutkan Tonton Series"
                movies={continueWatchingSeries}
                variant="landscape"
                className="bg-other-page-header -mt-1"
            />

            <MovieSection
                title="Series Persembahan Chill"
                movies={chillExclusiveSeries}
                variant="portrait"
            />

            <MovieSection
                title="Top Rating Series Hari ini"
                movies={topRatingSeries}
                variant="portrait"
            />

            <MovieSection
                title="Series Trending"
                movies={trendingSeries}
                variant="portrait"
            />

            <MovieSection
                title="Rilis Baru"
                movies={newReleaseSeries}
                variant="portrait"
            />
        </>
    );
};

export default Series;