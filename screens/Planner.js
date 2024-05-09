import {
  StyleSheet,
  View,
  Text,
  Pressable,
  FlatList,
  ScrollView,
} from "react-native";
import { colors } from "../utils/Colors";
import { useContext, useEffect, useRef } from "react";
import { PlannerContext } from "../contexts/PlannerContext";
import PlannerSection from "../components/PlannerSection";
import { useNavigation } from "@react-navigation/native";
import * as MediaLibrary from "expo-media-library";
import { captureRef } from "react-native-view-shot";
import Invite from "../components/Invite";
import Invite2 from "../components/Invite2";
import Invite3 from "../components/Invite3";
import Invite4 from "../components/Invite4";

const Planner = () => {
  const plannerContext = useContext(PlannerContext);
  const navigation = useNavigation();
  const imageRef = useRef();
  const [status, requestPermission] = MediaLibrary.usePermissions();
  if (status === null) {
    requestPermission();
  }

  useEffect(()=>{
    console.log(plannerContext.selectedInvitation,"testttttt")
  })

  const onSaveImageAsync = async () => {
    try {
      const localUri = await captureRef(imageRef, {
        height: 440,
        quality: 1,
      });
      await MediaLibrary.saveToLibraryAsync(localUri);
      if (localUri) {
        alert("your planner is Saved to gallery!");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const styles = StyleSheet.create({
    text: {
      fontFamily: "Pacifico",
      fontSize: 18,
      color: plannerContext.modeLight ? colors.gray : colors.white,
      margin: 20,
    },
    venueDetails: {
      display: "flex",
      flexDirection: "column",
    },
    name: {
      fontSize: 20,
      fontFamily: "Pacifico",
      color: plannerContext.modeLight ? colors.action : colors.white,
    },
    phone: {
      marginTop: 20,
      fontSize: 15,
      fontWeight: "600",
      color: plannerContext.modeLight ? colors.gray : colors.white,
      fontFamily: "Sacramento-Regular",
    },
    playlistId: {
      marginTop: 10,
      fontSize: 15,
      color: plannerContext.modeLight ? colors.gray : colors.white,
      opacity: 0.5,
    },
    btn: {
      marginTop: 20,
      backgroundColor: plannerContext.modeLight
        ? colors.action200
        : colors.actionDark,
      color: "white",
      fontSize: 18,
      padding: 10,
      borderRadius: 5,
    },
    btnPlanner: {
      alignSelf: "center",
      marginTop: 20,
      backgroundColor: plannerContext.modeLight
        ? colors.secondary200
        : colors.secondary200,
      color: "white",
      fontSize: 18,
      padding: 10,
      borderRadius: 5,
      width: "50%",
      position: "absolute",
      bottom: 0,
    },
    list: {
      flex: 1,
      marginTop: 10,
    },
    todoItem: {
      backgroundColor: "#f0f0f0",
      padding: 10,
      borderRadius: 5,
      marginBottom: 10,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    todoText: {
      flex: 1,
      fontSize: 16,
    },
  });
  return (
    <View
      style={{
        backgroundColor: plannerContext.modeLight
          ? colors.grayLight
          : colors.primaryDark,
        flex: 1,
      }}
    >
      {plannerContext.venue ||
      plannerContext.todos.length > 0 ||
      plannerContext.playlist ||
      plannerContext.guestList ||
      plannerContext.selectedInvitation ? (
        <>
          <ScrollView
            style={{
              marginBottom: 40,
            }}
          >
            {plannerContext.venue && (
              <PlannerSection title={"Venue"} ref={imageRef}>
                <View style={styles.venueDetails}>
                  <Text style={styles.name}>{plannerContext.venue.name}</Text>
                  <Text style={styles.phone}>{plannerContext.venue.phone}</Text>
                  <Pressable
                    onPress={() => {
                      navigation.navigate("Venue Home");
                    }}
                  >
                    <Text style={styles.btn}>Choose Another Venue</Text>
                  </Pressable>
                </View>
              </PlannerSection>
            )}
            {plannerContext.todos.length > 0 && (
              <PlannerSection title={"Todo List"}>
                <FlatList
                  style={styles.list}
                  data={plannerContext.todos}
                  renderItem={({ item }) => (
                    <View style={styles.todoItem}>
                      <Text style={styles.todoText}>{item.text}</Text>
                    </View>
                  )}
                  keyExtractor={(item) => item.id.toString()}
                  ItemSeparatorComponent={() => (
                    <View style={styles.separator} />
                  )}
                />
                <Pressable
                  onPress={() => {
                    navigation.navigate("Todo List Screen");
                  }}
                >
                  <Text style={styles.btn}>Edit Todo List</Text>
                </Pressable>
              </PlannerSection>
            )}
            {plannerContext.playlist && (
              <PlannerSection title={"PlayList"}>
                <View style={styles.venueDetails}>
                  <Text style={styles.name}>
                    {plannerContext.playlist.name}
                  </Text>
                  <Text style={styles.playlistId}>
                    {plannerContext.playlist.id}
                  </Text>
                  <Pressable
                    onPress={() => {
                      navigation.navigate("Playlist Screen");
                    }}
                  >
                    <Text style={styles.btn}>Choose Another Playlist</Text>
                  </Pressable>
                </View>
              </PlannerSection>
            )}
            {plannerContext.selectedInvitation !== "" && (
              <PlannerSection title={"Invitation"}>
                <View style={styles.venueDetails}>
                  <View style = {{height:450}}>
                  {plannerContext.selectedInvitation === "Invite" && <Invite />}
                  {plannerContext.selectedInvitation === "Invite2" && (
                    <Invite2 />
                  )}
                  {plannerContext.selectedInvitation === "Invite3" && (
                    <Invite3 />
                  )}
                  {plannerContext.selectedInvitation === "Invite4" && (
                    <Invite4 />
                  )}
                  </View>
                  <Pressable
                    onPress={() => {
                      navigation.navigate("Invitation Screen");
                    }}
                  >
                    <Text style={styles.btn}>Choose Another Invitation</Text>
                  </Pressable>
                </View>
              </PlannerSection>
            )}
            {plannerContext.guestList && (
              <PlannerSection title={"GuestList"}>
                <View style={styles.venueDetails}>
                  <Text style={styles.name}>
                    Total Number of Guests :{" "}
                    {plannerContext.guestList.totalGuests}
                  </Text>
                  <Text style={styles.playlistId}>
                    {" "}
                    Number of tables in the venue :{" "}
                    {plannerContext.guestList.tableCount}
                  </Text>
                  <Pressable
                    onPress={() => {
                      navigation.navigate("Guest List Screen");
                    }}
                  >
                    <Text style={styles.btn}>Choose Another GuestList</Text>
                  </Pressable>
                </View>
              </PlannerSection>
            )}
          </ScrollView>

          {/* <Pressable onPress={onSaveImageAsync}>
            <Text style={styles.btnPlanner}>Download Planner</Text>
          </Pressable> */}
        </>
      ) : (
        <Text style={styles.text}>
          Your planner is empty add essentials from the main menu
        </Text>
      )}
    </View>
  );
};

export default Planner;
