import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SignInScreen = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleContinue = () => {
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
    } else {
      setError("");
      router.push(`/${email}`); // Replace with your next page's route name
    }
  };

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  return (
    <SafeAreaView>
      <View className="p-4 ">
        {/* <Image
          source={require("./../../assets/images/backgroud/CheB NEW Logo.png")}
          style={{ width: 220, height: 76 }}
          contentFit="contain"
          className="mx-auto mb-4 text-center"
        /> */}
        <Text className="my-4 text-xl">Enter your email to sign in.</Text>
        <View className="mb-4">
          <View className="flex-row my-4">
            <Text className="text-black">United State </Text>
            <Text className="underline text-slate-600">Change</Text>
          </View>
          <TextInput
            className="p-2 mt-2 border border-gray-300 rounded"
            placeholder="Enter your email address"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#000"
          />
          {error ? <Text className="mt-2 text-red-500">{error}</Text> : null}
        </View>
        <Text className="mb-4 text-gray-600">
          By continuing, I agree to CheB's{" "}
          <Text className="text-indigo-600 underline">Privacy Policy</Text>
        </Text>
        <View className="flex-row justify-end">
          <TouchableOpacity
            className="items-center w-32 p-3 mt-4 bg-black rounded-full"
            onPress={handleContinue}
          >
            <Text className="text-lg text-white">Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

export default SignInScreen;
