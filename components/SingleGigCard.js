// THIS IS THE SINGLE GIG CARD
// DO NOT TOUCH STATES INVOLVING GIGS, (This works (: )

import React from "react";
import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Linking,
  FlatList,
  ActivityIndicator,
  Image,
} from "react-native";
import { getAllAttendees, getGigById } from "../utils/api";
import { Button } from "@rneui/themed";
import { getUserGigs, patchUserGigs } from "../utils/api";
import { UserCard } from "./UserCard";

const SingleGigCard = ({ route, navigation }) => {
  const [gigId, setGigId] = useState("");
  const [gigInfo, setGigInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [userAttending, setUserAttending] = useState(false);
  const [allUsersAttending, setAllUsersAttending] = useState([]);
  const [attendingUsersLoaded, setAttendingUsersLoaded] = useState(false);

  const id = route.params.msg;

  console.log(gigId + " <<< gigId from state in SingleGigCard");

  const addToUsersGigs = () => {
    console.log("you clicked the button to add a gig to users gigs");
    patchUserGigs(gigId).then((res) => {
      setUserAttending(true);
      checkAllUsersGoing();
    });
  };

  const checkUserGigs = () => {
    return getUserGigs().then((res) => {
      console.log(res, "single card res");
      if (res.includes(gigId) === true) {
        setUserAttending(true);
      }
    });
  };

  const checkAllUsersGoing = () => {
    // api call to check all users going, display them somewhere on page
    getAllAttendees(gigId).then((results) => {
      console.log(results, "hi from line 48");
      setAllUsersAttending(results);
      setAttendingUsersLoaded(true);
    });
  };

  useEffect(() => {
    setGigId(id);
    if (gigId !== "") {
      checkAllUsersGoing();
      checkUserGigs();
      console.log(allUsersAttending + " <<< all users attending line 63");
      // console.log(route.params.msg)
      getGigById(id)
        .then((results) => {
          // console.log(results)
          setGigInfo(results);
          setLoading(false);
        })
        .catch((err) => {
          // some error handling here
          console.log(err);
        });
    }
  }, [gigId]);

  const UsersGoing = () => {
    if (!attendingUsersLoaded) {
      return (
        <>
          <ActivityIndicator
            style={styles.ActivityIndicator}
            size="large"
            color="#4b006e"
          />
          <Text style={styles.LoadingText}>loading fans who are going...</Text>
        </>
      );
    } else if (allUsersAttending?.length === 0) {
      return (
        <Text style={styles.NoUsersGoingText}>None yet... be the first!</Text>
      );
    } else {
      console.log(allUsersAttending[0].displayName, "<<<<sgc users");
      console.log(allUsersAttending.length, "arr length");
      return (
        <>
          <ScrollView style={styles.ScrollView}>
            {allUsersAttending.map((attendee) => {
              console.log(attendee, "attendee<<<<<");
              return (
                <UserCard
                  key={attendee.displayName}
                  username={attendee.displayName}
                  avatar={attendee.avatarUrl}
                />
              );
            })}
            {console.log(allUsersAttending)}
          </ScrollView>
        </>
      );
    }
  };

  // need to check the above dep. array

  if (loading) return <Text>Loading...</Text>;
  return (
    // <ScrollView style={styles.screen}>
    <View style={styles.screen}>
      <Text style={styles.titleText}>{gigInfo.name}</Text>
      <Text style={styles.bodyText}>On: {gigInfo.dates.start.localDate}</Text>
      <Text style={styles.bodyText}>
        Starts At: {gigInfo.dates.start.localTime.slice(0, 5)}
      </Text>
      <Image
        style={styles.gigImage}
        source={{
          uri: `${gigInfo.images[0].url}`, //index 0 has the majority most relevant band image at highest resolution
        }}
      ></Image>
      <Text style={styles.GigInfo}>Interested? Then get involved!</Text>

      <Button
        size="lg"
        titleStyle={{ color: "white" }}
        buttonStyle={{
          
          width: 325,
          borderColor: "#4b006e",
          backgroundColor: "#4b006e",
          borderWidth: 3,
          borderRadius: 10,
        }}
        title="Buy Tickets"
        onPress={() => Linking.openURL(`${gigInfo.url}`)}
      />

      <View style={styles.buttonContainer}>
        {userAttending ? (
          <Button
            color="red"
            size="lg"
            buttonStyle={{
              width: 150,
              borderColor: "4b006e",
              borderWidth: 3,
              borderRadius: 10,
            }}
            title="I'm going!"
            disabled="true"
            disabledTitleStyle={{ color: "#4b006e" }}
            disabledStyle={{ backgroundColor: "#ffffff" }}
          />
        ) : (
          <Button
            color="white"
            size="lg"
            titleStyle={{ color: "#ffffff" }}
            buttonStyle={{
              width: 150,
              borderColor: "#4b006e",
              backgroundColor: "#4b006e",
              borderWidth: 3,
              borderRadius: 10,
            }}
            title="I'll be going"
            onPress={() => {
              addToUsersGigs();
            }}
          />
        )}

        <Button
          size="lg"
          titleStyle={{ color: "white" }}
          buttonStyle={{
            width: 150,
            borderColor: "#4b006e",
            backgroundColor: "#4b006e",
            borderWidth: 3,
            borderRadius: 10,
          }}
          title="Go To Forum"
          onPress={() =>
            navigation.navigate("ForumCard", {
              msg: `${gigId}`,
              infoForGig: gigInfo,
            })
          }
        />
      </View>
      <Text style={styles.ConfirmedText}>These fans have confirmed:</Text>
      <UsersGoing style={styles.UsersGoing} />
    </View>
  );
};

export default SingleGigCard;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "white",
    color: "#4b006e",
    padding: 10,
  },

  ScrollView: {
    width: "100%",
    backgroundColor: "4b006e",
  },

  ScrollViewGigInfo: {
    height: 4,
  },

  titleText: {
    marginTop: 10,
    color: "#4b006e",
    fontWeight: "700",
    fontSize: 20,
    textAlign: "center",
  },
  bodyText: {
    color: "#4b006e",
    fontSize: 20,
  },
  GigInfo: {
    color: "#4b006e",
    marginBottom: 10,
  },
  gigImage: {
    height: "30%",
    width: "100%",
    borderRadius: 10,
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    marginTop: 10,
    marginBottom: 20,
  },
  ActivityIndicator: {
    justifyContent: "center",
    paddingTop: "10%",
  },
  LoadingText: {
    paddingTop: "10%",
    color: "#4b006e",
    fontSize: 15,
  },
  NoUsersText: {
    color: "#4b006e",
    fontSize: 15,
    marginTop: 20,
    marginBottom: 10,
  },
  NoUsersGoingText: {
    color: "#4b006e",
    marginTop: 20,
    fontStyle: "italic",
  },
  GigInfoText: {
    color: "#4b006e",
  },
  ConfirmedText: {
    color: "#4b006e",
    marginTop: 10,
    marginBottom: 5,
  },
  GigInfoContainer: {
    // marginVertical: 10,
  },
});