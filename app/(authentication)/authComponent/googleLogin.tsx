// // // com.auth0samples://{yourDomain}/ios/com.auth0samples/callback,com.auth0samples://{yourDomain}/android/com.auth0samples/callback
// // // com.auth0samples://{yourDomain}/ios/com.auth0samples/callback,com.auth0samples://{yourDomain}/android/com.auth0samples/callback

// // import React, { useState } from "react";
// // import { Button } from "react-native";
// // import * as Google from "expo-auth-session/providers/google";
// // import firebase from "@/firebase-config";
// // import { useAuth0 } from "react-native-auth0";

// // const GoogleLogin = () => {
// //   const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
// //     clientId:
// //       "226606973961-6l2p3vmndr1s6ta0o4d9mubqk4cdtoeg.apps.googleusercontent.com",
// //   });

// //   React.useEffect(() => {
// //     if (response?.type === "success") {
// //       const { id_token } = response.params;
// //       const credential = firebase.auth.GoogleAuthProvider.credential(id_token);
// //       firebase
// //         .auth()
// //         .signInWithCredential(credential)
// //         .then((userCredential) => {
// //           console.log("Signed in with Google!", userCredential);
// //         })
// //         .catch((error) => {
// //           console.error("Error signing in with Google", error);
// //         });
// //     }
// //   }, [response]);

// //   const { authorize } = useAuth0();

// //   const onPress = async () => {
// //     try {
// //       const res = await authorize();

// //       console.log(res, "res");
// //     } catch (e) {
// //       console.log(e);
// //     }
// //   };

// //   return (
// //     <Button
// //       title="Login with Google"
// //       disabled={!request}
// //       // onPress={() => promptAsync()}
// //       onPress={onPress}
// //     />
// //   );
// // };

// // export default GoogleLogin;

// import React from "react";
// import { Button, View, Text } from "react-native";
// import { useAuth0 } from "react-native-auth0";

// const LoginScreen = () => {
//   const { authorize, error, isLoading, user } = useAuth0();

//   const onLogin = async () => {
//     try {
//       await authorize({
//         // scope: "openid profile email", // Request user info
//         // audience: "YOUR_API_AUDIENCE", // Optional (if using APIs)
//       });
//     } catch (e) {
//       console.error(e);
//     }
//   };

//   const onLogout = async () => {
//     try {
//       await clearSession();
//     } catch (e) {
//       console.error(e);
//     }
//   };

//   return (
//     <View>
//       {user ? (
//         <View>
//           <Text>Welcome, {user.name}</Text>
//           <Button onPress={onLogout} title="Logout" />
//         </View>
//       ) : (
//         <Button onPress={onLogin} title="Login" disabled={isLoading} />
//       )}
//       {error && <Text>Error: {error.message}</Text>}
//     </View>
//   );
// };

// export default LoginScreen;

import React from "react";
import * as WebBrowser from "expo-web-browser";
import { Text, View, Button, TouchableOpacity, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { useOAuth } from "@clerk/clerk-expo";
import * as Linking from "expo-linking";
import { AntDesign } from "@expo/vector-icons";

export const useWarmUpBrowser = () => {
  React.useEffect(() => {
    // Warm up the android browser to improve UX
    // https://docs.expo.dev/guides/authentication/#improving-user-experience
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();

export default function GoogleLogin() {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow({
          redirectUrl: Linking.createURL("/dashboard", { scheme: "myapp" }),
        });

      // If sign in was successful, set the active session
      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      } else {
        // Use signIn or signUp returned from startOAuthFlow
        // for next steps, such as MFA
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  }, []);

  return (
    <TouchableOpacity
      //  onPress={() => handleSocialPopupLogin("oauth_google")}
      onPress={onPress}
    >
      <View style={{ ...styles.button }}>
        <AntDesign name="google" size={24} color="#000" />
        <Text style={{ color: "#000", fontSize: 19, textAlign: "center" }}>
          Continue with Google
        </Text>
      </View>
    </TouchableOpacity>
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
