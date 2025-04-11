
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

// Developer mode - for quick setup without environment variables
// Uncomment and fill in the values below to use Firebase without environment variables
// ⚠️ Warning: Don't commit this file with actual values! For development only!

const devModeConfig = {
  apiKey: "AIzaSyAxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", // Replace with your API key
  authDomain: "your-project-id.firebaseapp.com", // Replace with your auth domain
  projectId: "your-project-id", // Replace with your project ID
  storageBucket: "your-project-id.appspot.com", // Replace with your storage bucket
  messagingSenderId: "123456789012", // Replace with your messaging sender ID
  appId: "1:123456789012:web:abcdef1234567890" // Replace with your app ID
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
    setPersistence(auth, browserLocalPersistence);
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
