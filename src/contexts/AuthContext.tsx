
import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User,
  UserCredential
} from 'firebase/auth';
import { 
  auth, 
  onAuthStateChanged, 
  signInWithPopup, 
  signOut, 
  googleProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updateProfile,
  isFirebaseConfigured
} from '../config/firebase';
import { toast } from "sonner";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  firebaseConfigured: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<UserCredential>;
  signUpWithEmail: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserProfile: (displayName?: string, photoURL?: string) => Promise<void>;
  verifyEmail: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Rate limiting configuration
const RATE_LIMIT_ATTEMPTS = 5;
const RATE_LIMIT_TIME = 15 * 60 * 1000; // 15 minutes

interface RateLimit {
  attempts: number;
  timestamp: number;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [rateLimit, setRateLimit] = useState<RateLimit>({ attempts: 0, timestamp: 0 });
  const firebaseConfigured = isFirebaseConfigured();

  useEffect(() => {
    if (!firebaseConfigured) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [firebaseConfigured]);

  const checkRateLimit = () => {
    const now = Date.now();
    if (now - rateLimit.timestamp > RATE_LIMIT_TIME) {
      // Reset rate limit if time has expired
      setRateLimit({ attempts: 1, timestamp: now });
      return true;
    }

    if (rateLimit.attempts >= RATE_LIMIT_ATTEMPTS) {
      throw new Error(`Too many attempts. Please try again after ${Math.ceil((RATE_LIMIT_TIME - (now - rateLimit.timestamp)) / 60000)} minutes.`);
    }

    setRateLimit(prev => ({
      attempts: prev.attempts + 1,
      timestamp: prev.timestamp
    }));
    return true;
  };

  const signInWithGoogle = async () => {
    if (!firebaseConfigured) {
      toast.error("Firebase not configured. Please set your environment variables.");
      return Promise.reject("Firebase not configured");
    }

    try {
      checkRateLimit();
      await signInWithPopup(auth, googleProvider);
      toast.success("Successfully signed in!");
    } catch (error: any) {
      console.error('Error signing in with Google:', error);
      toast.error(error.message || "Failed to sign in with Google");
      throw error;
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    if (!firebaseConfigured) {
      toast.error("Firebase not configured. Please set your environment variables.");
      return Promise.reject("Firebase not configured");
    }

    try {
      checkRateLimit();
      const result = await signInWithEmailAndPassword(auth, email, password);
      toast.success("Successfully signed in!");
      return result;
    } catch (error: any) {
      console.error('Error signing in with email:', error);
      toast.error(error.message || "Failed to sign in with email");
      throw error;
    }
  };

  const signUpWithEmail = async (email: string, password: string, name: string) => {
    if (!firebaseConfigured) {
      toast.error("Firebase not configured. Please set your environment variables.");
      return Promise.reject("Firebase not configured");
    }

    try {
      checkRateLimit();
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(user, { displayName: name });
      await sendEmailVerification(user);
      toast.success("Account created successfully! Please check your email for verification.");
    } catch (error: any) {
      console.error('Error signing up with email:', error);
      toast.error(error.message || "Failed to create account");
      throw error;
    }
  };

  const logout = async () => {
    if (!firebaseConfigured) {
      toast.error("Firebase not configured. Please set your environment variables.");
      return Promise.reject("Firebase not configured");
    }

    try {
      await signOut(auth);
      toast.success("Successfully signed out!");
    } catch (error: any) {
      console.error('Error signing out:', error);
      toast.error(error.message || "Failed to sign out");
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    if (!firebaseConfigured) {
      toast.error("Firebase not configured. Please set your environment variables.");
      return Promise.reject("Firebase not configured");
    }

    try {
      checkRateLimit();
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent. Please check your inbox.");
    } catch (error: any) {
      console.error('Error resetting password:', error);
      toast.error(error.message || "Failed to send password reset email");
      throw error;
    }
  };

  const updateUserProfile = async (displayName?: string, photoURL?: string) => {
    if (!auth.currentUser) throw new Error('No user logged in');
    try {
      await updateProfile(auth.currentUser, { displayName, photoURL });
      toast.success("Profile updated successfully!");
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast.error(error.message || "Failed to update profile");
      throw error;
    }
  };

  const verifyEmail = async () => {
    if (!auth.currentUser) throw new Error('No user logged in');
    try {
      await sendEmailVerification(auth.currentUser);
      toast.success("Verification email sent. Please check your inbox.");
    } catch (error: any) {
      console.error('Error sending verification email:', error);
      toast.error(error.message || "Failed to send verification email");
      throw error;
    }
  };

  const value = {
    user,
    loading,
    firebaseConfigured,
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
    logout,
    resetPassword,
    updateUserProfile,
    verifyEmail,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
