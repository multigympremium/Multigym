import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Picker } from "@react-native-picker/picker"; // Install this if not already installed
import { MaterialIcons } from "@expo/vector-icons"; // Replace with your preferred icon library
import Swal from "sweetalert2"; // Optional for React Native; consider replacing with Toast or Alert

import { useAuth } from "@/context/AppContext";
import UseAxiosSecure from "@/hooks/UseAxioSecure";
import { Link } from "expo-router";

import { useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

const RegistrationSchema = z
  .object({
    email: z
      .string()
      .email({ message: "Please enter a valid email address" })
      .nonempty("Email is required"),
    full_name: z
      .string()
      .min(4, { message: "Full name must be more than 4 characters" })
      .nonempty("Full name is required"),
    contact_no: z
      .string()
      .regex(/^\d+$/, { message: "Contact number must be numeric" })
      .min(11, { message: "Contact number must be at least 11 digits long" })
      .nonempty("Contact number is required"),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9])/, {
        message:
          "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character",
      })
      .nonempty("Password is required"),
    confirmPassword: z.string().nonempty("Confirm password is required"),
    branch: z.string().nonempty("Branch is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function Registration({ handleBackToLogin }) {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(RegistrationSchema),
  });

  // const { createUser } = useAuth();
  const axiosSecure = UseAxiosSecure();

  const onSubmit = async (data) => {
    try {
      const response = await axiosSecure.post("/users/registration", data);
      if (response.status === 201) {
        // await createUser(data.email, data.password);
        Swal.fire({
          icon: "success",
          title: "Registration Successful!",
          text: "Please verify your email before signing in.",
        });
        handleBackToLogin();
      }
    } catch (error) {
      console.error(error);
      // Handle errors as required for React Native
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/react-logo.png")}
        style={styles.logo}
      />
      <Text style={styles.title}>Create an Account</Text>
      <Text style={styles.subtitle}>Provide your details to continue</Text>

      {/* Full Name Field */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Full Name</Text>
        <Controller
          name="full_name"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.full_name && (
          <Text style={styles.error}>{errors.full_name.message}</Text>
        )}
      </View>

      {/* Branch Selection */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Branch</Text>

        <Picker
          selectedValue={selectedBranch}
          onValueChange={(itemValue) => setSelectedBranch(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select Branch" value="" />
          <Picker.Item label="Shia Masjid Branch" value="shia" />
          <Picker.Item label="Lalmatia Branch" value="lalmatia" />
        </Picker>
        {errors.branch && (
          <Text style={styles.error}>{errors.branch.message}</Text>
        )}
      </View>

      {/* Mobile Number Field */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Mobile Number</Text>
        <Controller
          name="contact_no"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Mobile"
              value={value}
              onChangeText={onChange}
              keyboardType="numeric"
            />
          )}
        />
        {errors.contact_no && (
          <Text style={styles.error}>{errors.contact_no.message}</Text>
        )}
      </View>

      {/* Password Field */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <Controller
          name="password"
          control={control}
          render={({ field: { onChange, value } }) => (
            <View>
              <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry={!isShowPassword}
                value={value}
                onChangeText={onChange}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setIsShowPassword(!isShowPassword)}
              >
                <MaterialIcons
                  name={isShowPassword ? "visibility" : "visibility-off"}
                  size={24}
                  color="gray"
                />
              </TouchableOpacity>
            </View>
          )}
        />
        {errors.password && (
          <Text style={styles.error}>{errors.password.message}</Text>
        )}
      </View>

      {/* Submit Button */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleBackToLogin}>
        <Text style={{ textAlign: "right", fontSize: 17, marginTop: 14 }}>
          Already have an account?{" "}
          <Link href={"/login"} style={styles.loginLink}>
            Sign in
          </Link>{" "}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  logo: { width: 100, height: 100, alignSelf: "center", marginBottom: 20 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "gray",
    textAlign: "center",
    marginBottom: 20,
  },
  inputContainer: { marginBottom: 16 },
  label: { fontSize: 14, color: "gray" },
  input: { borderWidth: 1, borderColor: "gray", padding: 10, borderRadius: 5 },
  picker: { borderWidth: 1, borderColor: "gray", borderRadius: 5 },
  error: { color: "red", fontSize: 12 },
  button: {
    backgroundColor: "#007BFF",
    padding: 16,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: { color: "#fff", fontWeight: "bold", textAlign: "center" },
  loginLink: { color: "#007BFF", textAlign: "center", marginTop: 10 },
  eyeIcon: { position: "absolute", right: 10, top: 10 },
});

// import * as React from "react";
// import { Text, TextInput, Button, View } from "react-native";
// import { useSignUp } from "@clerk/clerk-expo";
// import { useRouter } from "expo-router";

// export default function SignUpScreen() {
//   const { isLoaded, signUp, setActive } = useSignUp();
//   const router = useRouter();

//   const [emailAddress, setEmailAddress] = React.useState("");
//   const [password, setPassword] = React.useState("");
//   const [pendingVerification, setPendingVerification] = React.useState(false);
//   const [code, setCode] = React.useState("");

//   // Handle submission of sign-up form
//   const onSignUpPress = async () => {
//     if (!isLoaded) return;

//     // Start sign-up process using email and password provided
//     try {
//       await signUp.create({
//         emailAddress,
//         password,
//       });

//       // Send user an email with verification code
//       await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

//       // Set 'pendingVerification' to true to display second form
//       // and capture OTP code
//       setPendingVerification(true);
//     } catch (err) {
//       // See https://clerk.com/docs/custom-flows/error-handling
//       // for more info on error handling
//       console.error(JSON.stringify(err, null, 2));
//     }
//   };

//   // Handle submission of verification form
//   const onVerifyPress = async () => {
//     if (!isLoaded) return;

//     try {
//       // Use the code the user provided to attempt verification
//       const signUpAttempt = await signUp.attemptEmailAddressVerification({
//         code,
//       });

//       // If verification was completed, set the session to active
//       // and redirect the user
//       if (signUpAttempt.status === "complete") {
//         await setActive({ session: signUpAttempt.createdSessionId });
//         router.replace("/");
//       } else {
//         // If the status is not complete, check why. User may need to
//         // complete further steps.
//         console.error(JSON.stringify(signUpAttempt, null, 2));
//       }
//     } catch (err) {
//       // See https://clerk.com/docs/custom-flows/error-handling
//       // for more info on error handling
//       console.error(JSON.stringify(err, null, 2));
//     }
//   };

//   if (pendingVerification) {
//     return (
//       <>
//         <Text>Verify your email</Text>
//         <TextInput
//           value={code}
//           placeholder="Enter your verification code"
//           onChangeText={(code) => setCode(code)}
//         />
//         <Button title="Verify" onPress={onVerifyPress} />
//       </>
//     );
//   }

//   return (
//     <View>
//       <>
//         <Text>Sign up</Text>
//         <TextInput
//           autoCapitalize="none"
//           value={emailAddress}
//           placeholder="Enter email"
//           onChangeText={(email) => setEmailAddress(email)}
//         />
//         <TextInput
//           value={password}
//           placeholder="Enter password"
//           secureTextEntry={true}
//           onChangeText={(password) => setPassword(password)}
//         />
//         <Button title="Continue" onPress={onSignUpPress} />
//       </>
//     </View>
//   );
// }
