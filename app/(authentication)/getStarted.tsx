import React, { useState, useCallback } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Animated from "react-native-reanimated";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import { useAuth, useClerk, useOAuth } from "@clerk/clerk-expo";
import * as Linking from "expo-linking";
import Toast from "react-native-toast-message";
import * as WebBrowser from "expo-web-browser";
import GoogleLogin from "./authComponent/googleLogin";
import FacebookLogin from "./authComponent/FacebookLogin";
import AppleLogin from "./authComponent/AppleLogin";

WebBrowser.maybeCompleteAuthSession();

export const useWarmUpBrowser = () => {
  React.useEffect(() => {
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

export default function GetStarted() {
  const [loading, setLoading] = useState(false);

  useWarmUpBrowser();

  const handleSocialPopupLogin = useCallback(async (strategy) => {
    console.log("Selected strategy: ", strategy);

    // Destructure the required method from the useOAuth hook
    const { startOAuthFlow } = useOAuth({ strategy });

    if (!startOAuthFlow) {
      console.error(`OAuth strategy ${strategy} is not supported.`);
      return;
    }

    try {
      // Start the OAuth flow, providing the redirect URL for the app
      const { createdSessionId, setActive } = await startOAuthFlow({
        redirectUrl: Linking.createURL("/", { scheme: "myapp" }),
      });

      if (createdSessionId) {
        // Activate the session upon successful OAuth login
        await setActive({ session: createdSessionId });
        Toast.show({
          type: "success",
          text1: `${strategy
            .replace("oauth_", "")
            .toUpperCase()} login successful!`,
        });
      }
    } catch (err) {
      console.error("OAuth flow failed: ", err);
      Toast.show({
        type: "error",
        text1: `${strategy.replace("oauth_", "").toUpperCase()} login failed!`,
        text2: err.message || "Please try again later.",
      });
    }
  }, []);

  const data = {
    id: "1",
    title: "Welcome",
    description:
      "Ready to start a one-of-a-kind customized program designed to reach YOUR health goals? Workouts, meal plans, calorie tracker.",
    image:
      "https://images.pexels.com/photos/949132/pexels-photo-949132.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  };

  // const handleSignOut = async () => {
  //   try {
  //     await signOut();
  //     Toast.show({
  //       type: "success",
  //       text1: "Successfully logged out",
  //     });
  //   } catch (err) {
  //     Toast.show({
  //       type: "error",
  //       text1: "Logout failed!",
  //       text2: err.message || "Please try again later.",
  //     });
  //   }
  // };

  return (
    <Animated.ScrollView style={{ backgroundColor: "#fff", flex: 1 }}>
      <StatusBar style="light" backgroundColor="transparent" />
      <SafeAreaView>
        <View style={styles.slide}>
          <Image source={{ uri: data.image }} style={styles.image} />
          <Text style={styles.title}>{data.title}</Text>
          <Text style={styles.description}>{data.description}</Text>
        </View>
        <View style={styles.socialLogin}>
          <GoogleLogin />
          <AppleLogin />
          <FacebookLogin />
          {/* Apple login */}
          {/* <TouchableOpacity
            onPress={() => handleSocialPopupLogin("oauth_apple")}
          >
            <View style={{ ...styles.button, backgroundColor: "#000" }}>
              <AntDesign name="apple1" size={28} color="white" />
              <Text
                style={{ color: "white", fontSize: 20, textAlign: "center" }}
              >
                Continue with Apple
              </Text>
            </View>
          </TouchableOpacity> */}

          {/* Facebook login */}
          {/* <TouchableOpacity
            onPress={() => handleSocialPopupLogin("oauth_facebook")}
          >
            <View style={{ ...styles.button }}>
              <Entypo name="facebook-with-circle" size={24} color="#47a7f5" />
              <Text
                style={{ color: "#47a7f5", fontSize: 19, textAlign: "center" }}
              >
                Continue with Facebook
              </Text>
            </View>
          </TouchableOpacity> */}
          {/* <GoogleLogin /> */}

          {/* Google login */}

          {/* Logout button */}
          {/* <TouchableOpacity onPress={handleSignOut} style={styles.linkButton}>
            <Text style={{ color: "#000", fontSize: 19, textAlign: "center" }}>
              Log Out
            </Text>
          </TouchableOpacity> */}
        </View>
      </SafeAreaView>
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  slide: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: -25,
  },
  image: {
    width: "100%",
    height: 430,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 20,
    color: "#333",
  },
  description: {
    fontSize: 16,
    color: "#555",
    marginTop: 5,
    textAlign: "center",
    lineHeight: 25,
  },
  socialLogin: {
    flexDirection: "column",
    justifyContent: "center",
    marginTop: 20,
    gap: 10,
  },
  button: {
    padding: 16,
    marginTop: 10,
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    display: "flex",
    gap: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  linkButton: {
    padding: 16,
    marginTop: 10,
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    justifyContent: "center",
    alignItems: "center",
  },
});

// import * as React from "react";
// import { Text, TextInput, Button, View } from "react-native";
// import { useSignUp } from "@clerk/clerk-expo";
// import { useRouter } from "expo-router";

// export default function SignUpScreen() {
//   const { isLoaded, signUp, setActive } = useSignUp();
//   const router = useRouter();

//   const [emailAddress, setEmailAddress] = React.useState("");
//   const [password, setPassword] = React.useState("");
//   const [pendingVerification, setPendingVerification] = React.useState(false);
//   const [code, setCode] = React.useState("");

//   // Handle submission of sign-up form
//   const onSignUpPress = async () => {
//     if (!isLoaded) return;

//     // Start sign-up process using email and password provided
//     try {
//       await signUp.create({
//         emailAddress,
//         password,
//       });

//       // Send user an email with verification code
//       await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

//       // Set 'pendingVerification' to true to display second form
//       // and capture OTP code
//       setPendingVerification(true);
//     } catch (err) {
//       // See https://clerk.com/docs/custom-flows/error-handling
//       // for more info on error handling
//       console.error(JSON.stringify(err, null, 2));
//     }
//   };

//   // Handle submission of verification form
//   const onVerifyPress = async () => {
//     if (!isLoaded) return;

//     try {
//       // Use the code the user provided to attempt verification
//       const signUpAttempt = await signUp.attemptEmailAddressVerification({
//         code,
//       });

//       // If verification was completed, set the session to active
//       // and redirect the user
//       if (signUpAttempt.status === "complete") {
//         await setActive({ session: signUpAttempt.createdSessionId });
//         router.replace("/");
//       } else {
//         // If the status is not complete, check why. User may need to
//         // complete further steps.
//         console.error(JSON.stringify(signUpAttempt, null, 2));
//       }
//     } catch (err) {
//       // See https://clerk.com/docs/custom-flows/error-handling
//       // for more info on error handling
//       console.error(JSON.stringify(err, null, 2));
//     }
//   };

//   if (pendingVerification) {
//     return (
//       <>
//         <Text>Verify your email</Text>
//         <TextInput
//           value={code}
//           placeholder="Enter your verification code"
//           onChangeText={(code) => setCode(code)}
//         />
//         <Button title="Verify" onPress={onVerifyPress} />
//       </>
//     );
//   }

//   return (
//     <View>
//       <>
//         <Text>Sign up</Text>
//         <TextInput
//           autoCapitalize="none"
//           value={emailAddress}
//           placeholder="Enter email"
//           onChangeText={(email) => setEmailAddress(email)}
//         />
//         <TextInput
//           value={password}
//           placeholder="Enter password"
//           secureTextEntry={true}
//           onChangeText={(password) => setPassword(password)}
//         />
//         <Button title="Continue" onPress={onSignUpPress} />
//       </>
//     </View>
//   );
// }
