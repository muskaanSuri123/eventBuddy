import { View, Image, StyleSheet, Text } from "react-native";
import { colors } from "../utils/Colors";
import { useContext } from "react";
import { PlannerContext } from "../contexts/PlannerContext";
const Loader = () => {
  const plannerContext = useContext(PlannerContext)

  const styles = StyleSheet.create({
    loader: {
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor:plannerContext.modeLight?colors.grayLight:colors.primaryDark ,
    },
    imgWrapper:{
      backgroundColor:plannerContext.modeLight?"white":colors.secondary200Dark,
      padding:50,
      borderRadius:111
    },
    logo: {
      height: 100,
      width: 100,
    },
    text: {
      fontFamily: "Pacifico",
      fontSize: 25,
      color:plannerContext.modeLight? colors.action200:"white",
    },
  });


  return (
    <View style={styles.loader}>
      <View style={styles.imgWrapper}>
        <Image
          source={require("../assets/icons/cat.png")}
          style={styles.logo}
        ></Image>
        <Text style={styles.text}>Loading...</Text>
      </View>
    </View>
  );
};

export default Loader;


