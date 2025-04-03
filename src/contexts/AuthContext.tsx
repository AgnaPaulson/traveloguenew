
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { 
  auth, 
  onAuthStateChanged, 
  signInWithPopup, 
  signOut, 
  googleProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  isFirebaseConfigured
} from '../config/firebase';
import { toast } from "sonner";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  firebaseConfigured: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
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

  const signInWithGoogle = async () => {
    if (!firebaseConfigured) {
      toast.error("Firebase not configured. Please set your environment variables.");
      return Promise.reject("Firebase not configured");
    }

    try {
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
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Successfully signed in!");
    } catch (error: any) {
      console.error('Error signing in with email:', error);
      toast.error(error.message || "Failed to sign in with email");
      throw error;
    }
  };

  const signUpWithEmail = async (email: string, password: string) => {
    if (!firebaseConfigured) {
      toast.error("Firebase not configured. Please set your environment variables.");
      return Promise.reject("Firebase not configured");
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success("Account created successfully!");
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

  const value = {
    user,
    loading,
    firebaseConfigured,
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
    logout,
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
