import { MovieSection } from "../components/templates/MovieSection";
import { MY_LIST } from "../const/movies";

const MyList = () => {
    return (
        <main>
            <MovieSection
                title="Daftar Saya"
                movies={MY_LIST}
                variant="portrait"
                isGrid={true}
            />
        </main>
    );
};

export default MyList;