import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Button } from "@rneui/base";
import { useFonts } from "expo-font";

export const UserProfile = ({ route }) => {
  const [fontsLoaded] = useFonts({
    "Inter-SemiBoldItalic":
      "https://rsms.me/inter/font-files/Inter-SemiBoldItalic.otf?v=3.12",
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.UserProfile}>
      <View style={styles.UserContainer}>
        <Image
          style={styles.avatarImg}
          source={require("../assets/avatars/purpleDefault.png")} // temp hardcode a 'nicer' avatar
          // source={{ uri: `${props.avatar}` }}
        />

        <Text style={styles.Username}>{route.params.user.displayName}</Text>
      </View>

      <View style={styles.UpcomingGigs}>
        <View style={styles.Text}>
          <Text style={[styles.Text, styles.FontItalic]}>You have</Text>
          <Text style={[styles.Text, styles.Large]}>8</Text>
          <Text style={[styles.Text, styles.FontItalic]}>upcoming gigs</Text>
        </View>
        <View style={styles.ForumRank}>
          <Text style={[styles.Text, styles.FontItalic]}>
            Your forum rank is
          </Text>

          <Text style={[styles.Text, styles.Large]}>Rock Legend</Text>
        </View>
      </View>

      <Button
        key={3}
        style={styles.SignOutButton}
        title="SIGN OUT"
        // onPress={handlePostMessage}
        color="red"
        // size="lg"
        radius="lg"
        marginRight="40"
        // buttonStyle={{ width: 250 }}
      ></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  UserContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "lightgrey",

    marginBottom: 70,
  },
  UserProfile: {
    flex: 1,
    justifyContent: "center",
    alignItem: "center",
    color: "black",
    backgroundColor: "white",
  },
  avatarImg: {
    height: 90,
    width: 90,
    marginRight: 25,
  },
  Username: {
    fontSize: 25,
    color: "#4b006e",
  },
  Info: {
    justifyContent: "center",
    alignItem: "center",
  },
  TextHighlight: {
    fontFamily: "San Francisco",
  },
  Text: {
    fontSize: 25,
    textAlign: "center",
    color: "#4b006e",
  },
  Large: {
    fontSize: 40,
  },
  ForumRank: {
    marginTop: 70,
    fontWeight: 900,
  },
  SignOutButton: {
    marginTop: 100,
    marginHorizontal: 100,
  },
  FontItalic: {
    fontFamily: "Inter-SemiBoldItalic",
  },
});