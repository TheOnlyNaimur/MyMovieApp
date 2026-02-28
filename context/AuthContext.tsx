import React, { createContext, useContext, useState, useEffect } from "react";
import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";

// Admin email (hardcoded)
const ADMIN_EMAIL = "naimurislam707@gmail.com";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  userData: UserData | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (
    email: string,
    password: string,
    displayName: string,
  ) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

interface UserData {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  createdAt: string;
  watchlist: string[];
  favorites: string[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // Load user data from Firestore
  const loadUserData = async (uid: string) => {
    try {
      const userDoc = await getDoc(doc(db, "users", uid));
      if (userDoc.exists()) {
        setUserData(userDoc.data() as UserData);
      } else {
        console.log("User document doesn't exist, creating it...");
        // If document doesn't exist, create it from current auth user
        if (auth.currentUser) {
          const newUserData: UserData = {
            uid: uid,
            email: auth.currentUser.email || "",
            displayName: auth.currentUser.displayName || "User",
            photoURL: auth.currentUser.photoURL || "",
            createdAt: new Date().toISOString(),
            watchlist: [],
            favorites: [],
          };
          await setDoc(doc(db, "users", uid), newUserData);
          setUserData(newUserData);
        }
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  };

  // Create user document in Firestore
  const createUserDocument = async (user: User, displayName?: string) => {
    try {
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (!userDoc.exists()) {
        const newUserData: UserData = {
          uid: user.uid,
          email: user.email || "",
          displayName: displayName || user.displayName || "User",
          photoURL: user.photoURL || "",
          createdAt: new Date().toISOString(),
          watchlist: [],
          favorites: [],
        };
        await setDoc(doc(db, "users", user.uid), newUserData);
        setUserData(newUserData);
      } else {
        await loadUserData(user.uid);
      }
    } catch (error) {
      console.error("Error creating user document:", error);
    }
  };

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);

      if (user) {
        // Check if admin
        setIsAdmin(user.email === ADMIN_EMAIL);

        // Load user data
        await loadUserData(user.uid);
      } else {
        setIsAdmin(false);
        setUserData(null);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Sign up with email and password
  const signUp = async (
    email: string,
    password: string,
    displayName: string,
  ) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      // Send verification email
      await sendEmailVerification(userCredential.user);

      // Create user document
      await createUserDocument(userCredential.user, displayName);

      // Sign out immediately - user must verify email first
      await signOut(auth);

      throw new Error("VERIFICATION_REQUIRED");
    } catch (error: any) {
      console.error("Sign up error:", error);
      throw error;
    }
  };

  // Sign in with email and password
  const signIn = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );

      // Check if email is verified (skip for admin)
      if (!userCredential.user.emailVerified && email !== ADMIN_EMAIL) {
        await signOut(auth);
        throw new Error("EMAIL_NOT_VERIFIED");
      }

      // Load user data
      await loadUserData(userCredential.user.uid);
    } catch (error: any) {
      console.error("Sign in error:", error);
      throw error;
    }
  };

  // Sign in with Google
  const signInWithGoogle = async () => {
    try {
      const {
        GoogleSignin,
      } = require("@react-native-google-signin/google-signin");

      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      // Get Google credential
      const googleCredential = GoogleAuthProvider.credential(
        userInfo.data?.idToken,
      );

      // Sign in with Firebase
      const userCredential = await signInWithCredential(auth, googleCredential);

      // Create user document if first time
      await createUserDocument(userCredential.user);
    } catch (error: any) {
      // Check if it's a native module error
      if (
        error.message?.includes("RNGoogleSignin") ||
        error.message?.includes("not available")
      ) {
        throw new Error(
          "Google Sign-In not available. Please use email/password login or build with expo run:android",
        );
      }
      console.error("Google sign in error:", error);
      throw error;
    }
  };

  // Logout
  const logout = async () => {
    try {
      await signOut(auth);
      await GoogleSignin.signOut();
      setUser(null);
      setUserData(null);
      setIsAdmin(false);
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    isAdmin,
    userData,
    signIn,
    signUp,
    signInWithGoogle,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
