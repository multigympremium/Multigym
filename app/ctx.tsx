import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { useStorageState } from "../context/useStorageState";

type AuthContextType = {
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  signIn: async () => {},
  signOut: () => null,
  session: null,
  isLoading: false,
});

export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error(
        "useSession must be wrapped in a <SessionProvider /> component"
      );
    }
  }

  return value;
}

export function AppProvider(props: React.PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");

  const signIn = async (email: string, password: string) => {
    try {
      const apiUrl = `${process.env.EXPO_PUBLIC_API_URL}api/public/customerAuth/login/`;
      const response = await axios.post(apiUrl, { email, password });
      console.log(response);
      if (response.data.token) {
        setSession(response.data.token);
      }
    } catch (error: any) {
      console.log(error.response);
      throw new Error(error.response?.data?.message || "Sign-in failed");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut: () => {
          setSession(null);
        },
        session,
        isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
