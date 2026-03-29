import { HeroSection } from "../components/organisms/HeroSection";
import { MovieSection } from "../components/templates/MovieSection";
import { CONTINUE_WATCHING, NEW_RELEASE, TOP_RATING, TRENDING } from "../const/movies";

const Home = () => {
    return (
        <main>
            <HeroSection />

            <MovieSection
                title="Melanjutkan Tonton Film" 
                movies={CONTINUE_WATCHING} 
                variant="landscape"
                className="bg-other-page-header -mt-1"
            />

            <MovieSection 
                title="Top Rating Film dan Series Hari ini" 
                movies={TOP_RATING} 
                variant="portrait"
            />

            <MovieSection 
                title="Film dan Series Trending" 
                movies={TRENDING} 
                variant="portrait"
            />

            <MovieSection 
                title="Rilis Baru" 
                movies={NEW_RELEASE} 
                variant="portrait"
            />
        </main>
    );
};

export default Home;