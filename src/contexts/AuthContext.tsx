
import React, { createContext, useContext, useEffect, useState } from 'react';
<<<<<<< HEAD
import { 
  User,
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updateProfile
} from 'firebase/auth';
import { auth, onAuthStateChanged, signInWithPopup, signOut, googleProvider } from '../config/firebase';
=======
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
>>>>>>> a82bc0ebdc254222bb070b68646209c48572eff2

interface AuthContextType {
  user: User | null;
  loading: boolean;
  firebaseConfigured: boolean;
  signInWithGoogle: () => Promise<void>;
<<<<<<< HEAD
  signInWithEmail: (email: string, password: string) => Promise<UserCredential>;
  signUpWithEmail: (email: string, password: string, name: string) => Promise<void>;
=======
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
>>>>>>> a82bc0ebdc254222bb070b68646209c48572eff2
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
<<<<<<< HEAD
  const [rateLimit, setRateLimit] = useState<RateLimit>({ attempts: 0, timestamp: 0 });
=======
  const firebaseConfigured = isFirebaseConfigured();
>>>>>>> a82bc0ebdc254222bb070b68646209c48572eff2

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
<<<<<<< HEAD
=======
      toast.error(error.message || "Failed to sign in with Google");
>>>>>>> a82bc0ebdc254222bb070b68646209c48572eff2
      throw error;
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
<<<<<<< HEAD
    try {
      checkRateLimit();
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('Error signing in with email:', error);
=======
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
>>>>>>> a82bc0ebdc254222bb070b68646209c48572eff2
      throw error;
    }
  };

<<<<<<< HEAD
  const signUpWithEmail = async (email: string, password: string, name: string) => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(user, { displayName: name });
      await sendEmailVerification(user);
    } catch (error) {
      console.error('Error signing up with email:', error);
=======
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
>>>>>>> a82bc0ebdc254222bb070b68646209c48572eff2
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
<<<<<<< HEAD
=======
      toast.error(error.message || "Failed to sign out");
>>>>>>> a82bc0ebdc254222bb070b68646209c48572eff2
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      checkRateLimit();
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.error('Error resetting password:', error);
      throw error;
    }
  };

  const updateUserProfile = async (displayName?: string, photoURL?: string) => {
    if (!auth.currentUser) throw new Error('No user logged in');
    await updateProfile(auth.currentUser, { displayName, photoURL });
  };

  const verifyEmail = async () => {
    if (!auth.currentUser) throw new Error('No user logged in');
    await sendEmailVerification(auth.currentUser);
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
