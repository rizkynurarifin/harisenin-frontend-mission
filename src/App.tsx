import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Series from './pages/Series';
import Movies from './pages/Movies';
import MyList from './pages/MyList';
import Profile from './pages/Profile';
import Subscription from './pages/Subscription';
import { MoviePlayer } from './pages/MoviePlayer';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Payment } from './pages/Payment';
import { PaymentDetail } from './pages/PaymentDetail';

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "series",
                element: <Series />,
            },
            {
                path: "movies",
                element: <Movies />,
            },
            {
                path: "my-list",
                element: <MyList />,
            },
            {
                path: "profile",
                element: <Profile />,
            },
            {
                path: "subscription",
                element: <Subscription />,
            },
            {
                path: "payment",
                element: <Payment />,
            },
            {
                path: "payment-detail",
                element: <PaymentDetail />,
            },
        ],
    },
    {
        path: "login",
        element: <Login />,
    },
    {
        path: "register",
        element: <Register />,
    },
    {
        path: "movie-player/:id",
        element: <MoviePlayer />,
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;