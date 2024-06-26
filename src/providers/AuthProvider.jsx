import axios from "axios";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileLoader, setProfileLoader] = useState(false);
  const auth = getAuth(app);

  const logIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // login with google
  const googleProvider = new GoogleAuthProvider();
  const logInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const logOut = () => {
    return signOut(auth);
  };

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const updateName = (user, name) => {
    return updateProfile(user, {
      displayName: name,
    });
  };

  const authInfo = {
    user,
    loading,
    logIn,
    logInWithGoogle,
    logOut,
    createUser,
    updateName,
    profileLoader,
    setProfileLoader,
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Current user: ", currentUser?.email);
      const userEmail = currentUser?.email || user?.email;
      const loggedUser = { email: userEmail };
      setUser(currentUser);
      if (currentUser?.email) {
        axios.post("https://car-doctor-server-pi-jet.vercel.app/jwt", loggedUser, { withCredentials: true }).then((res) => {
          console.log(res.data);
        });
      } else {
        axios.post("https://car-doctor-server-pi-jet.vercel.app/logout", loggedUser, { withCredentials: true }).then((res) => {
          console.log(res.data);
        });
      }
      setLoading(false);
    });

    return () => unSubscribe();
  }, [profileLoader]);
  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthProvider;
