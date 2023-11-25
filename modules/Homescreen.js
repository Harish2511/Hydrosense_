// HomeScreen.js

import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const [isHomeSelected, setHomeSelected] = useState(true);

  const handleToggleSwitch = () => {
    setHomeSelected(!isHomeSelected);
    // Navigate to the selected screen based on the toggle state
    navigation.navigate(isHomeSelected ? 'Analytics' : 'Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Home Screen</Text>

      <View style={styles.toggleContainer}>
        <Text>{isHomeSelected ? 'Home' : 'Analytics'}</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isHomeSelected ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={handleToggleSwitch}
          value={isHomeSelected}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
});

export default HomeScreen;
