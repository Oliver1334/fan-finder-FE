import React from "react";
import { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { Button } from "@rneui/base";

import { getGigComments } from "../utils/api";

import { CommentCard } from "./CommentCard";
import { postComment } from "../utils/api";

export const ForumCard = ({ route }) => {
  const id = route.params.msg;
  const fullGigInfo = route.params.infoForGig;

  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [haveCommentsLoaded, setHaveCommentsLoaded] = useState(false);

  const commentInputBoxRef = useRef(null); // used by the button so it can 'blur' the input and hide the virtual keyboard

  const submitComment = () => {
    commentInputBoxRef.current.blur();
    postComment({ id, commentText }).then((returnedComment) => {
      setCommentText("");
      setComments((currentComments) => {
        console.log(returnedComment, "returned comment in forumcard");
        return [returnedComment, ...currentComments];
      });
    });
  };

  useEffect(() => {
    getGigComments(id).then((data) => {
      setComments(data.reverse());
      setHaveCommentsLoaded(true);
      console.log(comments);
    });
  }, []);

  const ForumCardHeader = () => {
    return (
      <View style={styles.ForumCardHeader}>
        <Text style={styles.ForumCardHeaderText}>This is the forum for</Text>
        <Text style={styles.ForumCardHeaderTextName}>{fullGigInfo.name}</Text>
        <Text style={styles.ForumCardHeaderText}>Join the discussion!</Text>
      </View>
    );
  };

  const CommentsDisplayer = () => {
    if (!haveCommentsLoaded) {
      return (
        <>
          <ActivityIndicator
            style={styles.ActivityIndicator}
            size="large"
            color="#4b006e"
          />
          <Text style={styles.LoadingComments}>loading comments...</Text>
        </>
      );

      // return <Text>comments loading... please wait!</Text>;
    } else if (haveCommentsLoaded && comments.length === 0) {
      return (
        <Text style={styles.NoComments}>
          no comments found... be the first to comment!
        </Text>
      );
    } else if (comments.length > 0) {
      return (
        <ScrollView style={styles.ScrollView}>
          {comments.map((comment) => {
            return <CommentCard key={comment._id} comment={comment} />;
          })}
        </ScrollView>
      );
    }
  };

  return (
    <View style={styles.screen}>
      <ForumCardHeader />
      <View style={styles.SendContainer}>
        <TextInput
          ref={commentInputBoxRef}
          onChangeText={setCommentText}
          placeholder="type your comment here..."
          placeholderTextColor="#4b006e"
          value={commentText}
          onSubmitEditing={() => submitComment()}
          style={styles.textInput}
          // multiline={true}
          // numberOfLines={4} // necessary for android only
          // blurOnSubmit={true} // unnecessary as taken care of within submitComment via ref
        />
        <Button
          style={styles.sendButton}
          title="post"
          color="#4b006e"
          onPress={() => {
            submitComment();
          }}
          radius="lg"
          // size="lg"
        />
      </View>

      <CommentsDisplayer />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
  },

  CommentAdder: {
    backgroundColor: "green",
    width: "100%",
    alignItems: "center",
  },

  ForumCardHeader: {
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
    alignItem: "center",

    padding: 10,
    borderColor: "#4b006e",
    borderRadius: 10,
    backgroundColor: "white",
    marginVertical: 5,
    borderStyle: "solid",
    borderWidth: 2,
  },

  ForumCardHeaderText: {
    color: "#4b006e",

    fontSize: 20,
  },

  ForumCardHeaderTextName: {
    fontWeight: "bold",
    color: "#4b006e",
    fontSize: 24,
    // justifyContent: "center",
    // alignItem: "center",
  },

  ScrollView: {
    backgroundColor: "white",
    width: "100%",
    // borderColor: "black",
    borderRadius: 10,
    // borderStyle: "solid",
    // borderWidth: 5,
    marginVertical: 5,
  },
  ActivityIndicator: {
    justifyContent: "center",
    paddingTop: "40%",
  },
  NoComments: {
    justifyContent: "center",
    paddingTop: "40%",
    color: "#4b006e",
    fontStyle: "italic",
  },
  CommentAdderText: {
    backgroundColor: "#4b006e",
    padding: 10,
    width: "90%",
    borderRadius: 5,
  },

  SendContainer: {
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: "#4b006e",
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 5,
  },
  sendButton: {
    marginLeft: 10,
  },
  textInput: {
    // marginTop: 5,
    width: "80%",
    height: 40,
    padding: 7,
    marginLeft: 4,
    lineHeight: 15,
    fontSize: 16,
    backgroundColor: "white",
    borderColor: "#4b006e",
    borderRadius: 10,
    borderStyle: "solid",
    borderWidth: 2,
    color: "#4b006e",
  },
  LoadingComments: {
    color: "#4b006e",
  },
});