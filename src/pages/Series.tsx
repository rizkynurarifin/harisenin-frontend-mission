import { HeroSection } from "../components/organisms/HeroSection";
import { MovieSection } from "../components/templates/MovieSection";
import { CHILL_EXCLUSIVE_MOVIES, CONTINUE_WATCHING_SERIES, NEW_RELEASE_MOVIES, TOP_RATING_MOVIES, TRENDING_MOVIES } from "../const/movies";

const Series = () => {
    return (
        <div className="pb-10 md:pb-20">
            <HeroSection withGenre />

            <MovieSection
                title="Melanjutkan Tonton Series" 
                movies={CONTINUE_WATCHING_SERIES} 
                variant="landscape"
                className="bg-other-page-header -mt-1"
            />

            <MovieSection
                title="Series Persembahan Chill" 
                movies={CHILL_EXCLUSIVE_MOVIES} 
                variant="portrait"
            />

            <MovieSection 
                title="Top Rating Series Hari ini" 
                movies={TOP_RATING_MOVIES} 
                variant="portrait"
            />

            <MovieSection 
                title="Series Trending" 
                movies={TRENDING_MOVIES} 
                variant="portrait"
            />

            <MovieSection 
                title="Rilis Baru" 
                movies={NEW_RELEASE_MOVIES} 
                variant="portrait"
            />
        </div>
    );
};

export default Series;