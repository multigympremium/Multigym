// // app/(authentication)/_layout.tsx
// import React from "react";
// import { View, Text, StyleSheet } from "react-native";
// import { Link, Stack } from "expo-router";

// const AuthLayout = ({ children }: { children: React.ReactNode }) => {
//   // const { user } = useAuth(); // Assuming the `useAuth` hook provides the user state

//   return (
//     <Stack>
//       <Stack.Screen name="(authentication)" options={{ headerShown: false }} />
//       <Stack.Screen name="(inside)" options={{ headerShown: true }} />
//       <Stack.Screen name="+not-found" />
//     </Stack>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 20,
//   },
//   loggedInText: {
//     fontSize: 24,
//     marginBottom: 20,
//   },
//   authLinks: {
//     flexDirection: "row",
//     gap: 10,
//     marginBottom: 20,
//   },
// });

// export default AuthLayout;

import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Link, Redirect, Slot, Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons"; // Icons from Expo
import { useAuth } from "@clerk/clerk-expo";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return <Redirect href={"/getStarted"} />;
  }
  return (
    <View style={styles.container}>
      {/* Header */}
      <CustomHeader />

      {/* Screen Content */}
      <View style={styles.content}>
        <Slot />
      </View>

      {/* Footer */}
      <FooterNavigation />
    </View>
  );
};

// ✅ Custom Header Component
const CustomHeader = () => {
  return (
    <View style={styles.header}>
      {/* Menu Icon */}
      <TouchableOpacity onPress={() => console.log("Menu Pressed")}>
        <Ionicons name="menu" size={28} color="#000" />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.headerTitle}>Home</Text>

      {/* Search Icon */}
      <TouchableOpacity onPress={() => console.log("Search Pressed")}>
        <Ionicons name="search" size={24} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

// ✅ Footer Navigation Component
const FooterNavigation = () => {
  const navigation = useRouter();

  return (
    <View style={styles.footer}>
      <TouchableOpacity
        onPress={() => navigation.push("/Home")}
        style={styles.footerButton}
      >
        <Ionicons name="home-outline" size={24} color="black" />
        <Text style={styles.footerText}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.push("/Dietplan")}
        style={styles.footerButton}
      >
        <Ionicons name="nutrition-outline" size={24} color="black" />
        <Text style={styles.footerText}>Diet Plan</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.push("/Workout")}
        style={styles.footerButton}
      >
        <Ionicons name="barbell-outline" size={24} color="black" />
        <Text style={styles.footerText}>Workout</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.footerButton}
        onPress={() => navigation.push("/Profile")}
      >
        <Ionicons name="person-outline" size={24} color="black" />
        <Text style={styles.footerText}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

// ✅ Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 60, // Prevents overlap with footer
  },
  header: {
    flexDirection: "row",
    // backgroundColor: "#007AFF",
    borderBottomWidth: 1,
    borderBottomColor: "#c0c3c6",
    padding: 15,
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 15,
  },
  headerTitle: {
    // color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderTopColor: "#c0c3c6",
    padding: 10,
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  footerText: {
    // color: "white",
    fontSize: 12,
    marginTop: 5,
    textAlign: "center",
  },
  footerButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AuthLayout;
