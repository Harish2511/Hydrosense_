import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TouchableHighlight, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { InfluxDB } from "@influxdata/influxdb-client";

const token = '1f-jAzMp7AsoDQz-SLTYRLv43JRCNuMW_T8qq3AIuuz5aWJH-ktSHlV7zJCKmfyIGcOjrSIJ07cL7kYUmmzhPQ==';
const org = 'abb6618f3fac8447';
const url = 'https://us-east-1-1.aws.cloud2.influxdata.com';
const bucket = 'Hydrosense';

const MotorState = () => {
  const [isOn, setIsOn] = useState(false);
  const [tableData, setTableData] = useState([
    { tankType: 'OHT 1', waterLevel: '95%' },
    { tankType: 'OHT 2', waterLevel: 'N/A' },
    { tankType: 'UGS', waterLevel: 'N/A' },
  ]);

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Motor State',
      headerRight: () => (
        <TouchableHighlight
          style={styles.refreshButton}
          underlayColor="#d3d3d3" // Change the color when pressed
          onPress={handleRefresh}
        >
          <MaterialCommunityIcons name="refresh" size={28} color="white" />
        </TouchableHighlight>
      ),
      headerStyle: {
        backgroundColor: 'brown',
      },
      headerTintColor: 'white',
      headerTitleAlign: 'left',
    });
  }, [navigation, tableData]);

  useEffect(() => {
    fetchData(); // Fetch initial data
  }, []);

  const fetchData = async () => {
    // Fetch data from InfluxDB for Overhead Tank 1
    const client = new InfluxDB({ url, token });
    const queryApi = client.getQueryApi(org);

    const query = `
      from(bucket: "${bucket}")
      |> range(start: -2d)
      |> filter(fn: (r) => r["_measurement"] == "WaterLevel" and r["_field"] == "distance")
      |> last()
    `;

    const res = await queryApi.collectRows(query);
    if (res.length > 0) {
      const latestWaterLevel = res[0]["_value"];
      const percentage = (latestWaterLevel / 300) * 100; // Assuming the max capacity is 300cm
      setTableData(prevData => {
        return prevData.map(item => {
          if (item.tankType === 'OHT 1') {
            return { ...item, waterLevel: `${Math.round(percentage)}%` };
          }
          return item;
        });
      });
    }
  };

  const handleRefresh = () => {
    fetchData(); // Refresh data
  };

  const handleOffButtonPress = () => {
    setIsOn(false);
  };

  const handleOnButtonPress = () => {
    setIsOn(true);
  };

  const handleChangeButtonPress = () => {
    // Handle CHANGE button press
    const motorStatus = isOn ? 'ON' : 'OFF';
    setTableData(prevTableData => {
      // Use the functional form of setTableData to ensure correct updates
      return prevTableData.map(row => ({ ...row }));
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.motorOptions}>
        <Text style={styles.motorOptionsText}>Motor Options</Text>
        <TouchableOpacity
          onPress={handleOffButtonPress}
          style={[
            styles.button,
            { backgroundColor: isOn ? 'lightgrey' : 'brown' },
          ]}
        >
          <Text style={{ color: isOn ? 'brown' : 'white', fontSize: 16 }}>OFF</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleOnButtonPress}
          style={[
            styles.button,
            { backgroundColor: isOn ? 'brown' : 'lightgrey' },
          ]}
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

      <View style={styles.liveTankDataTable}>
        <Text style={styles.liveTankDataTitle}>Live Tank Data</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableHeader}>Tank Type</Text>
            <Text style={styles.tableHeader}>Water Level</Text>
          </View>

          {tableData.map((row, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell}>{row.tankType}</Text>
              <Text style={styles.tableCell}>{row.waterLevel}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.tankTypeMapping}>
        <Text style={styles.mappingText}>OHT => Overhead Tank</Text>
        <Text style={styles.mappingText}>UGS => Underground Sump</Text>
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

  refreshButton: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 7,
  },

  motorOptions: {
    alignItems: 'center',
  },

  motorOptionsText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
  },
  button: {
    width: 180,
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
    width: 180,
    height: 40,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 20,
  },
  liveTankDataTable: {
    marginTop: 20,
  },
  liveTankDataTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'center',
  },
  table: {
    borderWidth: 1,
    borderColor: 'black',
    marginTop: 10,
    marginRight: 10,
    marginLeft: 10,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: 'black',
    padding: 5,
  },
  tableHeader: {
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  tableCell: {
    flex: 1,
    padding: 5,
    textAlign: 'center',
  },
  tankTypeMapping: {
    marginTop: 40,
    alignItems: 'center',
    backgroundColor: 'lightgrey',
    paddingVertical: 10,
    paddingHorizontal: 25,
    alignSelf: 'center',
    borderRadius: 10,
  },
  mappingText: {
    fontSize: 16,
    marginBottom: 5,
    color: 'black',
  },
});

export default MotorState;
