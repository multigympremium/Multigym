import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import Checkbox from "expo-checkbox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Toast from "react-native-toast-message";
import * as z from "zod";
import UseAxiosSecure from "@/hooks/UseAxioSecure";
// import { useAuth } from "@/context/AppContext";
// import { FaFacebookF, FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
// import { FaGoogle } from "react-icons/fa";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
const LoginSchema = z.object({
  email: z
    .string()
    .email({ message: "Please enter a valid email address" })
    .nonempty("Email is required"),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9])/, {
      message:
        "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character",
    })
    .nonempty("Password is required"),
});

const LoginPage = ({ onCreateAccountClick, onForgotPasswordClick }: any) => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginSchema),
  });

  const axiosSecure = UseAxiosSecure();
  // const {
  //   signInUser,
  //   signInWithGoogle,
  //   signInWithFacebook,
  //   setLoading,
  //   loading,
  // } = useAuth();

  useEffect(() => {
    const savedEmail = ""; // Use SecureStore or AsyncStorage in real apps
    const savedPassword = "";
    if (savedEmail && savedPassword) {
      setValue("email", savedEmail);
      setValue("password", savedPassword);
      setRememberMe(true);
    }
  }, [setValue]);

  // const onSubmit = async (data: any) => {
  //   const { email, password } = data;
  //   setLoading(true);
  //   try {
  //     await signInUser(email, password);
  //     Toast.show({
  //       type: "success",
  //       text1: "Login successful!",
  //     });

  //     if (rememberMe) {
  //       // Save credentials securely
  //     } else {
  //       // Clear saved credentials
  //     }
  //   } catch (error) {
  //     Toast.show({
  //       type: "error",
  //       text1: "Login failed. Please check your Email or Password.",
  //     });
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const handleGoogleSignIn = async () => {
  //   setLoading(true);
  //   try {
  //     await signInWithGoogle();
  //     Toast.show({
  //       type: "success",
  //       text1: "Google login successful!",
  //     });
  //   } catch (error) {
  //     Toast.show({
  //       type: "error",
  //       text1: "Social login failed. Please try again later.",
  //     });
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const handleFacebookSignIn = async () => {
  //   setLoading(true);
  //   try {
  //     await signInWithFacebook();
  //     Toast.show({
  //       type: "success",
  //       text1: "Facebook login successful!",
  //     });
  //   } catch (error) {
  //     Toast.show({
  //       type: "error",
  //       text1: "Social login failed. Please try again later.",
  //     });
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/react-logo.png")}
        style={styles.logo}
      />
      <Text style={styles.title}>Welcome back</Text>
      <Text style={styles.subtitle}>Please enter your account info</Text>

      <View>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          {...register("email")}
        />
        {/* {errors?.email?.message && (
          <Text style={styles.errorText}>{errors.email.message}</Text>
        )} */}
      </View>

      <View>
        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={!isShowPassword}
            {...register("password")}
          />
          <TouchableOpacity
            onPress={() => setIsShowPassword(!isShowPassword)}
            style={styles.eyeIcon}
          >
            {isShowPassword ? (
              <Entypo name="eye" size={24} color="black" />
            ) : (
              <Entypo name="eye-with-line" size={24} color="black" />
            )}
          </TouchableOpacity>
        </View>
        {/* {errors?.password?.message && (
          <Text style={styles.errorText}>{errors.password.message}</Text>
        )} */}
      </View>

      <View style={styles.row}>
        <View style={styles.checkboxContainer}>
          <Checkbox value={rememberMe} onValueChange={setRememberMe} />
          <Text style={styles.checkboxLabel}>Remember Me</Text>
        </View>
        <TouchableOpacity onPress={onForgotPasswordClick}>
          <Text style={styles.forgotText}>Forgot Password</Text>
        </TouchableOpacity>
      </View>

      {/* <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSubmit(onSubmit)}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.submitText}>Sign in</Text>
        )}
      </TouchableOpacity> */}

      <TouchableOpacity onPress={onCreateAccountClick}>
        <Text style={styles.createAccountText}>
          New here? Create an account
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    justifyContent: "center",
  },
  logo: { width: 100, height: 100, alignSelf: "center" },
  title: {
    fontSize: 24,
    color: "white",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: { color: "gray", textAlign: "center", marginBottom: 20 },
  label: { color: "white", marginBottom: 5 },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    width: "100%",
  },
  errorText: { color: "red", fontSize: 12 },
  passwordContainer: { flexDirection: "row", alignItems: "center" },
  eyeIcon: { position: "absolute", right: 10 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  checkboxContainer: { flexDirection: "row", alignItems: "center" },
  checkboxLabel: { color: "white" },
  forgotText: { color: "blue" },
  submitButton: {
    backgroundColor: "blue",
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
  },
  submitText: { color: "white" },
  socialLogin: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  createAccountText: { color: "white", textAlign: "center", marginTop: 20 },
});

// import { useSignIn } from "@clerk/clerk-expo";
// import { Link, useRouter } from "expo-router";
// import { Text, TextInput, Button, View } from "react-native";
// import React from "react";

// export default function Page() {
//   const { signIn, setActive, isLoaded } = useSignIn();
//   const router = useRouter();

//   const [emailAddress, setEmailAddress] = React.useState("");
//   const [password, setPassword] = React.useState("");

//   // Handle the submission of the sign-in form
//   const onSignInPress = React.useCallback(async () => {
//     if (!isLoaded) return;

//     // Start the sign-in process using the email and password provided
//     try {
//       const signInAttempt = await signIn.create({
//         identifier: emailAddress,
//         password,
//       });

//       // If sign-in process is complete, set the created session as active
//       // and redirect the user
//       if (signInAttempt.status === "complete") {
//         await setActive({ session: signInAttempt.createdSessionId });
//         router.replace("/");
//       } else {
//         // If the status isn't complete, check why. User might need to
//         // complete further steps.
//         console.error(JSON.stringify(signInAttempt, null, 2));
//       }
//     } catch (err) {
//       // See https://clerk.com/docs/custom-flows/error-handling
//       // for more info on error handling
//       console.error(JSON.stringify(err, null, 2));
//     }
//   }, [isLoaded, emailAddress, password]);

//   return (
//     <View>
//       <TextInput
//         autoCapitalize="none"
//         value={emailAddress}
//         placeholder="Enter email"
//         onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
//       />
//       <TextInput
//         value={password}
//         placeholder="Enter password"
//         secureTextEntry={true}
//         onChangeText={(password) => setPassword(password)}
//       />
//       <Button title="Sign in" onPress={onSignInPress} />
//       <View>
//         <Text>Don't have an account?</Text>
//         <Link href="/sign-up">
//           <Text>Sign up</Text>
//         </Link>
//       </View>
//     </View>
//   );
// }
