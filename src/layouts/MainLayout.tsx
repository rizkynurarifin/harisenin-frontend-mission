import { Outlet, useLocation } from "react-router-dom";
import { Header } from "../components/organisms/Header";
import { Footer } from "../components/organisms/Footer";

const MainLayout = () => {
    const location = useLocation();
    const showGenre = location.pathname === '/series' || location.pathname === '/movies';

    return (
        <div className="flex flex-col min-h-screen bg-other-page-header text-white">
            <Header withGenre={showGenre} />

            <main className="grow overflow-x-hidden">
                <Outlet />
            </main>
            
            <Footer />
        </div>
    );
};

export default MainLayout;