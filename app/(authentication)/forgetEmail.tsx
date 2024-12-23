import { View, Text } from "react-native";
import React from "react";

import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function ForgetEmail() {
  return (
    <SafeAreaView className="items-center justify-center flex-1">
      <View className="p-5 mx-10 rounded-lg bg-slate-200">
        <Text className="mb-4 text-lg font-bold text-center">
          Forgot Password Email
        </Text>
        <Text>1. Check Your Inbox</Text>
        <Text>2. Open email titled `Reset Forgotten Password`.</Text>
        <Text>3. Click the Forgot Password Link</Text>
        <Text>
          4. Once you`ve clicked the link, you`ll be redirect to forgotten
          password page and you can reset your password. You`re all set!
        </Text>
        <Text>5. Then login in the cheb App</Text>
      </View>

      <Link href="/signIn" className="px-6 py-3 mt-8 bg-black rounded-full">
        <Text className="text-lg text-white">SignIn</Text>
      </Link>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
}
