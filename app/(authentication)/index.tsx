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
import { Image } from "expo-image";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import InitialPageSlider from "../../components/Carousels/InitialPageSlider";

export default function BeforeAuth() {
  const data = [
    {
      title: "Welcome",
      description:
        "Ready to start one-of-a-kind customized program designed to reach YOUR health goals? Workouts, meal plans calorie tracker.",
      image:
        "https://images.pexels.com/photos/949132/pexels-photo-949132.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      title: "Get moving",
      description:
        "Ready to start one-of-a-kind customized program designed to reach YOUR health goals? Workouts, meal plans calorie tracker.",
      image:
        "https://images.pexels.com/photos/949132/pexels-photo-949132.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      title: "Enjoy balanced nutrition.",
      description:
        "Ready to start one-of-a-kind customized program designed to reach YOUR health goals? Workouts, meal plans calorie tracker.",
      image:
        "https://images.pexels.com/photos/949132/pexels-photo-949132.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
  ];

  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: "#fff", height: "100%" }}
    >
      <View className="items-center justify-center flex-1">
        {/* <Image
          source={require("./../../assets/images/backgroud/CheB NEW Logo.png")}
          style={{ width: 220, height: 76 }}
          contentFit="contain" // This ensures the image scales to fit without cropping
        /> */}
      </View>
      <InitialPageSlider data={data} />
      <View className="flex-row justify-center gap-8 mb-20 ">
        <TouchableOpacity className="px-6 py-3 bg-black rounded-full">
          <Link href="/signUp">
            <Text className="text-lg text-white rounded-full">Join Us</Text>
          </Link>
        </TouchableOpacity>
        <TouchableOpacity className="px-6 py-3 bg-white rounded-full">
          <Link href="/signIn">
            <Text className="text-lg text-black">Sign In</Text>
          </Link>
        </TouchableOpacity>
      </View>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  slide: {
    backgroundColor: "#ddd",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
});
