import { View, Text, StyleSheet } from "react-native";
import { colors } from "../utils/Colors";
import { useContext } from "react";
import { PlannerContext } from "../contexts/PlannerContext";
const PlannerSection = ({ children, title }) => {
  const plannerContext = useContext(PlannerContext)
  const style = StyleSheet.create({
    section: {
      margin: 20,
      backgroundColor: plannerContext.modeLight? colors.white:colors.secondary200Dark,
      borderRadius: 5,
      padding: 10,
      minHeight: 200,
      elevation: 4,
      shadowColor: plannerContext.modeLight? colors.gray:colors.black,
      shadowOffset: { height: 2, width: 2 },
      shadowOpacity: 0.5,
      shadowRadius: 5,
    },
    title: {
      fontSize: 28,
      borderBottomColor: plannerContext.modeLight? colors.grayLight:colors.white,
      borderBottomWidth: 3,
      paddingBottom: 2,
      fontFamily: "Pacifico",
      color: plannerContext.modeLight? colors.secondary200:colors.actionDark,
    },
  });
  return (
    <View style={style.section}>
      <Text style={style.title}>{title}</Text>
      {children}
    </View>
  );
};

export default PlannerSection;


