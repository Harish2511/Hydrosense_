import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

const MotorState = () => {
  const [selectedBlock, setSelectedBlock] = useState('Select Block');
  const [isOn, setIsOn] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    // Customize the header when the component mounts
    navigation.setOptions({
      headerTitle: 'Motor State',
      headerStyle: {
        backgroundColor: 'brown', // Background color
      },
      headerTintColor: 'white', // Text color
      headerTitleAlign: 'left', // Align title to the left
    });
  }, [navigation]);

  const handleOffButtonPress = () => {
    setIsOn(false);
  };

  const handleOnButtonPress = () => {
    setIsOn(true);
  };

  const handleChangeButtonPress = () => {
    if (selectedBlock === 'Select Block') {
      // Show alert or handle accordingly
    } else {
      // Handle CHANGE button press using selectedBlock
    }
  };

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedBlock}
        onValueChange={(itemValue) => setSelectedBlock(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Select Block" value="Select Block" />
        <Picker.Item label="Vasista Bhavanam" value="Vasista Bhavanam" />
        <Picker.Item label="Gautama Bhavanam" value="Gautama Bhavanam" />
        <Picker.Item label="Agastya Bhavanam" value="Agastya Bhavanam" />
      </Picker>
      <View style={styles.motorOptions}>
        <Text style={styles.motorOptionsText}>Motor Options</Text>
        <TouchableOpacity
          onPress={handleOffButtonPress}
          style={[styles.button, { backgroundColor: isOn ? 'transparent' : 'brown' }]}
        >
          <Text style={{ color: isOn ? 'brown' : 'white', fontSize: 16 }}>OFF</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleOnButtonPress}
          style={[styles.button, { backgroundColor: isOn ? 'brown' : 'transparent' }]}
        >
          <Text style={{ color: isOn ? 'white' : 'brown', fontSize: 16 }}>ON</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleChangeButtonPress}
          style={styles.changeButton}
        >
          <Text style={styles.buttonText}>CHANGE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'top',
    padding: 16,
  },
  picker: {
    height: 50,
    marginBottom: 20,
  },
  motorOptions: {
    alignItems: 'center',
  },
  motorOptionsText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  button: {
    width: 100,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  changeButton: {
    width: 100,
    height: 40,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
});

export default MotorState;
