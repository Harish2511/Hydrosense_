import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TouchableHighlight, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { InfluxDB } from "@influxdata/influxdb-client";

// Import both components
import WaterLevel from './Waterlevel'; // Assuming WaterLevel.js contains the Waterlevel component
import TankScreen from './TankScreen'; // Assuming TankScreen.js contains the TankScreen component

const WaterLevelMonitor = () => {
  const navigation = useNavigation();
  const [isWaterLevelPage, setIsWaterLevelPage] = useState(true); // State to track current page

  useEffect(() => {
    // Set options for the navigation header with toggle switch
    navigation.setOptions({
      headerTitle: 'Water Level Monitor',
      headerRight: () => (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isWaterLevelPage ? "#f4f3f4" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={togglePage}
            value={isWaterLevelPage}
          />
          <TouchableHighlight
            style={styles.refreshButton}
            underlayColor="#d3d3d3"
            onPress={handleRefresh}
          >
            <MaterialCommunityIcons name="refresh" size={28} color="white" />
          </TouchableHighlight>
        </View>
      ),
    });
  }, [navigation, isWaterLevelPage]);

  const togglePage = () => {
    setIsWaterLevelPage((prevValue) => !prevValue); // Toggle between water level page and tank screen page
  };

  const handleRefresh = () => {
    // Refresh data based on the current page
    if (isWaterLevelPage) {
      // Refresh data for Waterlevel component
      // You can add logic here if needed
    } else {
      // Refresh data for TankScreen component
      // You can add logic here if needed
    }
  };

  return (
    <View style={styles.container}>
      {isWaterLevelPage ? <WaterLevel /> : <TankScreen />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch', // Adjusted to stretch to full width
    backgroundColor: '#ecf0f1',
  },
  refreshButton: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 7,
  },
});

export default WaterLevelMonitor;
