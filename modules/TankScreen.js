import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TouchableHighlight } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { InfluxDB } from "@influxdata/influxdb-client";

const token = '1f-jAzMp7AsoDQz-SLTYRLv43JRCNuMW_T8qq3AIuuz5aWJH-ktSHlV7zJCKmfyIGcOjrSIJ07cL7kYUmmzhPQ==';
const org = 'abb6618f3fac8447';
const url = 'https://us-east-1-1.aws.cloud2.influxdata.com';
const bucket = 'Hydrosense';

const TankScreen = () => {
  const navigation = useNavigation();
  const [tankTitle, setTankTitle] = useState('Overhead Tank 1');
  const [isLeftButtonEnabled, setLeftButtonEnabled] = useState(false);
  const [isRightButtonEnabled, setRightButtonEnabled] = useState(true);
  const [waterLevelCm, setWaterLevelCm] = useState(0); // Initial water level in centimeters
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

    fetchData(); // Fetch initial data
  }, [navigation]);

  const fetchData = async () => {
    // Fetch data from InfluxDB for Overhead Tank 1
    const client = new InfluxDB({ url, token });
    const queryApi = client.getQueryApi(org);

    const query = `from(bucket: "${bucket}")
    |> range(start: -2d)
    |> filter(fn: (r) => r["_measurement"] == "WaterLevel")
    |> keep(columns: ["_time", "_value"])
    |> sort(columns:["_time"])`;
    ;

    const res = await queryApi.collectRows(query);
    if (res.length > 0) {
      const latestWaterLevel = res[res.length-1]["_value"];
      console.log(`Latest Water Level is ${latestWaterLevel}`);
      const date = new Date(res[res.length-1]["_time"]);

const options = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  hour12: true
};

const formattedTime = date.toLocaleString('en-US', options);
console.log(`Latest Water Level TIME is ${formattedTime}`);
     
      setWaterLevelCm(latestWaterLevel);
      updateButtonStatus(latestWaterLevel);
    }
  };

  const updateButtonStatus = (latestWaterLevel) => {
    // Update button status based on latest water level
    if (tankTitle === 'Overhead Tank 1') {
      if (latestWaterLevel >= 95) {
        setLeftButtonEnabled(false);
      } else {
        setLeftButtonEnabled(true);
      }
    }

    if (latestWaterLevel <= 5) {
      setRightButtonEnabled(false);
    } else {
      setRightButtonEnabled(true);
    }
  };

  const handleLeftButtonPress = () => {
    if (tankTitle === 'Overhead Tank 2') {
      setTankTitle('Overhead Tank 1');
      setLeftButtonEnabled(false);
      fetchData(); // Fetch data for Overhead Tank 1
    } else if (tankTitle === 'Underground Sump') {
      setTankTitle('Overhead Tank 2');
      setWaterLevelCm(90);
      setRightButtonEnabled(true);
    }
  };

  const handleRightButtonPress = () => {
    if (tankTitle === 'Overhead Tank 1') {
      setTankTitle('Overhead Tank 2');
      setWaterLevelCm(90);
      setLeftButtonEnabled(true);
    } else if (tankTitle === 'Overhead Tank 2') {
      setTankTitle('Underground Sump');
      setWaterLevelCm(53);
      setRightButtonEnabled(false);
    }
  };

  const handleRefresh = () => {
    fetchData(); // Refresh data
  };

  // Determine the appropriate image based on the water level
  const getTankImage = () => {
    if (waterLevelCm >= 290) return require('./images/lvl7.png');
    if (waterLevelCm >= 257.1) return require('./images/lvl6.png');
    if (waterLevelCm >= 214.25) return require('./images/lvl5.png');
    if (waterLevelCm >= 171.4) return require('./images/lvl4.png');
    if (waterLevelCm >= 128.55) return require('./images/lvl3.png');
    if (waterLevelCm >= 85.71) return require('./images/lvl2.png');
    if (waterLevelCm >= 42.85) return require('./images/lvl1.png');
    return require('./images/Lvl0.png');
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
        <Image source={getTankImage()} style={styles.image} />

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
          <Text style={styles.infoText}>{`Water Level: ${waterLevelCm} cm (${Math.round((waterLevelCm / 300) * 100)}%)`}</Text>
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
