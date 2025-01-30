// app/(authentication)/_layout.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Link, Redirect, Stack } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  // const { user } = useAuth(); // Assuming the `useAuth` hook provides the user state

  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return <Redirect href={"/Home"} />;
  }

  return <Stack screenOptions={{ headerShown: false }}></Stack>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loggedInText: {
    fontSize: 24,
    marginBottom: 20,
  },
  authLinks: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },
});

export default AuthLayout;
