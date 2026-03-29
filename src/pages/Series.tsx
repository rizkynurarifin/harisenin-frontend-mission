import { HeroSection } from "../components/organisms/HeroSection";
import { MovieSection } from "../components/templates/MovieSection";
import { CHILL_EXCLUSIVE_SERIES, CONTINUE_WATCHING_SERIES, NEW_RELEASE_SERIES, TOP_RATING_SERIES, TRENDING_SERIES } from "../const/movies";

const Series = () => {
    return (
        <main>
            <HeroSection withGenre />

            <MovieSection
                title="Melanjutkan Tonton Series" 
                movies={CONTINUE_WATCHING_SERIES} 
                variant="landscape"
                className="bg-other-page-header -mt-1"
            />

            <MovieSection
                title="Series Persembahan Chill" 
                movies={CHILL_EXCLUSIVE_SERIES} 
                variant="portrait"
            />

            <MovieSection 
                title="Top Rating Series Hari ini" 
                movies={TOP_RATING_SERIES} 
                variant="portrait"
            />

            <MovieSection 
                title="Series Trending" 
                movies={TRENDING_SERIES} 
                variant="portrait"
            />

            <MovieSection 
                title="Rilis Baru" 
                movies={NEW_RELEASE_SERIES} 
                variant="portrait"
            />
        </main>
    );
};

export default Series;