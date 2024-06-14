import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getFirestore,
  collection,
  getDocs,
} from "firebase/firestore";
import { useFocusEffect } from "@react-navigation/native";

const Account = ({ navigation }) => {
  const db = getFirestore();

  const [uid, setUid] = useState(null);
  const [loading, setLoading] = useState(false); 
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUid(user.uid);
    }
  });

  const [userData, setUserData] = useState({});
  const [activityHistory, setActivityHistory] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        if (uid) {
          setLoading(true);
          try {
            const docsRef = await getDocs(collection(db, "database"));
            const userActivities = [];
            docsRef.forEach((doc) => {
              if (doc.data().id === uid) {
                console.log(doc.id, " => ", doc.data());
                userActivities.push({
                  id: doc.id,
                  input: doc.data().input,
                  output: doc.data().output,
                });
              }
            });
            const userRef = await getDocs(collection(db, "user"));
            userRef.forEach((doc) => {
              if (doc.data().id === uid) {
                setUserData(doc.data());
              }
            });
            setActivityHistory(userActivities);
          } catch (error) {
            console.error("Error fetching data:", error);
          } finally {
            setLoading(false); 
          }
        }
      };

      fetchData();
    }, [uid, db])
  );

  const logout = () => {
    auth.signOut();
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <View>
          <Text style={styles.name}>{userData.name}</Text>
          <Text style={styles.email}>{userData.email}</Text>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Ionicons name="log-out-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.dashboardContainer}>
        <Text style={styles.dashboardTitle}>Activity Dashboard</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#2CB673" />
        ) : (
          <FlatList
            data={activityHistory}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.activityItem}>
                <Text style={styles.input}>Input: {item.input}</Text>
                <Text style={styles.output}>Output: {item.output}</Text>
              </View>
            )}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  email: {
    fontSize: 16,
    color: "#666",
  },
  dashboardContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 16,
  },
  dashboardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  activityItem: {
    marginBottom: 16,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  input: {
    fontSize: 16,
    fontWeight: "bold",
  },
  output: {
    fontSize: 16,
    color: "#666",
  },
  logoutButton: {
    backgroundColor: "red",
    padding: 5,
    borderRadius: 5,
    position: "absolute",
    right: 10,
  },
  logoutButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Account;
