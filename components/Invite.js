import { useRef, useState } from "react";
import { useContext } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Image,
  Keyboard,
  Button,
  Pressable,
} from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import * as MediaLibrary from "expo-media-library";
import { captureRef } from "react-native-view-shot";
import { colors } from "../utils/Colors";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { PlannerContext } from "../contexts/PlannerContext";
import { useNavigation } from "@react-navigation/native";

const Invite = () => {
  const [status, requestPermission] = MediaLibrary.usePermissions();
  const navigation = useNavigation()
  const getDateValue = (date) => {
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();

    const formattedDate = `${month}-${day}-${year}`;
    return formattedDate
  };
  const [pickDate, setPickDate] = useState(false);

  if (status === null) {
    requestPermission();
  }
  const imageRef = useRef();
  const plannerContext = useContext(PlannerContext);
  
  onChangeName = (val) => {
    const temp = { ...plannerContext.invitation, name: val };
    plannerContext.setInvitation(temp);
  };

  onChangeTime = (val) => {
    const temp = { ...plannerContext.invitation, time: val };
    plannerContext.setInvitation(temp);
  };
  onChangeVenue = (val) => {
    const temp = { ...plannerContext.invitation, venue: val };
    plannerContext.setInvitation(temp);
  };
  onChangeDate = (val) => {
    const date = new Date(val.nativeEvent.timestamp);
    const temp = { ...plannerContext.invitation, date: date };
    plannerContext.setInvitation(temp);
  };

  const onSaveImageAsync = async () => {
    plannerContext.setSelectedInvitation("Invite")
    try {
      const localUri = await captureRef(imageRef, {
        height: 440,
        quality: 1,
      });

      await MediaLibrary.saveToLibraryAsync(localUri);
      if (localUri) {
        alert("your image is Saved!");
      }
      navigation.navigate("Planner Screen")
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container} ref={imageRef}>
        <View style={styles.pattern}>
          <View style={styles.bgBar}></View>
          <View style={styles.bgBar}></View>
          <View style={styles.bgBar}></View>
          <View style={styles.bgBar}></View>
          <View style={styles.bgBar}></View>
          <View style={styles.bgBar}></View>
          <View style={styles.bgBar}></View>
          <View style={styles.bgBar}></View>
          <View style={styles.bgBar}></View>
          <View style={styles.bgBar}></View>
          <View style={styles.bgBar}></View>
          <View style={styles.bgBar}></View>
          <View style={styles.bgBar}></View>
          <View style={styles.bgBar}></View>
          <View style={styles.bgBar}></View>
          <View style={styles.bgBar}></View>
        </View>
        {/* {<View style={styles.balloon}>
        <View style={styles.ball}></View>
        <View style={styles.stick}></View>
      </View>} */}
        <View style={styles.triangle}></View>

        <View style={styles.layerA}>
          <Text style={styles.text}>a hearty Welcome to </Text>
        </View>
        <View style={styles.layerB}>
          <TextInput
            style={[styles.Inputs, styles.text2]}
            class="name"
            onChangeText={onChangeName}
            value={plannerContext.invitation.name}
          ></TextInput>
          <Text style={styles.text3}>birthday bash</Text>
        </View>
        <Image
          style={styles.bow}
          source={require("../assets/icons/bow-tie.png")}
        />
        <Image
          style={styles.bow2}
          source={require("../assets/icons/bow-tie.png")}
        />

        <View style={styles.layerC}>
          <Pressable onPress={() => setPickDate(true)}>
            <Text style={styles.text}>{getDateValue(plannerContext.invitation.date)}</Text>
          </Pressable>

          {pickDate && (
            <DateTimePicker
              style={styles.datePickerStyle}
              value={plannerContext.invitation.date}
              mode="date"
              placeholder="select date"
              format="DD/MM/YYYY"
              minDate="01-01-1900"
              maxDate="01-01-2000"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: "absolute",
                  right: -5,
                  top: 4,
                  marginLeft: 0,
                },
                dateInput: {
                  borderColor: "gray",
                  alignItems: "flex-start",
                  borderWidth: 0,
                  borderBottomWidth: 1,
                },
                placeholderText: {
                  fontSize: 17,
                  color: "gray",
                },
                dateText: {
                  fontSize: 17,
                },
              }}
              onChange={(date) => {
                setPickDate(false);
                onChangeDate(date);
              }}
            />
          )}
          <TextInput
            style={styles.text}
            class="time"
            onChangeText={onChangeTime}
            value={plannerContext.invitation.time}
          ></TextInput>
          <TextInput
            class="venue"
            style={styles.text}
            onChangeText={onChangeVenue}
            value={plannerContext.invitation.venue}
          ></TextInput>
          <Text style={styles.text3}> R.s.v.p to xxx.xxx.xxx</Text>
        </View>
      </View>
      <Button title="Select & Download" color="#841584" onPress={onSaveImageAsync}></Button>
    </TouchableWithoutFeedback>
  );
};

export default Invite;

const styles = StyleSheet.create({
  container: {
    height: "90%",
    backgroundColor: "#FEFFE4",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
    margin: 15,
  },
  Inputs: {
    width: "70%",
    height: 50,
    padding: 7,
    color: "#FDFED9",
  },
  bow: {
    position: "absolute",
    height: 60,
    width: 60,
    left: 49,
    top: 300,
    zIndex: 1,
  },
  bow2: {
    position: "absolute",
    height: 60,
    width: 60,
    right: 49,
    top: 300,
    zIndex: 1,
  },
  text: {
    fontFamily: "montez",
    fontSize: 24,
    textAlign: "center",
    padding: 7,
    color: "#FFFDD0",
  },
  text2: {
    fontFamily: "Pacifico",
    fontSize: 28,
    textAlign: "center",
    padding: 5,
  },

  datePickerStyle: {
    width: 230,
  },
  text3: {
    fontFamily: "amatic",
    fontSize: 24,
    textAlign: "center",
    padding: 5,
    color: "#55AECD",
  },

  layerA: {
    height: 80,
    width: 160,
    backgroundColor: "#ffb6c1",
    borderRdius: 5,
    border: 2,
    borderRadius: 5,
    borderColor: "#ffb6c1",
    borderTopLeftRadius: 3.2,
    borderTopRightRadius: 3.2,
    borderBottomLeftRadius: 3.2,
    borderBottomRightRadius: 3.2,
    borderBottomColor: colors.action,
    borderBottomWidth: 4,
    display: "flex",
    alignItems: "center",
  },
  layerB: {
    height: 110,
    width: 210,
    backgroundColor: "#ffb6c1",
    borderRdius: 5,
    border: 2,
    borderColor: "#ffb6c1",
    alignItems: "center",
    borderTopLeftRadius: 3.2,
    borderTopRightRadius: 3.2,
    borderBottomLeftRadius: 3.2,
    borderBottomRightRadius: 3.2,
    borderBottomColor: colors.action,
    borderBottomWidth: 4,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    position: "relative",
  },

  triangle: {
    width: 50,
    height: 190,
    borderLeftWidth: 25,
    borderLeftColor: "transparent",
    borderRightWidth: 25,
    borderRightColor: "transparent",
    borderBottomWidth: 60,
    borderBottomColor: "#FFD580",
  },

  layerC: {
    height: 170,
    width: 260,
    backgroundColor: "#ffb6c1",
    borderRdius: 5,
    border: 2,
    borderColor: "#ffb6c1",
    alignItems: "center",
    borderTopLeftRadius: 3.2,
    borderTopRightRadius: 3.2,
    borderBottomLeftRadius: 3.2,
    borderBottomRightRadius: 3.2,
    borderBottomColor: colors.action,
    borderBottomWidth: 4,
    marginBottom: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },

  pattern: {
    position: "absolute",
    height: "250%",
    width: "270%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  bgBar: {
    width: 10,
    height: "100%",
    backgroundColor: colors.action,
    transform: "rotateZ(-45deg)",
  },
});
