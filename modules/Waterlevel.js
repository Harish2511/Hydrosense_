import React, { useState, useEffect } from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { InfluxDB } from "@influxdata/influxdb-client";

const Waterlevel = () => {
  const navigation = useNavigation();
  const [tank1Data, setTank1Data] = useState({
    waterLevel: 0,
    timestamp: new Date(),
  });

  useEffect(() => {
    fetchData(); // Fetch initial data
    navigation.setOptions({
      headerTitle: 'Water Level',
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

  const fetchData = async () => {
    // Fetch data from InfluxDB for Overhead Tank 1
    const token = '1f-jAzMp7AsoDQz-SLTYRLv43JRCNuMW_T8qq3AIuuz5aWJH-ktSHlV7zJCKmfyIGcOjrSIJ07cL7kYUmmzhPQ==';
    const org = 'abb6618f3fac8447';
    const url = 'https://us-east-1-1.aws.cloud2.influxdata.com';
    const bucket = 'Hydrosense';

    const client = new InfluxDB({ url, token });
    const queryApi = client.getQueryApi(org);

    const query = `from(bucket: "${bucket}")
      |> range(start: -2d)
      |> filter(fn: (r) => r["_measurement"] == "WaterLevel" and r["_field"] == "distance")
      |> last()`;

    const res = await queryApi.collectRows(query);
    if (res.length > 0) {
      const latestWaterLevel = res[0]["_value"];
      setTank1Data({
        waterLevel: latestWaterLevel,
        timestamp: new Date(),
      });
    }
  };

  const handleRefresh = () => {
    fetchData(); // Refresh data
  };

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

  const renderTank = (tankData, title, backgroundColor) => {
    const levelCategory = tankData.waterLevel >= 0 ? getLevelCategory(tankData.waterLevel) : 'N/A';
    const riskLevel = levelCategory !== 'N/A' ? getRiskLevel(levelCategory) : 'N/A';
    const waterLevelText = tankData.waterLevel >= 0 ? `${tankData.waterLevel} cm` : 'N/A';
    const timestampText = tankData.timestamp instanceof Date ? `Updated on ${tankData.timestamp.toString()}` : '';
  
    return (
      <View style={[styles.tankContainer, { backgroundColor }]}>
        <View style={styles.tankBox}>
          <Text style={styles.heading}>{title}</Text>
          <View style={styles.divider}></View>
          <Text style={styles.tankInfo}>{`Water Level: ${waterLevelText}`}</Text>
          <Text style={styles.tankInfo}>Level Category: {levelCategory}</Text>
          <Text style={styles.tankInfo}>Risk Level: {riskLevel}</Text>
          <Text style={[styles.tankInfo, styles.timestamp]}>{timestampText}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderTank(tank1Data, 'Overhead Tank 1', 'lightgrey')}
      {renderTank({ waterLevel: -1, timestamp: new Date() }, 'Overhead Tank 2', 'lightgrey')}
      {renderTank({ waterLevel: -1, timestamp: new Date() }, 'Underground Sump', 'lightblue')}
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
    marginBottom: 14,
    borderRadius: 8,
  },
  tankBox: {
    padding: 16,
    borderRadius: 10,
    marginBottom: 5,
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
  tankInfo: {
    marginBottom: 5,
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
