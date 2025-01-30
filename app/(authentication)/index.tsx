import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import InitialPageSlider from "@/components/Carousels/InitialPageSlider";
import Animated from "react-native-reanimated";
import {
  SignedIn,
  SignedOut,
  useAuth,
  useClerk,
  useUser,
} from "@clerk/clerk-expo";
import * as Linking from "expo-linking";

export default function BeforeAuth() {
  const { user } = useUser();
  const { isSignedIn }: any = useAuth();
  const { signOut }: any = useClerk();
  console.log(Linking.createURL("/Home"), "Linking ");

  console.log(isSignedIn, "isSignedIn");

  const data = [
    {
      id: "1",
      title: "Welcome",
      description:
        "Ready to start one-of-a-kind customized program designed to reach YOUR health goals? Workouts, meal plans calorie tracker.",
      image:
        "https://images.pexels.com/photos/949132/pexels-photo-949132.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: "2",
      title: "Get moving",
      description:
        "Ready to start one-of-a-kind customized program designed to reach YOUR health goals? Workouts, meal plans calorie tracker.",
      image:
        "https://images.pexels.com/photos/949132/pexels-photo-949132.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: "3",
      title: "Enjoy balanced nutrition.",
      description:
        "Ready to start one-of-a-kind customized program designed to reach YOUR health goals? Workouts, meal plans calorie tracker.",
      image:
        "https://images.pexels.com/photos/949132/pexels-photo-949132.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
  ];

  return (
    <Animated.ScrollView
      className="flex-1"
      style={{ backgroundColor: "#fff", height: "100%" }}
    >
      <StatusBar style="light" backgroundColor="transparent" />
      <SafeAreaView>
        <InitialPageSlider data={data} />
        <View className="flex-row justify-center gap-8 mb-20 bg-red-500">
          <TouchableOpacity className="px-6 py-3 bg-black rounded-full">
            <Link
              href="/registration"
              style={{
                textDecorationLine: "none",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 10,
                backgroundColor: "#bcf3f1",
                width: "90%",
                height: 50,
                borderRadius: 30,
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <Text
                className="text-lg text-white rounded-full "
                style={{
                  fontSize: 15,
                  textAlign: "center",
                  lineHeight: 50,
                  textTransform: "uppercase",
                  fontWeight: "bold",
                }}
              >
                Get Started
              </Text>
            </Link>
          </TouchableOpacity>
          <TouchableOpacity className="px-6 py-3 bg-white rounded-full">
            <Link href="/getStarted">
              <Text
                style={{
                  fontSize: 15,
                  textAlign: "center",
                  lineHeight: 50,
                  textTransform: "uppercase",
                  fontWeight: "bold",
                }}
              >
                Log In
              </Text>
            </Link>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={{ textAlign: "center" }}>
            By clicking "Get Started" you agree to our
          </Text>
        </View>

        <View style={styles.term_privacy}>
          <Text>
            <Link
              href="/privacy"
              style={{ ...styles.term_privacy_text, marginRight: 10 }}
            >
              Privacy Policy{" "}
            </Link>{" "}
            <Text style={{ fontSize: 15, fontWeight: "bold", marginRight: 90 }}>
              |{" "}
            </Text>{" "}
            <Link
              href="/terms"
              style={{ ...styles.term_privacy_text, marginLeft: 20 }}
            >
              Terms of Service
            </Link>
          </Text>
        </View>
      </SafeAreaView>
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  slide: {
    backgroundColor: "#ddd",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  term_privacy: {
    // flex: "flex",
    // justifyContent: "space-between",
    // alignItems: "center",
    // marginBottom: 10,
    // gap: 10,
  },
  term_privacy_text: {
    fontSize: 15,
    textAlign: "center",
    lineHeight: 50,
    fontWeight: "bold",
  },
});
