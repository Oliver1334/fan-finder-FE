import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  ActivityIndicator,
} from "react-native";
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import { useState, useEffect } from "react";
import { getGigs } from "../utils/api";
import { mapStyle } from "../mapstyles";
const customMarker = require("../assets/custom_marker.png");

export const Map = ({ navigation }) => {
  // check if we have the users location, so we don't immediately make the ticketmaster API call
  const [haveUserLocation, setHaveUserLocation] = useState(false);

  // store all gigs the ticketmaster API returns
  const [fetchedGigs, setFetchedGigs] = useState([]);

  const [userLat, setUserLat] = useState(null);
  const [userLong, setUserLong] = useState(null);

  const onRegionChange = (region) => {
    //this is used when the user moves around the map view i.e. panning/zooming
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});

      setUserLat(location.coords.latitude);
      setUserLong(location.coords.longitude);
      setHaveUserLocation(true);
    })();
  }, []);

  //NOTE: ticketmaster long and lat comes back on _embedded.events[0]._embedded.venues[0].location.longitude
  useEffect(() => {
    if (haveUserLocation) {
      getGigs(userLat, userLong)
        .then((results) => {
          setFetchedGigs(results);
        })
        .catch((err) => {
          // some error handling here
          console.log(err);
        });
    }
  }, [haveUserLocation]);

  if (haveUserLocation) {
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          onRegionChange={onRegionChange}
          showsMyLocationButton={true}
          showsUserLocation={true}
          style={styles.map}
          customMapStyle={mapStyle}
          initialRegion={{
            //delta values - the higher the number, the more zoomed out
            latitude: userLat,
            latitudeDelta: 1.10408435934594706,
            longitude: userLong,
            longitudeDelta: 1.08552860468626022,
          }}
        >
          {fetchedGigs.map((gig, index) => {
            
            return (
              <Marker
                key={index}
                coordinate={{
                  latitude: Number(gig._embedded.venues[0].location.latitude),
                  longitude: Number(gig._embedded.venues[0].location.longitude),
                }}
              >
                 {/* <Image
                  source={customMarker}
                  style={{ height: 45, width: 45 }}
                />
    */}



   <Callout
                  // style={{ height: 100, width: 160 }}
                  style={{ width: 200 }}
                  onPress={() =>
                    navigation.navigate("Current Gig", { msg: `${gig.id}` })
                  }
                >
                  <View>
                    <Text style={styles.GigName}>{gig.name}</Text>
                    <Text>Start time: {gig.dates.start.localTime}</Text>
                  </View>
                </Callout>
              </Marker>
            );
          })}
        </MapView>
      </View>
    );
  }

  // whilst waiting for the user location to get set, display a loading message
  return (
    <View style={styles.LoadingContainer}>
      <ActivityIndicator
        style={styles.ActivityIndicator}
        size="large"
        color="#4b006e"
      />
      <Text style={styles.LoadingText}>loading map...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    justifyContent: "center",
    alignItem: "center",
  },
  title: {
    fontSize: 32,
    marginBottom: 16,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  GigName: {
    fontWeight: "bold",
    justifyContent: "center",
    textAlign: "center",
    color: "#4b006e",
  },
  GigStart: {
    justifyContent: "center",
    textAlign: "center",
    color: "#4b006e",
  },

  Callout: {
    flexDirection: "row",
    alignSelf: "flex-start",
    backgroundColor: "#fff",
    borderRadius: 6,
    borderColor: "#ccc",
  },
  ActivityIndicator: {
    justifyContent: "center",
    paddingTop: "40%",
    alignContent: "center",
    textAlign: "center",
    alignSelf: "center",
  },
  LoadingContainer: {
    justifyContent: "center",
    textAlign: "center",
    alignSelf: "center",
  },
  LoadingText: {
    color: "#4b006e",
  },
});