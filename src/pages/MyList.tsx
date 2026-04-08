import { MovieSection } from "../components/templates/MovieSection";
import { ALL_CONTENT } from "../const/movies";
import { useAuthStore } from "../store/useAuthStore";

const MyList = () => {
    const { user } = useAuthStore();

    const myMovies = user?.myList
        ? [...user.myList]
            .reverse()
            .map((id) => ALL_CONTENT[id])
            .filter((movie) => movie !== undefined)
        : [];

    return (
        <main>
            <MovieSection
                title="Daftar Saya"
                movies={myMovies}
                variant="portrait"
                isGrid={true}
            />
        </main>
    );
};

export default MyList;