import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Button } from "@rneui/themed";

export const LoginPage = ({ isLoggedIn, setIsLoggedIn }) => {
  return (
    <View style={styles.layout}>
      <Image
        style={styles.logo}
        source={require("../assets/fan_finder_logo.png")}
      />
      <Image
        style={styles.expressLogo}
        source={require("../assets/avatars/purpleDefault.png")}
      />

      <Button
        style={styles.button}
        title="Continue as Team_Express"
        color="#4b006e"
        size="lg"
        radius="lg"
        buttonStyle={{ width: 250 }}
        onPress={() => setIsLoggedIn(true)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    alignItems: "center",
  },

  logo: {
    resizeMode: "contain",
    height: 350,
    width: 350,
    marginTop: 100,
    justifyContent: "center",
    alignItems: "center",
    // marginVertical: 20,
  },
  expressLogo: {
    resizeMode: "contain",
    height: 100,
    width: 100,
    marginTop: 75,
    marginBottom: 25,
    justifyContent: "center",
    alignItems: "center",
    // marginVertical: 20,
  },
  button: {
    justifyContent: "center",
    marginVertical: 20,
    marginTop: 10,
  },
});