import { useEffect } from "react";
import { MovieSection } from "../components/templates/MovieSection";
import { useAuthStore } from "../store/useAuthStore";
import { PageSkeleton } from "../components/templates/PageSkeleton";
import { useMovieStore } from "../store/useMovieStore";

const MyList = () => {
    const { user } = useAuthStore();
    const { movies, fetchMovies, isLoading } = useMovieStore();

    useEffect(() => {
        if (movies.length === 0) {
            fetchMovies();
        }
    }, [fetchMovies, movies.length]);

    const myMovies = user?.myList
        ? [...user.myList]
            .reverse()
            .map((id) => movies.find((m) => String(m.id) === String(id)))
            .filter((movie) => movie !== undefined)
        : [];

    if (isLoading) {
        return <PageSkeleton isGrid={true} title="Daftar Saya" />;
    }

    return (
        <>
            <MovieSection
                title="Daftar Saya"
                movies={myMovies}
                variant="portrait"
                isGrid={true}
            />
        </>
    );
};

export default MyList;