import { View, Text } from "react-native";
import React from "react";

import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function Verify() {
  return (
    <SafeAreaView className="items-center justify-center flex-1">
      <View className="p-5 mx-10 rounded-lg bg-slate-200">
        <Text className="mb-4 text-lg font-bold text-center">Verify Email</Text>
        <Text>1. Check Your Inbox</Text>
        <Text>2. Open email titled `Account Verification.</Text>
        <Text>3. Click the Verification Link</Text>
        <Text>
          4. Once you`ve clicked the link, you`ll be redirected to our website,
          and your email will be verified. You`re all set!
        </Text>
        <Text>5. Then login in the cheb App</Text>
      </View>

      <Link href="/signIn" className="px-6 py-3 mt-8 bg-black rounded-full">
        <Text className="text-lg text-white">Sign In</Text>
      </Link>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
}
