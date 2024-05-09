import PlacesInput from "react-native-places-input";
import { StyleSheet, View ,Text} from "react-native";
import { colors } from "../utils/Colors";
import { useContext } from "react";
import { PlannerContext } from "../contexts/PlannerContext";
import { useNavigation } from "@react-navigation/native";
const VenueCustom = () => {
    const plannerContext = useContext(PlannerContext)
    const navigation = useNavigation()

    const style =  StyleSheet.create({
      text:{
          fontFamily:"Pacifico",
          fontSize:18,
          color:plannerContext.modeLight? colors.secondary:colors.white,
          margin:10,
          borderBottomColor: colors.action200,
          borderBottomWidth: 3,
          paddingBottom:10,
          marginTop:20
      }
  })
  return (
    <View style={{ flex: 1 ,backgroundColor:plannerContext.modeLight?colors.grayLight:colors.primaryDark}}>
    <Text style={style.text}>Search the location of your choice and explore nearby venue locations.</Text>
      <PlacesInput
        googleApiKey={"AIzaSyCsIz-qQ2MAhFufx1ddtRYSCgEwQFJWwa8"}
        onSelect={(place) =>{ 
            const obj = {
                coords:{
                    latitude:place.result.geometry.location.lat,
                    longitude:place.result.geometry.location.lng
                }
            }
            plannerContext.setCurrentLocation(obj)
            navigation.navigate("Venue Current",{getCurrentLocation:false})
        }}
        stylesContainer={{marginTop:90}}
      />
    </View>
  );
};

export default VenueCustom;

