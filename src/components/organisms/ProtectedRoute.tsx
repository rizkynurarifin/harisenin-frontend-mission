import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';

export const ProtectedRoute = () => {
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }
    
    return <Outlet />;
};

export const AdminRoute = () => {
    const { isLoggedIn, user } = useAuthStore();

    if (!isLoggedIn || user?.role !== 'admin') {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};