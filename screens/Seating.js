import React, { useContext, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/core";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import { PlannerContext } from "../contexts/PlannerContext";
import { colors } from "../utils/Colors";

const Seating = ({ route }) => {
  const { groups } = route.params;
  const [selectedTable, setSelectedTable] = useState(null);
  const [zoomAnim] = useState(new Animated.Value(1));
  const plannerContext = useContext(PlannerContext);
  const navigation = useNavigation();
  const handleTablePress = (tableIndex) => {
    if (selectedTable === tableIndex) {
      setSelectedTable(null);
      Animated.timing(zoomAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      setSelectedTable(tableIndex);
      Animated.timing(zoomAnim, {
        toValue: 0.8,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };
 

  const styles = StyleSheet.create({
    container: {
      padding: 20,
    },
    tableContainer: {
      marginBottom: 20,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: "rgba(0, 0, 0, 0.1)",
      padding: 10,
      backgroundColor: plannerContext.modeLight
        ? colors.white
        : colors.secondary200Dark,
      elevation: 4,
      shadowColor: plannerContext.modeLight ? colors.gray : colors.black,
      shadowOffset: { height: 2, width: 1 },
      shadowOpacity: 0.5,
      shadowRadius: 5,
    },
    tableName: {
      fontWeight: "bold",
      fontSize: 18,
      marginBottom: 10,
      textAlign: "center",
      color: plannerContext.modeLight ? colors.black : colors.white,
    },
    addButton: {
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.secondary,
      borderRadius: 25,
      height: 60,
      marginBottom: 20,
      backgroundColor: plannerContext.modeLight?colors.secondary:colors.actionDark,
    },
    addButtonText: {
      fontSize: 22,
      fontFamily: "Sofia-Regular",
      color:plannerContext.modeLight?colors.action:colors.white,
    },
    guestBox: {
      borderWidth: 1,
      borderColor: plannerContext.modeLight ? colors.black : colors.white,
      padding: 10,
      marginBottom: 10,
    },
    guestId: {
      fontSize: 16,
      fontWeight: "bold",
      color: plannerContext.modeLight ? colors.black : colors.white,
    },
    guestCategory: {
      fontSize: 14,
      color: plannerContext.modeLight ? colors.black : colors.white,
    },
  });
  const handleAddGuestlist = () => {
    navigation.navigate("Planner Screen");
  };


  return (
    <ScrollView
      style={{
        backgroundColor: plannerContext.modeLight
          ? colors.grayLight
          : colors.primaryDark,
      }}
    >
      <View style={styles.container}>
        {groups.map((table, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.tableContainer,
              selectedTable === index && {
                transform: [{ scale: zoomAnim }],
                zIndex: 1,
                elevation: 5,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
              },
            ]}
            onPress={() => handleTablePress(index)}
            activeOpacity={0.9}
          >
            <Text style={styles.tableName}>Table {index + 1}</Text>
            {selectedTable === index && (
              <View>
                {table.map((person, personIndex) => (
                  <View key={personIndex} style={styles.guestBox}>
                    <Text style={styles.guestId}>{person.person}</Text>
                    <Text style={styles.guestCategory}>{person.category}</Text>
                  </View>
                ))}
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity onPress={handleAddGuestlist} style={styles.addButton}>
        <Text style={styles.addButtonText}> Add GuestList </Text>
      </TouchableOpacity>
    </ScrollView>
    
  );
};

export default Seating;
