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

  const getRandomWaterLevel = () => Math.floor(Math.random() * 100);

  const getLevelCategory = (waterLevel) => {
    if (waterLevel >= 90) return 'A';
    if (waterLevel >= 75) return 'B';
    if (waterLevel >= 50) return 'C';
    if (waterLevel >= 25) return 'D';
    return 'E';
  };

  const getRiskLevel = (levelCategory) => {
    if (levelCategory === 'A' || levelCategory === 'B') return 'LOW';
    if (levelCategory === 'C' || levelCategory === 'D') return 'MEDIUM';
    return 'HIGH';
  };

  const [tank1Data, setTank1Data] = useState({
    waterLevel: getRandomWaterLevel(),
    timestamp: new Date(),
  });

  const [tank2Data, setTank2Data] = useState({
    waterLevel: getRandomWaterLevel(),
    timestamp: new Date(),
  });

  const [sumpData, setSumpData] = useState({
    waterLevel: getRandomWaterLevel(),
    timestamp: new Date(),
  });

  const handleRefresh = () => {
    setTank1Data({
      waterLevel: getRandomWaterLevel(),
      timestamp: new Date(),
    });

    setTank2Data({
      waterLevel: getRandomWaterLevel(),
      timestamp: new Date(),
    });

    setSumpData({
      waterLevel: getRandomWaterLevel(),
      timestamp: new Date(),
    });
  };

  useFocusEffect(
    useCallback(() => {
      setTank1Data((prevData) => ({ ...prevData, timestamp: new Date() }));
      setTank2Data((prevData) => ({ ...prevData, timestamp: new Date() }));
      setSumpData((prevData) => ({ ...prevData, timestamp: new Date() }));
    }, [])
  );

  const renderTank = (tankData, tankNumber, backgroundColor, title) => {
    const levelCategory = getLevelCategory(tankData.waterLevel);
    const riskLevel = getRiskLevel(levelCategory);

    return (
      <View style={[styles.tankContainer, { backgroundColor }]} key={tankNumber}>
        <View style={styles.tankBox}>
          <Text style={styles.heading}>{title}</Text>
          <View style={styles.divider}></View>
          <Text>Water Level: {tankData.waterLevel}</Text>
          <View style={styles.line}></View>
          <Text>Level Category: {levelCategory}</Text>
          <View style={styles.line}></View>
          <Text>Risk Level: {riskLevel === 'HIGH' ? <Text style={styles.highRisk}>{riskLevel}</Text> : riskLevel}</Text>
          <Text style={styles.timestamp}>Updated on {tankData.timestamp.toString()}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderTank(tank1Data, 1, 'lightgray', 'Overhead Tank 1')}
      {renderTank(tank2Data, 2, 'lightgray', 'Overhead Tank 2')}
      {renderTank(sumpData, 'Underground Sump', 'lightblue', 'Underground Sump')}
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
  highRisk: {
    color: 'red',
    fontWeight: 'bold',
  },
});

export default Waterlevel;