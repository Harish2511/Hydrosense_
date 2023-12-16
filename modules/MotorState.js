import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TouchableHighlight, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const MotorState = () => {
  const [isOn, setIsOn] = useState(false);
  const [tableData, setTableData] = useState([
    { tankType: 'OH T', waterLevel: '78%', motorStatus: '' },
    { tankType: 'OH T', waterLevel: '65%', motorStatus: '' },
    { tankType: 'UG S', waterLevel: '89%', motorStatus: '' },
  ]);

  const navigation = useNavigation();

  const handleRefresh = () => {
    const newData = [
      { tankType: 'OH T', waterLevel: '80%', motorStatus: 'OFF' },
      { tankType: 'OH T', waterLevel: '75%', motorStatus: 'OFF' },
      { tankType: 'UG S', waterLevel: '92%', motorStatus: 'ON' },
    ];

    const isDataChanged = JSON.stringify(newData) !== JSON.stringify(tableData);

    if (isDataChanged) {
      setTableData(newData);
      setIsOn(false);
    }
  };

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
      return prevTableData.map(row => ({ ...row, motorStatus }));
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
            <Text style={styles.tableHeader}>Motor Status</Text>
          </View>

          {tableData.map((row, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell}>{row.tankType}</Text>
              <Text style={styles.tableCell}>{row.waterLevel}</Text>
              {row.tankType === 'UG S' ? (
                <Text style={styles.tableCellSubtitle}>-</Text>
              ) : (
                <Text style={styles.tableCell}>{row.motorStatus}</Text>
              )}
            </View>
          ))}
        </View>
      </View>

      <View style={styles.tankTypeMapping}>
        <Text style={styles.mappingText}>OH T => Overhead Tank</Text>
        <Text style={styles.mappingText}>UG S => Underground Sump</Text>
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
  tableCellSubtitle: {
    flex: 1,
    padding: 5,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
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
