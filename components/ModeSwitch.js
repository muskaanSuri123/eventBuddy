import { Pressable, View, Text, StyleSheet } from "react-native";
import { PlannerContext } from "../contexts/PlannerContext";
import { colors } from "../utils/Colors";
import { useContext } from "react";

const ModeSwitch = () => {
  const plannerContext = useContext(PlannerContext);
  const style = StyleSheet.create({
    button: {
      backgroundColor: plannerContext.modeLight
        ? colors.primaryDark
        : colors.primary,
      padding: 5,
      width: 70,
      textAlign: "center",
      marginRight: 10,
      borderRadius: 5,
    },
    title: {
      color: plannerContext.modeLight?colors.secondary:colors.primaryDark,
      fontWeight:500
    },
  });
  return (
    <View>
      <Pressable
        style={style.button}
        onPress={() => plannerContext.setModeValue(!plannerContext.modeLight)}
      >
        <Text style={style.title}>
          {plannerContext.modeLight ? "Dark" : "Light"}
        </Text>
      </Pressable>
    </View>
  );
};

export default ModeSwitch;
