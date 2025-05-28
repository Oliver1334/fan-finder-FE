import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { LoginPage } from "./components/LoginPage";
import { Navigation } from "./components/Navigation";
import { io } from "socket.io-client";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [user, setUser] = useState({
    displayName: "Team_Express",
    avatar_img_url: "https://cdn.onlinewebfonts.com/svg/img_365985.png",
  });

  return isLoggedIn ? (
    <Navigation user={user}/>
  ) : (
    <LoginPage
      isLoggedIn={isLoggedIn}
      setIsLoggedIn={setIsLoggedIn}
      user={user}
      setUser={setUser}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
});