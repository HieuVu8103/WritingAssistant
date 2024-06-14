import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  Platform,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { initializeApp } from "@firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  initializeAuth,
  getReactNativePersistence,
} from "@firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCiNpznnweRhUh8Uxv8hAU1mPzd6dwX2z4",
  authDomain: "writingassistant-66532.firebaseapp.com",
  databaseURL: "https://writingassistant-66532-default-rtdb.firebaseio.com",
  projectId: "writingassistant-66532",
  storageBucket: "writingassistant-66532.appspot.com",
  messagingSenderId: "274593024097",
  appId: "1:274593024097:web:836a622573cabe0a7e8220"
};
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true); 
  const [realName, setRealName] = useState("");
  const [loading, setLoading] = useState(false);

  const db = getFirestore();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User login!");
        navigation.navigate("Home");
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const handleAuthentication = async () => {
    setLoading(true); 
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        console.log("User signed in successfully!");
      } else {
        if (password !== confirmPassword) {
          console.error("Passwords do not match!");
          Alert.alert("Passwords do not match!");
          return;
        }
        await createUserWithEmailAndPassword(auth, email, password);
        const docRef = await addDoc(collection(db, "user"), {
          id: auth.currentUser.uid,
          email,
          name: realName,
        });
      }
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        Alert.alert("That email address is already in use!");
      } else if (error.code === "auth/invalid-email") {
        Alert.alert("That email address is invalid!");
      } else if (error.code === "auth/weak-password") {
        Alert.alert("Password is too weak!");
      } else if (error.code === "auth/invalid-credential") {
        Alert.alert("Wrong email or password!");
      } else {
        console.error(error.code);
        Alert.alert("An error occurred. Please try again later.");
      }
    } finally {
      setLoading(false); 
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.title}>{isLogin ? "Login" : "Register"}</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          {!isLogin && (
            <TextInput
              style={styles.input}
              placeholder="Real Name"
              value={realName}
              onChangeText={setRealName}
            />
          )}
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          {!isLogin && (
            <View>
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
              />
            </View>
          )}
          <TouchableOpacity
            style={styles.button}
            onPress={handleAuthentication}
            disabled={loading} 
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.buttonText}>
                {isLogin ? "Login" : "Register and Login"}
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
            <Text style={styles.toggleText}>
              {isLogin
                ? "Need an account? Register"
                : "Already have an account? Login"}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  button: {
    height: 48,
    backgroundColor: "#2CB673",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  toggleText: {
    marginTop: 16,
    color: "#2CB673",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default LoginScreen;
