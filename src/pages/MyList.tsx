import { MovieSection } from "../components/templates/MovieSection";
import { MY_LIST } from "../const/movies";

const MyList = () => {
    return (
        <div className="pb-10 md:pb-20">
            <MovieSection
                title="Daftar Saya"
                movies={MY_LIST}
                variant="portrait"
                isGrid={true}
            />
        </div>
    );
};

export default MyList;