import { Modal, Pressable, View, Text, StyleSheet } from "react-native";
import { colors } from "../../utils/Colors";
import { useContext } from "react";
import { PlannerContext } from "../../contexts/PlannerContext";

const ConfirmVenueModal = ({ showModal, tempLocation ,confirmHandler, cancelHandler }) => {
  const plannerContext = useContext(PlannerContext)
  const styles = StyleSheet.create({
    backdrop: {
      height: "100%",
      width: "100%",
      backgroundColor: plannerContext.modeLight?colors.secondary:colors.primaryDark,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    text: {
      fontSize: 25,
      fontFamily: "Pacifico",
      color: "white",
      marginBottom: 10,
    },
    buttons: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-evenly",
    },
    button: {
      backgroundColor: plannerContext.modeLight?colors.action200:colors.actionDark,
      padding: 10,
      margin: 5,
      borderRadius: 5,
    },
    content:{
      borderColor: "white",
      borderWidth: 5,
      borderRadius:5,
      padding:10,
      width:"90%"
    }
  });


  return (
    <Modal visible={showModal} animationType="slide">
      {tempLocation ? (
        <View style={styles.backdrop}>
          <View style={styles.content}>
            <Text
              style={styles.text}
            >{`Select ${tempLocation.name} as your venue?`}</Text>
            <View style={styles.buttons}>
              <Pressable
                onPress={confirmHandler}
                style={styles.button}
              >
                <Text style={{ color: "white" }}>Confirm</Text>
              </Pressable>
              <Pressable
                onPress={cancelHandler}
                style={styles.button}
              >
                <Text style={{ color: "white" }}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      ) : (
        <Text>Loading</Text>
      )}
    </Modal>
  );
};

export default ConfirmVenueModal;


