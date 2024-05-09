import * as Location from "expo-location";
import { useContext, useEffect, useState } from "react";
import { PlannerContext } from "../../contexts/PlannerContext";
import { getVenues } from "../../utils/Yelp";
import { StyleSheet, Text } from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
import { colors } from "../../utils/Colors";
import { useRoute } from "@react-navigation/native";
import Loader from "../Loader";

const Map = ({setShowModal,setTempLocation}) => {
  const plannerContext = useContext(PlannerContext);
  const [cafes, setCafes] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [status] = Location.useForegroundPermissions();

  const deltas = {
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  const route = useRoute()
  const selectHandler = (location) =>{
    setTempLocation(location)
    setShowModal(true)
  }

  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("request not granted");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      plannerContext.setCurrentLocation(location);
    };

    if(route.params.getCurrentLocation===true){
    plannerContext.setCurrentLocation(null)
      getLocation();
    }
  }, [status]);

  useEffect(() => {
    if (plannerContext.currentLocation) {
      const coordinates = {
        latitude: plannerContext.currentLocation.coords.latitude,
        longitude: plannerContext.currentLocation.coords.longitude,
      };
      const getData = async () => {
        const cafes = await getVenues(
          coordinates,
          "coffee,coffeeroasteries,coffeeshops"
        );
        const tempCafes = [];
        cafes.forEach((element) => {
          const obj = {
            name: element.name,
            coordinates: element.coordinates,
            id: element.id,
            imageUrl: element.image_url,
            phone: element.phone,
          };
          tempCafes.push(obj);
        });
        setCafes(tempCafes);
        const restaurants = await getVenues(coordinates, "restaurants");
        const tempRestaurants = [];
        restaurants.forEach((element) => {
          const obj = {
            name: element.name,
            coordinates: element.coordinates,
            id: element.id,
            imageUrl: element.image_url,
            phone: element.phone,
          };
          tempRestaurants.push(obj);
        });
        setRestaurants(tempRestaurants);
      };
      getData();
    }
  }, [plannerContext.currentLocation]);

  const renderCafes = () => {
    return cafes.map((location) => (
      <Marker
        pinColor="#BB86FC"
        key={location.id}
        coordinate={location.coordinates}
        style={{ width: 200 }}
      >
        <Callout
          style={styles.callout}
          onPress={()=>selectHandler(location)}
          onCalloutPress={()=>selectHandler(location)}
        >
          <Text style={styles.name}>{location.name}</Text>
          <Text style={styles.phone}>{location.phone}</Text>
          <Text style={styles.select}>Select</Text>
        </Callout>
      </Marker>
    ));
  };

  const renderRestaurants = () => {
    return restaurants.map((location) => (
      <Marker
        pinColor="crimson"
        key={location.id}
        coordinate={location.coordinates}
      >
        <Callout
          style={styles.callout}
          onPress={()=>selectHandler(location)}
          onCalloutPress={()=>selectHandler(location)}
        >
          <Text style={styles.name}>{location.name}</Text>
          <Text style={styles.phone}>{location.phone}</Text>
          <Text style={styles.select}>Select</Text>
        </Callout>
      </Marker>
    ));
  };

  return plannerContext.currentLocation && cafes && restaurants ? (
    <MapView
      style={styles.map}
      userInterfaceStyle={plannerContext.modeLight?"light":"dark"}
      initialRegion={{
        latitude: plannerContext.currentLocation?.coords.latitude,
        longitude: plannerContext.currentLocation?.coords.longitude,
        ...deltas,
      }}
    >
      {cafes.length > 0 && renderCafes()}
      {restaurants.length > 0 && renderRestaurants()}
    </MapView>
  ) : (
    <Loader/>
  );
};

export default Map;

const styles = StyleSheet.create({
  map: {
    height: "100%",
    width: "100%",
    position: "relative",
  },
  callout: {
    width: 200,
    paddingHorizontal: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  select: {
    color: "crimson",
    textAlign: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontFamily: "Roboto-Medium",
    fontSize: 18,
  },
  name: {
    fontSize: 20,
    fontFamily: "Pacifico",
    color: colors.action,
  },
  phone: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.gray,
    fontFamily: "Sacramento-Regular",
  },
  review: {
    fontFamily: "Sacramento-Regular",
    marginBottom: 5,
    fontSize: 25,
  },
});
