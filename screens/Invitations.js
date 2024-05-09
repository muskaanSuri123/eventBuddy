import {
  View,
  StyleSheet,
  Text,
  Image,
  Button,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { PlannerContext } from "../contexts/PlannerContext";
import { colors } from "../utils/Colors";
const Invitations = () => {
  const plannerContext = useContext(PlannerContext)
  const navigation = useNavigation();

  const styles = StyleSheet.create({
    wrapper: {
      backgroundColor:plannerContext.modeLight?colors.grayLight:colors.primaryDark,
      height: "100%"
    },
    main: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "center",
      flexWrap: "wrap",
      
    },
    box: {
      height: 190,
      width: 150,
      border: 5,
      backgroundColor: plannerContext.modeLight?colors.white:colors.secondary200Dark,
      borderRadius: 7,
      marginTop: 50,
      padding: 11,
    },
  
    text2: {
      fontFamily: "Pacifico",
      fontSize: 28,
      textAlign: "center",
      padding: 5,
      color: plannerContext.modeLight?colors.action200:colors.actionDark,
    },
  
    img: {
      width: "100%",
      height: "100%",
    },
    icon: {
      height: 15,
      width: 15,
    },
    sec: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-evenly",
      height: 300,
    },
    btn: {
      display: "flex",
    },
  });
  return (
    <View style={styles.wrapper}>
      <Text style={styles.text2}>Templates</Text>
      <View style={styles.main}>
        <View style={styles.sec}>
          <View
            style={styles.box}
            onMouseEnter={() => {
              {
                styles.boxHover;
              }
            }}
          >
            <Image
              style={styles.img}
              source={require("../assets/icons/cake.png")}
            ></Image>
          </View>

          <View style={styles.btn}>
            <Image
              source={require("../assets/icons/edit.svg")}
              style={styles.icon}
            ></Image>
            <Button
              title="customize"
              color={plannerContext.modeLight?colors.action200:colors.actionDark}
              onPress={() => {
                navigation.navigate("Invite 1");
              }}
            ></Button>
          </View>
        </View>
        <View style={styles.sec}>
          <View style={styles.box}>
            <Image
              style={styles.img}
              source={require("../assets/icons/anniversary.png")}
            ></Image>
          </View>
          <Button
            title="customize"
            color={plannerContext.modeLight?colors.action200:colors.actionDark}
            onPress={() => {
              navigation.navigate("Invite 2");
            }}
          ></Button>
        </View>
        <View style={styles.sec}>
          <View style={styles.box}>
            <Image
              style={styles.img}
              source={require("../assets/icons/Wedding.png")}
            ></Image>
          </View>
          <Button
            title="customize"
            color={plannerContext.modeLight?colors.action200:colors.actionDark}
            onPress={() => {
              navigation.navigate("Invite 3");
            }}
          ></Button>
        </View>
        <View style={styles.sec}>
          <View style={styles.box}>
            <Image
              style={styles.img}
              source={require("../assets/icons/houseWarming.png")}
            ></Image>
          </View>
          <Button
            title="customize"
            color={plannerContext.modeLight?colors.action200:colors.actionDark}
            onPress={() => {
              navigation.navigate("Invite 4");
            }}
          ></Button>
        </View>
      </View>
    </View>
  );
};

export default Invitations;

