import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { Link, useLocalSearchParams, useRouter } from "expo-router";

import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { useSession } from "../ctx";
import { StatusBar } from "expo-status-bar";

export default function SignInPass() {
  const { signInPass } = useLocalSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { signIn } = useSession();

  const handleSignIn = async () => {
    if (!password) {
      setError("Please enter a password");
    } else {
      setLoading(true);
      try {
        const res = await signIn(signInPass as string, password);
        console.log(res);
        router.push("/inside/(tabs)");
      } catch (error: any) {
        if (error.response.data.message === "Invalid Credentials") {
          setError(
            "Invalid credentials. Please check your email and password and try again"
          );
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <SafeAreaView>
      <View className="p-4">
        <Text className="mt-4 text-xl">Enter your Password</Text>
        <View className="mb-4">
          <View className="flex-row my-4">
            <Text className="font-bold text-black">{signInPass} </Text>
            <Link href="/signIn">
              <Text className="underline text-slate-600">Edit</Text>
            </Link>
          </View>
          <TextInput
            className="p-2 mt-2 border border-gray-300 rounded"
            placeholder="Enter your Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
            placeholderTextColor="#000"
          />
          {error ? <Text className="mt-2 text-red-500">{error}</Text> : null}
        </View>
        <Link href={"/forgetPass"}>
          <Text className="mb-4 text-gray-600 underline">Forgot password?</Text>
        </Link>
        <View className="flex-row justify-end">
          <TouchableOpacity
            className="items-center w-32 p-3 mt-4 bg-black rounded-full"
            onPress={handleSignIn}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className="text-lg text-white">Sign In</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
}
