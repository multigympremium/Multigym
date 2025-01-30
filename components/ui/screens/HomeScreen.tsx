// screens/HomeScreen.js
import React from "react";
import { View, Text, Button } from "react-native";
import { signOut } from "../services/authService";

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Welcome to Home Screen</Text>
      <Button
        title="Sign Out"
        onPress={() => signOut().then(() => navigation.navigate("Login"))}
      />
    </View>
  );
};

export default HomeScreen;
