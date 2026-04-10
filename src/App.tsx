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
import { AdminRoute, ProtectedRoute } from './components/organisms/ProtectedRoute';
import Dashboard from './pages/admin/Dashboard';
import CreateMovie from './pages/admin/CreateMovie';
import EditMovie from './pages/admin/EditMovie';
import { NotFound } from './pages/NotFound';

const router = createBrowserRouter([
    { path: "login", element: <Login /> },
    { path: "register", element: <Register /> },

    {
        path: "/",
        element: <MainLayout />,
        children: [
            { index: true, element: <Home /> },
            { path: "series", element: <Series /> },
            { path: "movies", element: <Movies /> },
            { path: "subscription", element: <Subscription /> },

            {
                element: <ProtectedRoute />,
                children: [
                    { path: "my-list", element: <MyList /> },
                    { path: "profile", element: <Profile /> },
                    { path: "payment", element: <Payment /> },
                    { path: "payment-detail", element: <PaymentDetail /> },
                ]
            },

            {
                path: "admin",
                element: <AdminRoute />,
                children: [
                    { index: true, element: <Dashboard /> },
                    { path: "create", element: <CreateMovie /> },
                    { path: "edit/:id", element: <EditMovie /> }
                ]
            }
        ],
    },

    {
        element: <ProtectedRoute />,
        children: [
            { path: "movie-player/:id", element: <MoviePlayer /> },
        ]
    },

    {
        path: "*",
        element: <NotFound />
    }
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;