import React from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";

export const UserCard = (props) => {
  return (
    <View style={styles.UserCard}>
      <Image
        style={styles.avatarImg}
        source={require("../assets/avatars/purpleDefault.png")}
      />
      <Text style={styles.Username}>{props.username}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  UserCard: {
    backgroundColor: "white",
    padding: 10,
    borderColor: "#4b006e",
    alignSelf: "center",
    borderRadius: 10,
    borderStyle: "solid",
    borderWidth: 3,
    width: 325,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
  },
  Username: {
    fontSize: 15,
    marginLeft: 15,
    color: "#4b006e"
  },

  avatarImg: {
    height: 40,
    width: 40,
  },
});