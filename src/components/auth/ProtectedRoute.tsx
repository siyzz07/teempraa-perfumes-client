import { Navigate, useLocation } from 'react-router-dom';
import React from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const location = useLocation();
  const accessToken = localStorage.getItem('adminAccessToken');
  const refreshToken = localStorage.getItem('adminRefreshToken');

  // If no tokens at all, definitely not authorized
  if (!accessToken && !refreshToken) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // Helper to check if a JWT is expired
  const isExpired = (token: string | null) => {
    if (!token) return true;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp && payload.exp * 1000 < Date.now();
    } catch {
      return true;
    }
  };

  // If both are expired, redirect to login
  if (isExpired(accessToken) && isExpired(refreshToken)) {
    localStorage.removeItem('adminAccessToken');
    localStorage.removeItem('adminRefreshToken');
    localStorage.removeItem('adminUser');
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // If we have a valid refresh token but expired access token, 
  // we still allow entry because the Axios interceptor will handle the rotation on the first request.
  return <>{children}</>;
};

export default ProtectedRoute;
