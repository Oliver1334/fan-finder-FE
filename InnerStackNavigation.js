//THIS FILE NEEDS TO BE KEPT OUTSIDE OF COMPONENTS OR CREATES A 500 ANGRY DOG ERROR!

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SingleGigCard from "./components/SingleGigCard";
import { Map } from "./components/Map";
import { ForumCard } from "./components/ForumCard";

const Stack = createStackNavigator(); // creates object for Stack Navigator

const MapPinNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#4b006e",
        },
      }}
    >
      <Stack.Screen
        name="Select A Gig"
        component={Map}
        options={{
          headerTitleStyle: {
            color: "white",
            fontWeight: "bold",
            fontSize: 18,
          },
          headerBackTitleStyle: {
            fontWeight: "bold",
            fontSize: 18,
            color: "#4b006e",
          },
          headerTintColor: "#4b006e",
        }}
      />
      <Stack.Screen
        name="Current Gig"
        component={SingleGigCard}
        options={{
          headerTitleStyle: {
            color: "#4b006e",
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
        name="ForumCard"
        component={ForumCard}
        options={{
          headerTitleStyle: {
            color: "#4b006e",
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

export { MapPinNavigator }; // Stack-Navigator for Screen 2 Tab