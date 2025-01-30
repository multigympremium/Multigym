// app/(authentication)/_layout.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Link, Stack } from "expo-router";
import { useAuth } from "@/context/AppContext"; // Assuming you have a custom AuthContext

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  // const { user } = useAuth(); // Assuming the `useAuth` hook provides the user state

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
