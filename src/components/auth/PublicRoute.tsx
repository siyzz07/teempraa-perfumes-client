import { Navigate } from 'react-router-dom';
import React from 'react';

interface PublicRouteProps {
  children: React.ReactNode;
}

const PublicRoute = ({ children }: PublicRouteProps) => {
  const accessToken = localStorage.getItem('adminAccessToken');
  const refreshToken = localStorage.getItem('adminRefreshToken');

  // If a session exists (either token is present), redirect to dashboard
  // We don't strictly check expiration here because the automatic refresh
  // logic will handle it in the dashboard. If they have tokens, they stay in Admin.
  if (accessToken || refreshToken) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <>{children}</>;
};

export default PublicRoute;
