import React from "react";
import * as WebBrowser from "expo-web-browser";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { useOAuth } from "@clerk/clerk-expo";
import * as Linking from "expo-linking";
import { AntDesign, Entypo } from "@expo/vector-icons";

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

export default function AppleLogin() {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_apple" });
  // const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

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
    <TouchableOpacity onPress={onPress}>
      <View style={{ ...styles.button, backgroundColor: "#000" }}>
        <AntDesign name="apple1" size={28} color="white" />
        <Text style={{ color: "white", fontSize: 20, textAlign: "center" }}>
          Continue with Apple
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
