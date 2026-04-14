import { useEffect, useMemo } from "react";
import { MovieSection } from "../components/templates/MovieSection";
import { useAuthStore } from "../store/useAuthStore";
import { PageSkeleton } from "../components/templates/PageSkeleton";
import type { Movie } from "../const/movies";
import { ServerError } from "./ServerError";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/redux/store";
import { fetchMovies } from "../store/redux/movieSlice";

const MyList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { user } = useAuthStore();

    const { movies, isLoading, error } = useSelector((state: RootState) => state.movieData);

    useEffect(() => {
        if (movies.length === 0) {
            dispatch(fetchMovies());
        }
    }, [dispatch, movies.length]);

    const myMovies = useMemo<Movie[]>(() => {
        const userList = user?.myList;
        if (!userList) return [];

        return [...userList]
            .reverse()
            .map((id) => movies.find((m) => m.id === id))
            .filter((movie): movie is Movie => !!movie);
    }, [user?.myList, movies]);

    if (isLoading && movies.length === 0) {
        return <PageSkeleton isGrid={true} title="Daftar Saya" />;
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