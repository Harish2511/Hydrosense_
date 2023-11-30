import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MotorState = () => {
  const [isOn, setIsOn] = useState(false);
  const [tableData, setTableData] = useState([
    { tankType: 'OH T', waterLevel: '', motorStatus: '' },
    { tankType: 'OH T', waterLevel: '', motorStatus: '' },
    { tankType: 'UG S', waterLevel: '', motorStatus: '' },
  ]);

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
    // Handle CHANGE button press
    const motorStatus = isOn ? 'ON' : 'OFF';
    const updatedTableData = tableData.map((row) => ({ ...row, motorStatus }));
    setTableData(updatedTableData);
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

      {/* Live Tank Data Table */}
      <View style={styles.liveTankDataTable}>
        <Text style={styles.liveTankDataTitle}>Live Tank Data</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableHeader}>Tank Type</Text>
            <Text style={styles.tableHeader}>Water Level</Text>
            <Text style={styles.tableHeader}>Motor Status</Text>
          </View>

          {/* Rows */}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'top',
    padding: 16,
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
    width: 180, // Same width for both buttons
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
    width: 180, // Same width for both buttons
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
});

export default MotorState;