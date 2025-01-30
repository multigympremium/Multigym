// import {
//   DarkTheme,
//   DefaultTheme,
//   ThemeProvider,
// } from "@react-navigation/native";
// import { useFonts } from "expo-font";
// import { Redirect, Slot, Stack } from "expo-router";
// import * as SplashScreen from "expo-splash-screen";
// import { StatusBar } from "expo-status-bar";
// import { useEffect } from "react";
// import "react-native-reanimated";
// import "./index.css";
// import { useColorScheme } from "@/hooks/useColorScheme";
// import ContextProvider from "@/context/AppContext";
// import { tokenCache } from "@/cache";
// import { useAuth0, Auth0Provider } from "react-native-auth0";
// import { ClerkProvider, ClerkLoaded, useAuth } from "@clerk/clerk-expo";

// // Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();

// export default function RootLayout() {
//   const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

//   if (!publishableKey) {
//     throw new Error("Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env");
//   }

//   const colorScheme = useColorScheme();
//   const [loaded] = useFonts({
//     SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
//   });

//   useEffect(() => {
//     if (loaded) {
//       SplashScreen.hideAsync();
//     }
//   }, [loaded]);

//   if (!loaded) {
//     return null;
//   }

//   const { isSignedIn } = useAuth();

//   if (isSignedIn) {
//     return <Redirect href={"/"} />;
//   }

//   return (
//     <ContextProvider>
//       <StatusBar style="auto" />
//       <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
//         {/* <Auth0Provider
//           domain={"dev-heh3joup4drxixhj.us.auth0.com"}
//           clientId={"i2hm8l7Kjp3DmNIV7JWc7dLGtkpNN2df"}
//         > */}
//         <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
//           <ClerkLoaded>
//             {/* <Stack>
//               <Stack.Screen
//                 name="(authentication)"
//                 options={{ headerShown: false }}
//               />
//               <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//               <Stack.Screen name="+not-found" />
//             </Stack> */}
//             <Slot />
//           </ClerkLoaded>
//         </ClerkProvider>
//         {/* </Auth0Provider> */}
//       </ThemeProvider>
//     </ContextProvider>
//   );
// }

import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Redirect, Slot, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import "./index.css";
import { useColorScheme } from "@/hooks/useColorScheme";
import ContextProvider from "@/context/AppContext";
import { tokenCache } from "@/cache";
import { ClerkProvider, ClerkLoaded, useAuth } from "@clerk/clerk-expo";
import * as Linking from "expo-linking";
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

  if (!publishableKey) {
    throw new Error("Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env");
  }

  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <ClerkLoaded>
        <ContextProvider>
          <StatusBar style="auto" />
          <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
          >
            <Slot />
            {/* <AuthHandler /> */}
          </ThemeProvider>
        </ContextProvider>
      </ClerkLoaded>
    </ClerkProvider>
  );
}

// function AuthHandler() {
//   const { isSignedIn } = useAuth();

//   if (isSignedIn) {
//     return <Redirect href={"/"} />;
//   }

//   return <Slot />;
// }
