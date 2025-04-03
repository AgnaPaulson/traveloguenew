
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, User } from 'firebase/auth';
import { toast } from "sonner";

// Firebase configuration object
const firebaseConfig = {
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
};
*/

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
  googleProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  isFirebaseConfigured
};
export type { User };
