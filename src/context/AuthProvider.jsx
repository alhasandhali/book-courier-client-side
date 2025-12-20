import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { auth } from "../firebase/firebase.init";
import {
  createUserWithEmailAndPassword,
  deleteUser,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updatePassword,
  updateProfile,
} from "firebase/auth";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Google SignIn
  const signInWithGoogle = (provider) => {
    return signInWithPopup(auth, provider);
  };

  //   Email/Password SignUp
  const signUpWithEmailPass = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //   Email/Password SignIn
  const signInWithEmailPass = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  //   Log Out
  const logOut = () => {
    return signOut(auth);
  };

  // Delete user
  const userDelete = (u) => {
    return deleteUser(u);
  };

  // Update user
  const updateUser = (u, userName, img) => {
    return updateProfile(u, {
      displayName: userName,
      photoURL: img,
    });
  };
  //  Chnage password
  const changePassword = (u, newPassword) => {
    return updatePassword(u, newPassword);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const authInfo = {
    user,
    setUser,
    logOut,
    loading,
    signInWithGoogle,
    signUpWithEmailPass,
    signInWithEmailPass,
    userDelete,
    updateUser,
    changePassword,
  };

  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
