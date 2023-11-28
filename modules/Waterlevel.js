import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Waterlevel = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Water Level',
      headerRight: () => (
        <TouchableHighlight
          style={styles.refreshButton}
          underlayColor="#d3d3d3" // Change the color when pressed
          onPress={handleRefresh}
        >
          <MaterialCommunityIcons name="refresh" size={28} color="white" />
        </TouchableHighlight>
      ),
    });
  }, [navigation]);

  const [tank1Data, setTank1Data] = useState({
    waterLevel: 75,
    levelCategory: 'A',
    riskLevel: 'LOW',
    timestamp: new Date(),
  });

  const [tank2Data, setTank2Data] = useState({
    waterLevel: 45,
    levelCategory: 'C',
    riskLevel: 'MEDIUM',
    timestamp: new Date(),
  });

  const [sumpData, setSumpData] = useState({
    waterLevel: 60,
    levelCategory: 'B',
    riskLevel: 'MEDIUM',
    timestamp: new Date(),
  });

  const handleRefresh = () => {
    // Simulating new data on refresh
    setTank1Data({
      waterLevel: Math.floor(Math.random() * 100),
      levelCategory: String.fromCharCode(65 + Math.floor(Math.random() * 5)), // Random 'A' to 'E'
      riskLevel: ['LOW', 'MEDIUM', 'HIGH'][Math.floor(Math.random() * 3)], // Random 'LOW', 'MEDIUM', 'HIGH'
      timestamp: new Date(),
    });

    setTank2Data({
      waterLevel: Math.floor(Math.random() * 100),
      levelCategory: String.fromCharCode(65 + Math.floor(Math.random() * 5)),
      riskLevel: ['LOW', 'MEDIUM', 'HIGH'][Math.floor(Math.random() * 3)],
      timestamp: new Date(),
    });

    setSumpData({
      waterLevel: Math.floor(Math.random() * 100),
      levelCategory: String.fromCharCode(65 + Math.floor(Math.random() * 5)),
      riskLevel: ['LOW', 'MEDIUM', 'HIGH'][Math.floor(Math.random() * 3)],
      timestamp: new Date(),
    });
  };

  useFocusEffect(
    useCallback(() => {
      // Update timestamp when the component is focused
      setTank1Data((prevData) => ({ ...prevData, timestamp: new Date() }));
      setTank2Data((prevData) => ({ ...prevData, timestamp: new Date() }));
      setSumpData((prevData) => ({ ...prevData, timestamp: new Date() }));
    }, [])
  );

  const renderTank = (tankData, tankNumber, backgroundColor) => (
    <View style={[styles.tankContainer, { backgroundColor }]} key={tankNumber}>
      <View style={styles.tankBox}>
        <Text style={styles.heading}>Tank - {tankNumber}</Text>
        <View style={styles.divider}></View>
        <Text>Water Level: {tankData.waterLevel}</Text>
        <View style={styles.line}></View>
        <Text>Level Category: {tankData.levelCategory}</Text>
        <View style={styles.line}></View>
        <Text>Risk Level: {tankData.riskLevel}</Text>
        <Text style={styles.timestamp}>Updated on {tankData.timestamp.toString()}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {renderTank(tank1Data, 1, 'lightgray')}
      {renderTank(tank2Data, 2, 'lightgray')}
      {renderTank(sumpData, 'Underground Sump', 'lightblue')}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  tankContainer: {
    marginBottom: 16,
  },
  tankBox: {
    borderRadius: 10,
    padding: 16,
    marginBottom: 8,
  },
  heading: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  divider: {
    height: 1,
    backgroundColor: 'black',
    marginBottom: 8,
  },
  line: {
    height: 8, // Added spacing between lines
  },
  timestamp: {
    color: 'blue',
    fontStyle: 'italic',
    marginTop: 8,
  },
  refreshButton: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 7,
  },
});

export default Waterlevel;
