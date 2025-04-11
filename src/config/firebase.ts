
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

// Developer mode - using your actual Firebase project details
// This configuration is being used for development
const devModeConfig = {
  apiKey: "AIzaSyBdrumk2qfu68BOU8XQqKef2cBOYhEzL7U", // Your Web API key
  authDomain: "traveloguenew.firebaseapp.com", // Based on your project ID
  projectId: "traveloguenew", // Your Project ID
  storageBucket: "traveloguenew.appspot.com", // Based on your project ID
  messagingSenderId: "455998755261", // Your Project number
  appId: "1:455998755261:web:1234567890abcdef" // NOTE: Replace with your actual Web App ID from Firebase Console
};

// Use devModeConfig instead of firebaseConfig for quick development
const activeConfig = devModeConfig;

// Check if Firebase config is properly set
const isFirebaseConfigured = () => {
  return activeConfig.apiKey && activeConfig.apiKey !== "";
};

let app;
let auth;
let storage;
let googleProvider;

try {
  if (isFirebaseConfigured()) {
    // Initialize Firebase only if config is available
    app = initializeApp(activeConfig);
    auth = getAuth(app);
    storage = getStorage(app);
    googleProvider = new GoogleAuthProvider();
    
    // Set persistence to LOCAL
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        console.log("Firebase persistence set to LOCAL");
      })
      .catch((error) => {
        console.error("Error setting persistence:", error);
        toast.error("Error setting authentication persistence. You may need to log in again when refreshing.");
      });
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
  storage,
  googleProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updateProfile,
  isFirebaseConfigured
};
export type { User };
