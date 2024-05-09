import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import getSpotifyAccessToken from "../utils/SpotifyAccessToken";
import { colors } from "../utils/Colors";
import { useNavigation, useRoute } from "@react-navigation/core";
import { PlannerContext } from "../contexts/PlannerContext";
import uuid from "react-uuid";

const PlaylistDetails = () => {
  const plannerContext = useContext(PlannerContext);
  const route = useRoute();
  const navigation = useNavigation();
  const { playlist } = route.params;
  const [tracks, setTracks] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchTracks();
  }, []);

  const fetchTracks = async () => {
    try {
      const spotifyToken = await getSpotifyAccessToken();
      const information = await getPlaylistTracks(playlist.id, spotifyToken);
      if (information.items?.[0]?.track?.name === null) {
        setErrorMessage("No Tracks found!");
        console.log(errorMessage);
      } else {
        const trackItems = information.items.map((item) => ({
          id: uuid(),
          name: item.track.name,
          artist: item.track.artists[0].name,
          image: require("../assets/icons/headphone.png"),
        }));
        if (trackItems.length !== 0) {
          setTracks(trackItems);
        } else {
          setErrorMessage("No Tracks found!");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddPlaylist = () => {
    const eventPlaylist = {
      id: playlist.id,
      name: playlist.name,
    };

    plannerContext.addPlaylist(eventPlaylist);
    navigation.navigate("Planner Screen");
  };

  const getPlaylistTracks = async (playlistId, accessToken) => {
    console.log(playlist.id, accessToken);
    const informationUrl = `https://api.spotify.com/v1/playlists/${playlistId}/tracks?access_token=${accessToken}&limit=50`;
    const response = await axios.get(informationUrl);
    return response.data;
  };

  const renderTrackItem = ({ item }) => (
    <View style={styles.trackItemContainer}>
      <Image source={item.image} style={styles.itemImage}></Image>
      <View>
        <Text style={styles.trackItemName}>{item.name}</Text>
        <Text style={styles.trackItemArtist}>{item.artist}</Text>
      </View>
    </View>
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: plannerContext.modeLight
        ? colors.grayLight
        : colors.primaryDark,
    },
    playlistName: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 30,
      color:plannerContext.modeLight? colors.gray:colors.white
    },
    trackItemContainer: {
      marginBottom: 10,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      borderBottomColor: plannerContext.modeLight? colors.grayMedium:colors.white,
      borderBottomWidth: 1,
      paddingBottom: 5,
    },
    trackItemName: {
      fontSize: 16,
      fontWeight: "bold",
      color:plannerContext.modeLight? colors.gray:colors.white
    },
    trackItemArtist: {
      fontSize: 14,
      color:plannerContext.modeLight? colors.action:colors.actionDark
    },
    itemImage: {
      height: 30,
      width: 30,
      marginRight: 20,
    },
    addButton: {
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.secondary,
      borderRadius: 25,
      height: 60,
      marginTop: 20,
      backgroundColor: plannerContext.modeLight?colors.secondary:colors.actionDark,
    },
    addButtonText: {
      fontSize: 22,
      fontFamily: "Sofia-Regular",
      color:plannerContext.modeLight?colors.action:colors.white,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.playlistName}>{playlist.name}</Text>
      {errorMessage.length !== 0 ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : (
        <FlatList
          data={tracks}
          renderItem={renderTrackItem}
          keyExtractor={(item) => item.id}
        />
      )}
      <TouchableOpacity onPress={handleAddPlaylist} style={styles.addButton}>
        <Text style={styles.addButtonText}> Select Playlist </Text>
      </TouchableOpacity>
    </View>
  );
};

export default PlaylistDetails;
