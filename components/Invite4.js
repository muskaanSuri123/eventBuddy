import { View, StyleSheet, TextInput, Text, Image  ,  Button,
Keyboard,
Pressable} from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useState , useRef } from "react";
import * as MediaLibrary from 'expo-media-library';
import { captureRef } from 'react-native-view-shot';
import { useContext} from "react";
import { PlannerContext } from "../contexts/PlannerContext";
import DateTimePicker from "@react-native-community/datetimepicker";
import { colors } from "../utils/Colors";
import { useNavigation } from "@react-navigation/native";
const Invite4 = () => {
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

  onChangeDate = (val) => {
    const date = new Date(val.nativeEvent.timestamp);
    const temp = { ...plannerContext.invitation, date: date };
    plannerContext.setInvitation(temp);
  };
  onChangeNumber = (val) => {
    const temp = { ...plannerContext.invitation, number: val };
    plannerContext.setInvitation(temp);
  };

  onChangeAddress = (val) => {
    const temp = { ...plannerContext.invitation, address: val };
    plannerContext.setInvitation(temp);
  };
  const onSaveImageAsync = async () => {
    plannerContext.setSelectedInvitation("Invite4")
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

  const styles = StyleSheet.create({
    parent: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      height: "90%",
      margin: 12,
      marginTop: 30,
      backgroundColor:plannerContext.modeLight?colors.grayLight:colors.primaryDark
    },
    box: {
      backgroundColor: "#58493B",
      borderRadius: 10,
      height: "70%",
      width: "100%",
    },
    title: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    border: {
      width: "90%",
      height: "90%",
      backgroundColor: "transparent",
      borderWidth: 9,
      borderColor: "#E5B2F8",
      borderRadius: 10,
      margin: 20,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: 20,
    },
    hrt: {
      position: "absolute",
      height: 50,
      width: 50,
      top: 150,
      left: 60,
      zIndex: 1,
    },
    rec: {
      width: "30%",
      backgroundColor: "white",
      position: "absolute",
      height: "60%",
      bottom: 0,
      left: 50,
      backgroundColor:plannerContext.modeLight?colors.grayLight:colors.primaryDark
    },
    house: {
      height: 400,
      width: "90%",
      position: "relative",
    },
    triangle: {
      width: 80,
      height: 200,
      borderLeftWidth: 85,
      borderLeftColor: "transparent",
      borderRightWidth: 85,
      borderRightColor: "transparent",
      borderBottomWidth: 100,
      borderBottomColor: "#E5B2F8",
    },
    container: {
      height: 100,
      width: 120,
      backgroundColor: "#E5B2F8",
      position: "relative",
    },
    house: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      height: 600,
      bottom: 30,
  
    }, 
    datePickerStyle: {
      width: 230,
    },
    text: {
      width: 300,
      fontFamily: "pacifico",
      color: "black",
      textAlign: "center",
      fontSize: 30,
    },
  
    txt2: {
      fontFamily: "Sacramento-Regular",
      fontSize: 33,
      color: "#fdfd96",
      minWidth: 320,
      height: 50,
      paddingHorizontal: 10,
      textAlign:"center"
    },
  
    txt3: {
      fontFamily: "amatic",
      fontSize: 20,
      color: "#ECC6FA",
      zIndex: 10,
    },
  });
  return ( 
    <TouchableWithoutFeedback onPress={()=>
      Keyboard.dismiss()}>
    <View style={styles.parent}
     ref={imageRef}>
      <View style={styles.box}>
        <View style={styles.border}>
          <View style={styles.title}>
            <Text style={styles.txt3}>THE </Text>
            <TextInput
              onChangeText={onChangeName}
              value={plannerContext.invitation.name}
              style={styles.txt3}
            ></TextInput>
            <Text style={styles.txt3}>ARE SETTLED IN</Text>
          </View>
          <Text style={styles.txt2}>Housewarming celebration</Text>

          <Pressable onPress={() => setPickDate(true)}>
            <Text style={styles.txt3}>{getDateValue(plannerContext.invitation.date)}</Text>
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
                  color: "pink",
                },
                dateText: {
                  fontSize: 40, 
                  color:"pink", 
                  fontFamily: "pacifico"
                  
                },
              }}
              onChange={(date) => {
                setPickDate(false);
                onChangeDate(date);
              }}
            />
          )}
          <TextInput
            onChangeText={onChangeAddress}
            value={plannerContext.invitation.address}
            style={styles.txt3}
          ></TextInput>
          <View style={styles.title}>
            <Text style={styles.txt3}>RSVP AT </Text>
            <TextInput
              onChangeText={onChangeNumber}
              value={plannerContext.invitation.number}
              style={styles.txt3}
            ></TextInput>
          </View>
          <View style={styles.house}>
            <Image
              source={require("../assets/icons/heart.png")}
              style={styles.hrt}
            ></Image>
            <View style={styles.triangle}></View>
            <View style={styles.container}>
              <View style={styles.rec}></View>
            </View>
          </View>
        </View>
      </View>
    </View> 
    <Button title="Select & Download" color="#841584" onPress={onSaveImageAsync}></Button>
    </TouchableWithoutFeedback>
  );
};

export default Invite4;


