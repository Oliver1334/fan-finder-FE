import React from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import { relativeTimeAndDate } from "../utils/functions";

export const CommentCard = (props) => {
  const commentText = props.comment.text;
  return (
    <View style={styles.CommentCard}>
      <Image
        style={styles.avatarImg}
        source={require("../assets/avatars/purpleDefault.png")}
      />
      <View style={styles.CommentTextContainer}>
        <Text style={styles.commentText}>{commentText}</Text>
        <Text style={styles.commentBy}>Comment by: {props.comment.user}</Text>
        <Text style={styles.commentTimeDate}>
          Posted: {relativeTimeAndDate(props.comment.created_at)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  CommentCard: {
    justifyContent: "center",
    alignItem: "center",
    backgroundColor: "#ffffff",
    // paddingTop: 5,
    marginTop: 5,
    marginHorizontal: 5,

    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",

    borderColor: "#4b006e",
    borderRadius: 10,
    borderStyle: "solid",
    borderWidth: 2
  },
  commentText: {
    fontSize: 20,
    color: "#4b006e",
  },
  commentBy: {
    fontSize: 15,
    color: "#4b006e",
  },
  commentTimeDate: {
    fontSize: 12,
    color: "#4b006e",
  },
  avatarImg: {
    height: 60,
    width: 60,
    marginVertical: 5,
  },
  CommentTextContainer: {
    textAlign: "justify",
    marginLeft: 25,
    color: "#ffffff",
  },
});