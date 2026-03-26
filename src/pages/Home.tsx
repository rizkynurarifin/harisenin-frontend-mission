import { HeroSection } from "../components/organisms/HeroSection";
import { MovieSection } from "../components/templates/MovieSection";
import { CONTINUE_WATCHING_MOVIES, NEW_RELEASE_MOVIES, TOP_RATING_MOVIES, TRENDING_MOVIES } from "../const/movies";

const Home = () => {
    return (
        <div>
            <HeroSection />

            <MovieSection
                title="Melanjutkan Tonton Film" 
                movies={CONTINUE_WATCHING_MOVIES} 
                variant="landscape"
                className="bg-other-page-header -mt-1"
            />

            <MovieSection 
                title="Top Rating Film dan Series Hari ini" 
                movies={TOP_RATING_MOVIES} 
                variant="portrait"
            />

            <MovieSection 
                title="Film Trending" 
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

export default Home;