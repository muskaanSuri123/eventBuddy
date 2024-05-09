import React, { useContext, useState } from 'react';
import { Keyboard, ScrollView } from 'react-native';
import { View, StyleSheet, Text, TextInput, TouchableWithoutFeedback, Image, FlatList, TouchableOpacity} from "react-native";
import axios from 'axios';
import getSpotifyAccessToken from '../utils/SpotifyAccessToken';
import { colors } from '../utils/Colors';
import { PlannerContext } from '../contexts/PlannerContext';


const Playlist = ({ navigation }) => {
  
  const [text, onChangeText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [playlists, setPlaylists] = useState([]);
  const plannerContext = useContext(PlannerContext)

  const handleSearch = async () => {
    setPlaylists([]);
    onChangeText('')
    setErrorMessage('');
    Keyboard.dismiss();

    if (text.length === 0) {
      setErrorMessage('Please enter playlist name!');
      return;
    }

    try {
      const spotifyToken = await getSpotifyAccessToken();
      const information = await getPlaylists(text, spotifyToken);

      const mappedPlaylists = information.playlists.items.map((playlist) => ({
        id: playlist.id,
        name: playlist.name,
        image: playlist.images[0]?.url,
        ownerName: playlist.owner.display_name,
      }));

      if (mappedPlaylists.length === 0) {
        setErrorMessage('No Playlist found!');
      } else {
        setPlaylists(mappedPlaylists);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getPlaylists = async (text, accessToken) => {
    const informationUrl = `https://api.spotify.com/v1/search?q=${text}&type=playlist&limit=10&access_token=${accessToken}`;
    const response = await axios.get(informationUrl);
    return response.data;
  };



  const renderPlaylistItem = ({ item }) => (
    <TouchableOpacity onPress={() => handlePlaylistClick(item)}>
      <View style={styles.playlistItemContainer}>
        <Image source={{ uri: item.image }} style={styles.playlistItemImage} />
        <View style={styles.playlistItemTextContainer}>
          <Text style={styles.playlistItemName}>{item.name}</Text>
          <Text style={styles.playlistItemOwner}>By {item.ownerName}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const handlePlaylistClick = (playlist) => {
    navigation.navigate('Playlist Details', { playlist });
  };

  const styles = StyleSheet.create({
    wrapper: {
      flex: 1,
      backgroundColor: plannerContext.modeLight?colors.grayLight:colors.primaryDark,
    },
  
    playlistContainer: {
      paddingVertical: 10,
    },
    errorMessage: {
      color: 'red',
      padding: 20,
      backgroundColor: '#fff',
    },
    itemsWrapper: {
      flexDirection: 'row',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 10,
      backgroundColor: plannerContext.modeLight?colors.grayLight:colors.primaryDark,
    },
    input: {
      marginTop: 10,
      backgroundColor: '#fff',
      borderRadius: 10,
      width: 330,
      height: 50,
      padding: 10,
      fontSize: 16,
      borderWidth: 1,
      borderColor: plannerContext.modeLight?colors.action:colors.actionDark,
    },
    playlistItemContainer: {
      padding: 10,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: plannerContext.modeLight?colors.white:colors.secondary200Dark,
      borderRadius: 10,
      margin: 10,
      borderWidth: 1,
      borderColor:  plannerContext.modeLight?colors.action:colors.actionDark,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 5,  
    },
    playlistItemImage: {
      width: '20%',
      height: 80,
      borderRadius: 5,
      marginRight: 10,
    },
    playlistItemTextContainer: {
      display: 'flex',
      width: '80%'
    },
    playlistItemName: {
      fontSize: 16,
      fontWeight: 'bold',
      color: plannerContext.modeLight?colors.gray:colors.white,
      marginRight: 20,
    },
    playlistItemOwner: {
      fontSize: 14,
      color: plannerContext.modeLight?colors.gray:colors.actionDark,
    },
    addButton: {
      backgroundColor: 'blue',
      borderRadius: 25,
      width: 150,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      marginTop: 20,
    },
    addButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
  return (
    <View style={styles.wrapper}>
      <View style={styles.itemsWrapper}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          placeholder="Search for Playlist"
          value={text}
        />
        <TouchableOpacity onPress={handleSearch}>
          <Image
            source={require('../assets/icons/search.png')}
            style={{ width: 32, height: 32, tintColor: plannerContext.modeLight?colors.action:colors.actionDark}}
          />
        </TouchableOpacity>
      </View>
      {errorMessage.length > 0 && <Text style={styles.errorMessage}>{errorMessage}</Text>}
      <FlatList
        data={playlists}
        renderItem={renderPlaylistItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.playlistContainer}
      />
      
    </View>
  );
};

export default Playlist;


