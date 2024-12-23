import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import axios from "axios";

import { SafeAreaView } from "react-native-safe-area-context";
import { Link, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function ForgetPass() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleForgetPass = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "https://backend.cheb.antopolis.xyz/api/public/customerAuth/forgotcustomerPassword",
        { email }
      );
      if (response.data.token) {
        setSuccess(
          "A link to reset your password has been sent to your email."
        );
        setTimeout(() => {
          router.push("/forgetEmail");
        }, 1500);
      }
    } catch (err: any) {
      if (err.response.data.message === "No Customer found with this email!!") {
        setError("No account found with this email address. Please try again");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="items-center justify-center flex-1 p-4">
        <Text className="mt-4 text-xl font-bold text-center">
          Forget Password
        </Text>
        <View className="my-4">
          <Text>
            Enter your email address and we will send you a link to reset your
            password.
          </Text>
          <TextInput
            className="p-2 mt-2 border border-gray-300 rounded"
            placeholder="Enter your email address"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            placeholderTextColor="#000"
            onChangeText={setEmail}
          />
          {error ? <Text className="mt-2 text-red-500">{error}</Text> : null}
          {success ? (
            <Text className="mt-2 text-green-500">{success}</Text>
          ) : null}
          <View className="flex-row items-center justify-between mt-5">
            <Link href="/signIn">
              <Text className="mt-4 text-base font-bold text-gray-600 underline">
                Back to Sign In
              </Text>
            </Link>
            <TouchableOpacity
              className="items-center w-32 p-3 mt-4 bg-black rounded-full"
              onPress={handleForgetPass}
              disabled={loading}
            >
              <Text className="text-lg text-white">
                {loading ? <ActivityIndicator /> : "Submit"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
}
