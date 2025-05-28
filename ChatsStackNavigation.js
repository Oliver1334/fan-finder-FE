//THIS FILE NEEDS TO BE KEPT OUTSIDE OF COMPONENTS OR CREATES A 500 ANGRY DOG ERROR!

import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import { Chats } from "./components/Chats";
import { SingleChat } from "./components/SingleChat";

const Stack = createStackNavigator(); // creates object for Stack Navigator

const ChatsStackNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#4b006e",
        },
      }}
    >
      <Stack.Screen
        name="My Chats"
        component={Chats}
        options={{
          headerTitleStyle: {
            color: "white",
            fontWeight: "bold",
            fontSize: 18,
          },
          headerBackTitleStyle: {
            fontWeight: "bold",
            fontSize: 18,
            color: "white",
          },
          headerTintColor: "white",
        }}
      />
      <Stack.Screen
        name="SingleChat"
        component={SingleChat}
        options={{
          headerTitleStyle: {
            color: "white",
          },
          headerBackTitleStyle: {
            fontWeight: "bold",
            fontSize: 18,
            color: "white",
          },
          headerTintColor: "white",
        }}
      />
    </Stack.Navigator>
  );
};

export { ChatsStackNavigation }; // Stack-Navigator for Screen 2 Tab