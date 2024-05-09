import { useNavigation } from "@react-navigation/native";
import { Pressable, StyleSheet } from "react-native";
import { View, Text, Image } from "react-native";
import { colors } from "../utils/Colors";
import { useContext } from "react";
import { PlannerContext } from "../contexts/PlannerContext";
const MenuItem = ({ item }) => {
    const navigation = useNavigation()
    const plannerContext = useContext(PlannerContext)
    const styles = StyleSheet.create({
      menuItem: {
        height: 150,
        width: 150,
        elevation: 4,
        shadowColor: plannerContext.modeLight?colors.gray:colors.black,
        shadowOffset: { height: 2, width: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        position: "relative",
        diplay: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: plannerContext.modeLight?colors.white:colors.secondary200Dark,
        marginVertical: 40,
        marginHorizontal:10,
        borderRadius: 10
      },
      image: {
        position: "absolute",
        top: -35,
        height: 70,
        width: 70,
      },
      title: {
        fontSize: 22,
        fontFamily:"Pacifico",
        color:plannerContext.modeLight?colors.action200:colors.white
      },
    });
  return (
    <Pressable onPress={()=>{navigation.navigate(item.screen)}}>
    <View style={styles.menuItem}>
      {<Image source={item.img} style={styles.image}></Image>}
      <Text style={styles.title}>{item.title}</Text>
    </View>
    </Pressable>
  );
};

export default MenuItem;


