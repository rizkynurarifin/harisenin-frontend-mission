import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Series from './pages/Series';
import Movies from './pages/Movies';
import MyList from './pages/MyList';
import Profile from './pages/Profile';

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
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;