<<<<<<< HEAD
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged, 
  User,
  setPersistence,
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updateProfile
} from 'firebase/auth';
import { getStorage } from 'firebase/storage';
=======
>>>>>>> a82bc0ebdc254222bb070b68646209c48572eff2

import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, User } from 'firebase/auth';
import { toast } from "sonner";

// Firebase configuration object
const firebaseConfig = {
<<<<<<< HEAD
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
=======
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || ""
};

// Developer mode - for quick setup without environment variables
// UNCOMMENT and FILL IN the values below to use Firebase without environment variables
// ⚠️ Warning: Don't commit this file with actual values! For development only!

/*
const devModeConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
>>>>>>> a82bc0ebdc254222bb070b68646209c48572eff2
};
*/

<<<<<<< HEAD
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();

// Set persistence to LOCAL
setPersistence(auth, browserLocalPersistence);

export { 
  auth, 
  storage, 
=======
// Toggle developer mode by uncommenting the line below
// const activeConfig = devModeConfig;
const activeConfig = firebaseConfig;

// Check if Firebase config is properly set
const isFirebaseConfigured = () => {
  return activeConfig.apiKey && activeConfig.apiKey !== "";
};

let app;
let auth;
let googleProvider;

try {
  if (isFirebaseConfigured()) {
    // Initialize Firebase only if config is available
    app = initializeApp(activeConfig);
    auth = getAuth(app);
    googleProvider = new GoogleAuthProvider();
  } else {
    console.error("Firebase configuration is incomplete. Please set up your configuration.");
    toast.error("Firebase configuration missing. Set up environment variables or use developer mode.");
  }
} catch (error) {
  console.error("Firebase initialization error:", error);
  toast.error("Error initializing Firebase. Check console for details.");
}

export { 
  auth, 
>>>>>>> a82bc0ebdc254222bb070b68646209c48572eff2
  googleProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
<<<<<<< HEAD
  sendPasswordResetEmail,
  sendEmailVerification,
  updateProfile
};
export type { User }; 
=======
  isFirebaseConfigured
};
export type { User };
>>>>>>> a82bc0ebdc254222bb070b68646209c48572eff2
