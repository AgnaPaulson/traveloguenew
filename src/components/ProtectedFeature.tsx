import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLoginModal } from '../contexts/LoginModalContext';

interface ProtectedFeatureProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const ProtectedFeature: React.FC<ProtectedFeatureProps> = ({ children, fallback }) => {
  const { user, firebaseConfigured } = useAuth();
  const { openLoginModal } = useLoginModal();

  // If Firebase is not configured, allow access but user will see configuration message
  if (!firebaseConfigured) {
    console.log("Firebase not configured, but allowing access in demo mode");
    return <>{children}</>;
  }

  // If user is not authenticated, trigger login modal
  if (!user) {
    if (fallback) {
      return <>{fallback}</>;
    }
    
    // Automatically open login modal when trying to access protected feature
    React.useEffect(() => {
      openLoginModal();
    }, [openLoginModal]);
    
    return null;
  }

  return <>{children}</>;
};

export default ProtectedFeature;