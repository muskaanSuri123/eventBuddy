import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../utils/Colors';

const Splash = ({ navigation }) => {
  const appName = "Event Buddy"; 


  return (
    <View style={styles.container}>
      <View style={styles.appNameContainer}>
        <Text style={styles.appNameText}>{appName}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appNameContainer: {
    overflow: 'hidden',
  },
  appNameText: {
    fontFamily: 'Pacifico',
    fontSize: 36,
    color: 'white',
    textAlign: 'center',
  },
});

export default Splash;
