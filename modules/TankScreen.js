import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TouchableHighlight } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const TankScreen = () => {
  const navigation = useNavigation();
  const [tankTitle, setTankTitle] = useState('Overhead Tank 1');
  const [isLeftButtonEnabled, setLeftButtonEnabled] = useState(false);
  const [isRightButtonEnabled, setRightButtonEnabled] = useState(true);
  const [waterLevel, setWaterLevel] = useState(95); // Initial water level for Overhead Tank 1
  const tankCapacity = 1000; // Static tank capacity

  useEffect(() => {
    // Set options for the navigation header
    navigation.setOptions({
      headerTitle: 'Tank Screen',
      headerRight: () => (
        <TouchableHighlight
          style={styles.refreshButton}
          underlayColor="#d3d3d3"
          onPress={handleRefresh}
        >
          <MaterialCommunityIcons name="refresh" size={28} color="white" />
        </TouchableHighlight>
      ),
    });
  }, [navigation]);

  const handleLeftButtonPress = () => {
    if (tankTitle === 'Overhead Tank 2') {
      setTankTitle('Overhead Tank 1');
      setWaterLevel(95);
      setLeftButtonEnabled(false);
      setRightButtonEnabled(true);
    } else if (tankTitle === 'Underground Sump') {
      setTankTitle('Overhead Tank 2');
      setWaterLevel(90);
      setRightButtonEnabled(true);
    }
  };

  const handleRightButtonPress = () => {
    if (tankTitle === 'Overhead Tank 1') {
      setTankTitle('Overhead Tank 2');
      setWaterLevel(90);
      setLeftButtonEnabled(true);
    } else if (tankTitle === 'Overhead Tank 2') {
      setTankTitle('Underground Sump');
      setWaterLevel(53);
      setRightButtonEnabled(false);
    }
  };

  const handleRefresh = () => {
    // Refresh logic, if needed
    // For now, let's just update the water level with a random value
    setWaterLevel(Math.max(Math.floor(Math.random() * 101), 0));
  };

  // Define an array of image paths based on water levels
  const waterLevelImages = [
    require('./images/Lvl0.png'),
    require('./images/lvl1.png'),
    require('./images/lvl2.png'),
    require('./images/lvl3.png'),
    require('./images/lvl4.png'),
    require('./images/lvl5.png'),
    require('./images/lvl6.png'),
    require('./images/lvl7.png'),
  ];

  // Determine the appropriate image based on the water level
  const getImageBasedOnWaterLevel = () => {
    if (waterLevel >= 0 && waterLevel <= 5) return waterLevelImages[0];
    if (waterLevel >= 6 && waterLevel <= 15) return waterLevelImages[1];
    if (waterLevel >= 16 && waterLevel <= 29) return waterLevelImages[2];
    if (waterLevel >= 30 && waterLevel <= 42) return waterLevelImages[3];
    if (waterLevel >= 43 && waterLevel <= 57) return waterLevelImages[4];
    if (waterLevel >= 58 && waterLevel <= 71) return waterLevelImages[5];
    if (waterLevel >= 72 && waterLevel <= 85) return waterLevelImages[6];
    if (waterLevel >= 86 && waterLevel <= 100) return waterLevelImages[7];
  };

  const handleMotorSettingsPress = () => {
    // Navigate to "MotorState.js" page
    navigation.navigate('MotorState'); // Make sure you have 'MotorState' as the name of the corresponding screen in your navigator
    
  };

  return (
    <View style={styles.container}>
      <View style={styles.boxContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>{tankTitle}</Text>
        </View>
        <Image source={getImageBasedOnWaterLevel()} style={styles.image} />

        <View style={styles.navigationButtons}>
          <TouchableOpacity
            style={[
              styles.navigationButton,
              { backgroundColor: isLeftButtonEnabled ? 'brown' : 'gray' },
            ]}
            onPress={handleLeftButtonPress}
            disabled={!isLeftButtonEnabled}
          >
            <Text style={styles.navigationButtonText}>{'<'}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.navigationButton,
              { backgroundColor: isRightButtonEnabled ? 'brown' : 'gray' },
              !isRightButtonEnabled && styles.rightNavigationButtonDisabled,
            ]}
            onPress={handleRightButtonPress}
            disabled={!isRightButtonEnabled}
          >
            <Text style={styles.navigationButtonText}>{'>'}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>{`Water Level: ${waterLevel}% (${((waterLevel / 100) * 300).toFixed(1)} cm)`}</Text>
          <Text style={styles.infoText}>{`Tank Capacity: ${tankCapacity} Liters`}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.changeMotorSettingsButton}
        onPress={handleMotorSettingsPress}
      >
        <Text style={styles.changeMotorSettingsButtonText}>Change Motor Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
  },
  boxContainer: {
    width: '85%',
    height: 510,
    backgroundColor: '#d3d3d3',
    borderRadius: 15,
    marginTop: 30,
  },
  titleContainer: {
    backgroundColor: '#36454F',
    height: 40,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    marginTop: 15,
    width: 300,
    height: 300,
    resizeMode: 'cover',
  },
  navigationButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  navigationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 15,
  },
  rightNavigationButtonDisabled: {
    backgroundColor: 'gray',
  },
  navigationButtonText: {
    color: 'white',
    fontSize: 20,
  },
  infoContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  infoText: {
    fontSize: 16,
    marginBottom: 10,
  },
  refreshButton: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 7,
  },
  refreshButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  changeMotorSettingsButton: {
    backgroundColor: 'brown', // Change the color as needed
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30, // Adjust the margin as needed
    width: '60%', // Adjust the width as needed
  },
  changeMotorSettingsButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default TankScreen;
