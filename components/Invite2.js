import { View, StyleSheet, TextInput, Text, Image , Button  ,  Keyboard, Pressable} from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import * as MediaLibrary from 'expo-media-library';
import { captureRef } from 'react-native-view-shot';
import { useState , useRef } from "react";
import { useContext} from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { PlannerContext } from "../contexts/PlannerContext";
import { colors } from "../utils/Colors";
import { useNavigation } from "@react-navigation/native";
const Invite2 = () => {
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
    const temp = { ...plannerContext.invitation, couple: val };
    plannerContext.setInvitation(temp);
  };
  onChangeYear = (val) => {
    const temp = { ...plannerContext.invitation, year: val };
    plannerContext.setInvitation(temp);
  };

  onChangeDate = (val) => {
    const date = new Date(val.nativeEvent.timestamp);
    const temp = { ...plannerContext.invitation, date: date };
    plannerContext.setInvitation(temp);
  };
  onChangeVenue = (val) => {
    const temp = { ...plannerContext.invitation, venue: val };
    plannerContext.setInvitation(temp);
  };

  onChangeAddress = (val) => {
    const temp = { ...plannerContext.invitation, address: val };
    plannerContext.setInvitation(temp);
  };


  const onSaveImageAsync = async () => {
    plannerContext.setSelectedInvitation("Invite2")
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
    <TouchableWithoutFeedback onPress={()=>
      Keyboard.dismiss()}>
    <View style={styles.parent} 
     ref={imageRef}
    >
      <View style={styles.main}>
        <View style={styles.top}>
        <TextInput
            onChangeText={onChangeYear}
            value={plannerContext.invitation.year}
            style={styles.text}
          ></TextInput>
          <Image
            style={styles.img}
            source={require("../assets/icons/gold.png")}
          ></Image>
        </View>
        <View style={styles.bottom}>
          <TextInput style={styles.text3}>JOIN US IN CELEBRATING</TextInput>
          <TextInput
            onChangeText={onChangeName}
            value={plannerContext.invitation.couple}
            style={styles.text3}
          ></TextInput>
          <Pressable onPress={() => setPickDate(true)}>
            <Text style={styles.text3}>{getDateValue(plannerContext.invitation.date)}</Text>
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
            onChangeText={onChangeVenue}
            value={plannerContext.invitation.venue}
            style={styles.text3}
          ></TextInput>
          <TextInput
            onChangeText={onChangeAddress}
            value={plannerContext.invitation.address}
            style={styles.text3}
          ></TextInput>
          <TextInput style={styles.text3}>
            Please Rsvp to Marty at marty@gmail.com
          </TextInput>
        </View>
      </View>
    </View> 
    <Button title="Select & Download" color="#841584" onPress={onSaveImageAsync}></Button>
    </TouchableWithoutFeedback>
  );
};

export default Invite2;

const styles = StyleSheet.create({
  main: {
    display: "flex",
    alignItems: "stretch",
    flexDirection: "column",
    height: "80%",
    marginTop: 90,
    width: "90%",
    justifyContent: "space-evenly",
    backgroundColor: "#FBF4D9",
    elevation: 2,
  }, 
  parent:{ 
    display:"flex"
    
  }
,
  img: {
    height: "100%",
    width: "100%",
  },
  top: {
    position: "relative",
    height: "48%",
    width: "90%",
  },
  text: {
    fontFamily: "Pacifico",
    fontSize: 65,
    position: "absolute",
    zIndex: 1,
    color: "#FFFFFF",
    top: 20,
    left: 10,
  },

  txt1: {
    fontSize: 15,
    textAlign: "right",
  },
  bottom: {
    height: "42%",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    textAlign: "right",
    padding: 10,
  },

  letter: {
    width: 400,
    height: 300,
    backgroundColor: "#FFFFFF",
    marginTop: 150,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  triangle: {
    width: 350,
    height: 400,
    borderLeftWidth: 170,
    borderLeftColor: "transparent",
    borderRightWidth: 170,
    borderRightColor: "transparent",
    borderBottomWidth: 170,
    borderBottomColor: "#F5F2DC",
  },

  rec: {
    backgroundColor: "#F4EECE",
    width: 350,
    height: 300,
    borderWidth: 20,
    borderColor: "#EAE5C6",
  },
  text3: {
    fontFamily: "amatic",
    fontSize: 25,
    
    textAlign:"right",
    color: "#C0BFB9",
  },
});
