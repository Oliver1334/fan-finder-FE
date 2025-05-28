import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Button } from "@rneui/base";
import { useState, useEffect } from "react";
import { getUserChatIds, getUsersByChatId, getUserDetails } from "../utils/api";
// import {getSocketServerAddress} from './utils/api'
// const socketAddress = getSocketServerAddress()
// Make sure socket server is running
import { io } from "socket.io-client";
const socket = io.connect("http://localhost:4000");

export const Chats = ({ navigation }) => {
  const [user, setUser] = useState("Test User");
  const [room, setRoom] = useState("");
  // a room is the connection socketio makes between clients :)
  const [userChatIds, setUserChatIds] = useState([]);

  const allChatIds = ["chat-1", "chat-2", "chat-3"];

  // const joinRoom = (room) => {
  //     socket.emit('join_room', {"room": room, "user": user})
  //     console.log("joining room")

  // }

  // useEffect(()=>{
  //     socket.on('connection', () => {
  //         console.log(socket.id)
  //     })
  // },[])

  useEffect(() => {
    getUserChatIds()
      .then((results) => {
        console.log(results, "<-- results");
        setUserChatIds(results);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }, []);

  useEffect(() => {
    if (userChatIds.length > 0) {
      userChatIds.forEach((chat) => {
        getUsersByChatId(chat);
      });
    }
  }, [userChatIds]);

  return (
    <View style={styles.chatContainer}>
      {userChatIds.map((chat, index) => {
        return (
          <View style={styles.chatButton} key={index}>
            <Image
              style={styles.avatarImg}
              source={require("../assets/avatars/purpleDefault.png")} // temp hardcode a 'nicer' avatar
              // source={{ uri: `${props.avatar}` }}
            />
            <Button
              key={index}
              id={chat}
              title={getUsersByChatId(chat)[1]}
              style={styles.chatButtonInner}
              color="white"
              titleStyle={{
                color: "#4b006e",
              }}
              onPress={() => {
                // setRoom(chat)
                // joinRoom(room)
                navigation.navigate("SingleChat", { id: chat, room: room });
              }}
            ></Button>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  avatarImg: {
    height: 50,
    width: 50,
  },
  chatButton: {
    display: "flex",
    flexDirection: "row",
    marginTop: 20,
    marginLeft: 15,
    marginRight: 15,
    borderWidth: 5,
    borderColor: "#4B006E",
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    color: "#4b006e",
  },
  chatContainer: {
    backgroundColor: "white",
    height: "100%",
  },
  chatButtonInner: {
    color: "#4b006e",
  },
});