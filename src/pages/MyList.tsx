import { MovieSection } from "../components/templates/MovieSection";
import { MY_LIST_MOVIES } from "../const/movies";

const MyList = () => {
    return (
        <div className="pb-10 md:pb-20">
            <MovieSection
                title="Daftar Saya"
                movies={MY_LIST_MOVIES}
                variant="portrait"
                isGrid={true}
            />
        </div>
    );
};

export default MyList;