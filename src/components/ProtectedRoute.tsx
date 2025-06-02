import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.tsx';
import PageLoading from './PageLoading.tsx';

interface ProtectedRouteProps {
  children: ReactNode;
  role?: 'user' | 'admin';
}

const ProtectedRoute = ({ children, role }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <PageLoading />;
  }

  else if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  else if (role && user.role !== role) {
    return <Navigate to="/login" replace />; // Or to a "not authorized" page
  }

  return <>{children}</>;
};

export default ProtectedRoute;
