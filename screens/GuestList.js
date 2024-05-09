import React, { useContext, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, KeyboardAvoidingView } from 'react-native';
import { colors } from '../utils/Colors';
import { PlannerContext } from '../contexts/PlannerContext';

const GuestList = ({ navigation }) => {
  const [step, setStep] = useState(1);
  const [totalGuests, setTotalGuests] = useState('');
  const [familyGuests, setFamilyGuests] = useState('');
  const [friends, setFriends] = useState('');
  const [acquaintances, setAcquaintances] = useState('');
  const [otherGuests, setOtherGuests] = useState('');
  const [seatsPerTable, setSeatsPerTable] = useState('');
  const [numberOfTables, setNumberOfTables] = useState('');
  const plannerContext = useContext(PlannerContext)

  const handleNextStep = () => {
    if (step === 1 && (totalGuests === '' || isNaN(totalGuests) || parseInt(totalGuests)<=0 || parseInt(totalGuests)>99999 || totalGuests === '.') ) {
      Alert.alert('Please enter valid total number of guests (1-99999).');
      return;
    } else if (step === 2 && (familyGuests === '' || isNaN(familyGuests) || parseInt(familyGuests)<=0 || parseInt(familyGuests)>99999 || familyGuests === '.')) {
      Alert.alert('Please enter valid number of family guests (1-99999).');
      return;
    } else if (step === 3 && (friends === '' || isNaN(friends)|| parseInt(friends)<=0 ||  parseInt(friends)>99999 || friends === '.')) {
      Alert.alert('Please enter valid number of friends (1-99999).');
      return;
    } else if (step === 4 && (acquaintances === '' || isNaN(acquaintances) || parseInt(acquaintances)<=0 ||  parseInt(acquaintances)>99999 || acquaintances === '.')) {
      Alert.alert('Please enter valid number of acquaintances (1-99999).');
      return;
    } else if (step === 5 && (otherGuests === '' || isNaN(otherGuests) || parseInt(otherGuests)<=0 ||  parseInt(otherGuests)>99999 || otherGuests === '.')) {
      Alert.alert('Please enter valid number of other guests (1-99999).');
      return;
    } else if (step === 6 && (seatsPerTable === '' || isNaN(seatsPerTable) || parseInt(seatsPerTable)<=0 || parseInt(seatsPerTable)<=0 || parseInt(seatsPerTable)>999 || seatsPerTable === '.')) {
      Alert.alert('Please enter valid number of seats per table (1-999).');
      return;
    } else if (step === 7 && (numberOfTables === '' || isNaN(numberOfTables) || parseInt(familyGuests)<=0 || parseInt(numberOfTables)<=0 || parseInt(numberOfTables)>999 || numberOfTables === '.')) {
      Alert.alert('Please enter valid number of tables (1-999).');
      return;
    }

    if (step < 7) {
      setStep(step + 1);
    } else {
      const isValidInput = validateInput();
      if (isValidInput) {
        const groups = splitIntoGroups(
          parseInt(totalGuests),
          parseInt(familyGuests),
          parseInt(friends),
          parseInt(acquaintances),
          parseInt(otherGuests),
          parseInt(seatsPerTable),
          parseInt(numberOfTables)
        );
        navigation.navigate('Seating Screen', { groups });
        handleAddGuestlist()
      }
    }
  };

  const splitIntoGroups = (total, family, friends, acquaintances, others, seatsPerTable, numberOfTables) => {
    const groups = [];
  
    for (let i = 1; i <= family; i++) {
      const groupName = `F${i}`;
      const person = `${groupName}${i}`;
      groups.push({ person, category: 'Family' });
    }
  
    for (let i = 1; i <= friends; i++) {
      const groupName = `FR${i}`;
      const person = `${groupName}${i}`;
      groups.push({ person, category: 'Friends' });
    }
  
    for (let i = 1; i <= acquaintances; i++) {
      const groupName = `A${i}`;
      const person = `${groupName}${i}`;
      groups.push({ person, category: 'Acquaintances' });
    }
  
    for (let i = 1; i <= others; i++) {
      const groupName = `O${i}`;
      const person = `${groupName}${i}`;
      groups.push({ person, category: 'Others' });
    }

    const tables = [];
    const guestsPerTable = seatsPerTable;
    let currentIndex = 0;

    while (currentIndex < groups.length) {
      const tableGroup = groups.slice(currentIndex, currentIndex + guestsPerTable);
      tables.push(tableGroup);
      currentIndex += guestsPerTable;
    }

    return tables;
  };
  
  const handleAddGuestlist = () => {
    
    const eventGuestlist = {
      totalGuests: parseInt(totalGuests),
      tableCount: parseInt(numberOfTables),
    };
    plannerContext.addGuestlist(eventGuestlist);
  };

  const handlePreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const validateInput = () => {
    if (
      parseInt(totalGuests) !==
      parseInt(familyGuests) + parseInt(friends) + parseInt(acquaintances) + parseInt(otherGuests)
    ) {
      Alert.alert('The sum of guests in each category should be equal to the total guests.');
      return false;
    }
    else if ( (parseInt(numberOfTables) * parseInt(seatsPerTable)) <= parseInt(totalGuests)){
      Alert.alert('Not enough tables to accomodate the guests.');
      return false;
    }
    return true;
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <Text style={styles.inputTitle}>Total Number of Guests:</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              onChangeText={setTotalGuests}
              value={totalGuests}
            />
            <Text style={styles.inputNote}>Note : Total Number of Guests must be equal to the total guest that will be arriving (i.e) Sum of Family , Friends , Acquaintances , Others . The value can be total number of guests attending the events.</Text>
          </>
        );
      case 2:
        return (
          <>
            <Text style={styles.inputTitle}>Number of Family Guests:</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              onChangeText={setFamilyGuests}
              value={familyGuests}
            />
            <Text style={styles.inputNote}>Note : Total Number of Family can be 0 . The value can be total number of family guests attending the events.</Text>
          </>
        );
      case 3:
        return (
          <>
            <Text style={styles.inputTitle}>Number of Friends:</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              onChangeText={setFriends}
              value={friends}
            />
            <Text style={styles.inputNote}>Note : Total Number of Friends can be 0 . The value can be total number of friends attending the events.</Text>
          </>
        );
      case 4:
        return (
          <>
            <Text style={styles.inputTitle}>Number of Acquaintances:</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              onChangeText={setAcquaintances}
              value={acquaintances}
            />
             <Text style={styles.inputNote}>Note : Total Number of Acquaintances can be 0 . The value can be total number of acquaintances attending the events.</Text>
          </>
        );
      case 5:
        return (
          <>
            <Text style={styles.inputTitle}>Number of Other Guests:</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              onChangeText={setOtherGuests}
              value={otherGuests}
            />
            <Text style={styles.inputNote} >Note : Total Number of Other guests can be 0 . The value can be total number of other guests attending the events. You can assume this value and match it with total number of guests.</Text>
          </>
        );
      case 6:
        return (
          <>
            <Text style={styles.inputTitle}>Number of Seats per Table:</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              onChangeText={setSeatsPerTable}
              value={seatsPerTable}
            />
             <Text style={styles.inputNote}>Note : Seats per each table in the venue.</Text>
          </>
        );
      case 7:
        return (
          <>
            <Text style={styles.inputTitle}>Number of Tables:</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              onChangeText={setNumberOfTables}
              value={numberOfTables}
            />
            <Text style={styles.inputNote}>Note : Total Number of Tables in the venue.</Text>
          </>
        );
      default:
        return null;
    }
  };

  const styles = StyleSheet.create({
    stepContainer: {
      alignItems: 'center',
      marginBottom: 20,
    },
    stepText: {
      fontSize: 15,
      color:plannerContext.modeLight?colors.gray:colors.white,
      opacity:plannerContext.modeLight?0.2:1
    },
    formContainer: {
      flex: 1,
    },
    input: {
      height: 70,
      borderColor:plannerContext.modeLight?colors.grayMedium:colors.white,
      color:plannerContext.modeLight?colors.gray:colors.white,
      borderWidth: 2,
      marginBottom: 20,
      width: 70,
      marginLeft: 'auto',
      marginRight: 'auto',
      borderRadius:25,
      textAlign: 'center',
      fontSize: 18
    },
    inputTitle: {
      fontFamily: "Pacifico",
      fontSize: 28,
      textAlign: "center",
      padding: 5,
      color: plannerContext.modeLight?colors.action200:colors.actionDark,
      paddingBottom: 20
    },
    inputNote: {
      fontFamily: "Pacifico",
      textAlign: "center",
      padding: 5,
      color:plannerContext.modeLight?colors.gray:colors.white,
      paddingBottom: 20,
      opacity:plannerContext.modeLight?0.5:1
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20
    },
    previousButton: {
      backgroundColor: plannerContext.modeLight?colors.secondary:colors.actionDark,
      borderRadius: 25,
      height: 60,
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
      marginRight: 10,
    },
    nextButton: {
      backgroundColor: plannerContext.modeLight?colors.secondary:colors.actionDark,
      borderRadius: 25,
      height: 60,
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
      marginLeft: 10,
    },
    buttonText: {
      fontSize: 22,
      fontFamily: 'Sofia-Regular',
      color: colors.white,
    },
  });

  return (
    <KeyboardAvoidingView style={{ flex: 1, padding: 20,backgroundColor:plannerContext.modeLight?colors.grayLight:colors.primaryDark }}  behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}>
      <View style={styles.stepContainer}>
        <Text style={styles.stepText}>Step {step} of 7</Text>
      </View>
      <View style={styles.formContainer}>{renderStepContent()}</View>
      <View style={styles.buttonContainer}>
        {step > 1 && (
          <TouchableOpacity style={styles.previousButton} onPress={handlePreviousStep}>
            <Text style={styles.buttonText}>Previous</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.nextButton} onPress={handleNextStep}>
          <Text style={styles.buttonText}>{step === 7 ? 'Start Seating' : 'Next'}</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default GuestList;
