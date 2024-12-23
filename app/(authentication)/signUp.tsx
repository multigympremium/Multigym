import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";

import { Feather, Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import axios from "axios";
import { StatusBar } from "expo-status-bar";
const SignUpScreen: React.FC = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [nameError, setNameError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [mobileError, setMobileError] = useState<string>("");
  const [imageError, setImageError] = useState<string>("");

  const handleImagePick = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      setImageError(
        "You need to grant media library permissions to upload an image."
      );
      return;
    }

    const result: ImagePicker.ImagePickerResult =
      await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
      });

    if (result.canceled) {
      return;
    }

    if (result.assets.length > 0) {
      setImage(result.assets[0].uri);
      setImageError("");
    } else {
      setImageError("Failed to get image URI");
    }
  };

  const validateEmail = (email: string) => {
    // Regular expression for basic email validation
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async () => {
    let valid = true;

    if (!name) {
      setNameError("Name is required");
      valid = false;
    } else {
      setNameError("");
    }

    if (!email) {
      setEmailError("Email is required");
      valid = false;
    } else if (!validateEmail(email)) {
      setEmailError("Invalid email format");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Password is required");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (!mobile) {
      setMobileError("Mobile number is required");
      valid = false;
    } else {
      setMobileError("");
    }

    if (!image) {
      setImageError("Display Picture is required");
      valid = false;
    } else {
      setImageError("");
    }

    if (!valid) {
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("mobile", mobile);

    const fileInfo = await FileSystem.getInfoAsync(image as any);
    const fileType = fileInfo.uri.split(".").pop();
    const fileName = fileInfo.uri.split("/").pop();

    formData.append("dp", {
      uri: image,
      name: "dp.jpg",
      type: `image/${fileType}`,
    } as any);

    try {
      const response = await axios.post(
        "https://multigym-management-server-dmmji.ondigitalocean.app/api/users/post",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 201) {
        router.push("/verify");
      }
      if (response.data.message.includes("E11000 duplicate")) {
        setMobileError(
          "This mobile number is already registered. Please use another number."
        );
      }
    } catch (error) {
      console.error("Error response:", error?.response?.data?.message);
      if (error?.response?.data?.message === "Customer Exists") {
        setEmailError("Email already exists. Please try another email.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 20 }}>
      <View style={{ alignItems: "center", marginTop: 20 }}>
        {/* <Image
          source={require("./../../assets/images/backgroud/CheB NEW Logo.png")}
          style={{ width: 220, height: 76 }}
          contentFit="contain"
        /> */}
      </View>
      <Text style={{ marginTop: 20, fontSize: 24, textAlign: "center" }}>
        Create an account
      </Text>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        {/* Your scrollable content */}
        <View style={{ marginTop: 20 }}>
          <View style={{ marginBottom: 10 }}>
            <Text style={{ marginBottom: 5 }}>Name</Text>
            <TextInput
              style={{
                padding: 10,
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 5,
              }}
              placeholder="Enter your name"
              value={name}
              onChangeText={(text) => {
                setName(text);
                setNameError("");
              }}
              placeholderTextColor="#000"
            />
            {nameError ? (
              <Text style={{ color: "red" }}>{nameError}</Text>
            ) : null}
          </View>
          <View style={{ marginBottom: 10 }}>
            <Text style={{ marginBottom: 5 }}>Email</Text>
            <TextInput
              style={{
                padding: 10,
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 5,
              }}
              placeholder="Enter your email address"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                setEmailError("");
              }}
              keyboardType="email-address"
              placeholderTextColor="#000"
            />
            {emailError ? (
              <Text style={{ color: "red" }}>{emailError}</Text>
            ) : null}
          </View>
          <View style={{ marginBottom: 10 }}>
            <Text style={{ marginBottom: 5 }}>Password</Text>
            <TextInput
              style={{
                padding: 10,
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 5,
              }}
              placeholder="Enter your password"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                setPasswordError("");
              }}
              secureTextEntry
              placeholderTextColor="#000"
            />
            {passwordError ? (
              <Text style={{ color: "red" }}>{passwordError}</Text>
            ) : null}
          </View>
          <View style={{ marginBottom: 10 }}>
            <Text style={{ marginBottom: 5 }}>Mobile</Text>
            <TextInput
              style={{
                padding: 10,
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 5,
              }}
              placeholder="Enter your mobile number"
              value={mobile}
              onChangeText={(text) => {
                setMobile(text);
                setMobileError("");
              }}
              keyboardType="phone-pad"
              placeholderTextColor="#000"
            />
            {mobileError ? (
              <Text style={{ color: "red" }}>{mobileError}</Text>
            ) : null}
          </View>
        </View>

        <Text style={{ marginTop: 10, marginBottom: 5, fontSize: 16 }}>
          Display Picture
        </Text>
        <TouchableOpacity
          style={{ alignItems: "center", marginBottom: 20 }}
          onPress={handleImagePick}
        >
          {image ? (
            <Image
              source={{ uri: image }}
              style={{ width: 150, height: 150, borderRadius: 8 }}
              contentFit="contain"
            />
          ) : (
            <View
              style={{
                width: "100%",
                height: 130,
                borderWidth: 2,
                borderColor: "#D1D5DB",
                borderRadius: 8,
                borderStyle: "dashed",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#F3F4F6",
              }}
            >
              <Feather name="image" size={28} color="gray" />
              <Text style={{ marginTop: 5, color: "gray" }}>Attach a file</Text>
            </View>
          )}
          {imageError ? (
            <Text style={{ color: "red", marginTop: 5 }}>{imageError}</Text>
          ) : null}
        </TouchableOpacity>
      </KeyboardAvoidingView>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 30,
        }}
      >
        <TouchableOpacity
          style={{
            width: 50,
            height: 50,
            backgroundColor: "white",
            borderRadius: 25,
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 1,
            borderColor: "#ccc",
          }}
        >
          <Link href="/" style={{ fontSize: 24, color: "black" }}>
            <Ionicons name="arrow-back-outline" size={24} color="black" />
          </Link>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 20,
            paddingVertical: 10,
            backgroundColor: "black",
            borderRadius: 20,
          }}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={{ color: "white", fontSize: 18 }}>SignUp</Text>
          )}
        </TouchableOpacity>
      </View>

      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

export default SignUpScreen;
