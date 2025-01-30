import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updatePassword,
  sendEmailVerification,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config.ts";
import UseAxiosSecure from "../hooks/UseAxioSecure";
import * as Google from "expo-auth-session/providers/google";
import * as Facebook from "expo-auth-session/providers/facebook";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import PropTypes from "prop-types";
// import { clerkSetActive } from "@clerk/clerk-expo"; // Or "@clerk/clerk-expo" for React Native
import Toast from "react-native-toast-message"; // For notifications

export const AuthContext = createContext(null);

export const useContextAuth = () => {
  return useContext(AuthContext);
};

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [branch, setBranch] = useState("");
  const [isAddPackageBtn, setIsAddPackageBtn] = useState(false);
  const [isEmailVarified, setIsEmailVarified] = useState(false);
  const axiosSecure = UseAxiosSecure();

  const showAlert = (title, message) => {
    Alert.alert(title, message, [{ text: "OK" }]);
  };

  const createUser = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Send email verification
      try {
        await sendEmailVerification(user);
        showAlert(
          "Verification Email Sent",
          "Please check your email to verify your account."
        );
      } catch (verificationError) {
        console.error("Error sending email verification:", verificationError);
        showAlert(
          "Verification Error",
          "Failed to send verification email. Please try again."
        );
      }

      // Log out the user after sending verification email
      await logOut();
    } catch (error) {
      console.error("Error creating user:", error);
      showAlert("Sign-up Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  const checkUserExistenceAndRole = async (userEmail) => {
    setLoading(true);
    try {
      const response = await axiosSecure.get(
        `/users/user_by_email/${userEmail}`
      );
      if (!response.data.isExistUser) {
        showAlert(
          "User not found",
          "You are not registered in our system. Please contact support."
        );
        return null;
      }

      const userData = response.data;
      if (!(userData.card_no && userData.member_id)) {
        showAlert(
          "Registration Successful",
          "Please visit our office for updates."
        );
        await logOut();
        return null;
      }

      setUser(userData);
      await AsyncStorage.setItem("user", JSON.stringify(userData));
      return userData;
    } catch (error) {
      console.error("Error during user existence and role check:", error);
      showAlert("Sign-in Error", error.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const signInUser = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      if (!user.emailVerified) {
        showAlert(
          "Email not verified",
          "Please verify your email before signing in."
        );
        await logOut();
        setLoading(false);
        return null;
      }

      return await checkUserExistenceAndRole(user.email);
    } catch (error) {
      console.error("Error during sign-in:", error);
      showAlert(
        "Sign-in Error",
        "Incorrect user ID or password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const result = await Google.logInAsync({
        clientId: "<Your Google OAuth Client ID>",
      });
      if (result.type === "success") {
        return await checkUserExistenceAndRole(result.user.email);
      }
    } catch (error) {
      console.error("Error during Google sign-in:", error);
      showAlert("Google Sign-in Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  const signInWithFacebook = async () => {
    setLoading(true);
    try {
      const result = await Facebook.logInAsync({
        appId: "<Your Facebook App ID>",
      });
      if (result.type === "success") {
        return await checkUserExistenceAndRole(result.user.email);
      }
    } catch (error) {
      console.error("Error during Facebook sign-in:", error);
      showAlert("Facebook Sign-in Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  const resetPasswordWithEmail = async (email) => {
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      showAlert("Reset Email Sent", "Check your email to reset your password.");
    } finally {
      setLoading(false);
    }
  };

  const handleSetNewPassword = async (newPassword) => {
    setLoading(true);
    try {
      const currentUser = auth?.currentUser;
      if (currentUser) {
        await updatePassword(currentUser, newPassword);
        showAlert(
          "Password Updated",
          "Your password has been successfully updated."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const logOut = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      await AsyncStorage.removeItem("user");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(false);
      if (currentUser) {
        const userData = await checkUserExistenceAndRole(currentUser.email);
        setUser(userData);
      } else {
        await AsyncStorage.removeItem("user");
        setUser(null);
      }
    });
    return () => unSubscribe();
  }, [axiosSecure, branch]);

  useEffect(() => {
    if (user) setBranch(user?.branch);
  }, [user]);

  const logout = async () => {
    setLoading(true);
    try {
      // Clear the active session
      await setActive({ session: null });

      Toast.show({
        type: "success",
        text1: "Logout successful!",
      });

      // Optionally, navigate to the login page or home screen
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Logout failed. Please try again later.",
      });
      console.error("Logout error:", error);
    } finally {
      setLoading(false);
    }
  };

  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    createUser,
    signInUser,
    signInWithGoogle,
    signInWithFacebook,
    resetPasswordWithEmail,
    handleSetNewPassword,
    logOut,
    isAddPackageBtn,
    setIsAddPackageBtn,
    branch,
    auth,
    setIsEmailVarified,
    isEmailVarified,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default ContextProvider;

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
