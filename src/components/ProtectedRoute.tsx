
import React from 'react';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-travel-primary"></div>
          <p className="text-travel-secondary font-medium">Loading your experience...</p>
        </div>
      </div>
    );
  }

  // Skip authentication checks and render children directly
  return <>{children}</>;
};

export default ProtectedRoute;
