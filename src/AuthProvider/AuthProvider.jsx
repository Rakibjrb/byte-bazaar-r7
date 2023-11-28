import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import auth from "../firebase/firebase.config";
import useAxiosPublic from "../Hooks/useAxiosPublic";

export const AuthContext = createContext(null);

//providers
const googleAuthProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [userLoading, setUserLoading] = useState(true);
  const [user, setUser] = useState();
  const axios = useAxiosPublic();

  const googleLogin = () => {
    return signInWithPopup(auth, googleAuthProvider);
  };

  const updateUserAccount = (
    name = "user19419",
    photo = "https://i.ibb.co/5x441PC/user.png"
  ) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  const emailPasswordSignUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const userLogin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    return signOut(auth);
  };

  const authInfo = {
    user,
    userLoading,
    setUserLoading,
    googleLogin,
    logOut,
    emailPasswordSignUp,
    updateUserAccount,
    userLogin,
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setUserLoading(false);

      //token create and clear

      if (user) {
        const email = user.email;
        axios
          .post("/create-token", { email })
          .then((res) => localStorage.setItem("token", res.data?.token))
          .catch((err) => console.log(err));
      } else {
        localStorage.removeItem("token");
      }
    });

    return () => unSubscribe();
  }, [axios]);

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};
export default AuthProvider;
