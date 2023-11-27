import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StatusBar, StyleSheet, Dimensions } from 'react-native';
import { fetchData } from '../AwsFunctions';
import { VictoryChart, VictoryLine, VictoryAxis } from 'victory-native';
import { useNavigation } from '@react-navigation/native';

const Analytics = () => {
  const [tableData, setTableData] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchDataFromDynamoDb();

    // Customize the header when the component mounts
    navigation.setOptions({
      headerTitle: 'Analytics',
      headerStyle: {
        backgroundColor: 'brown', // Background color
      },
      headerTintColor: 'white', // Text color
      headerTitleAlign: 'left', // Align title to the left
    });
  }, [navigation]);

  const fetchDataFromDynamoDb = async () => {
    try {
      const data = await fetchData('ultraAwsTable');
      console.log('Raw DynamoDB Response:', data); // Log the raw response

      // Assuming 'Distance' is the y-axis data
      setTableData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  console.log('Table Data:', tableData); // Log table data

  const lastThreeRecords = tableData.slice(-3);
  const labelData = tableData.slice(-10).map((item) => item.id || ''); // Assuming 'id' is the x-axis label
  const distanceData = tableData.slice(-10).map((item) => item.Distance || 0);

  return (
    <View style={styles.container}>

      <TouchableOpacity onPress={() => fetchDataFromDynamoDb()} style={styles.button}>
        <Text style={styles.buttonText}>Fetch Data</Text>
      </TouchableOpacity>

      <Text>Table Data:</Text>
      {lastThreeRecords.map((item, index) => {
        console.log('Item:', item); // Log the item
        return (
          <View key={index} style={styles.itemContainer}>
            <Text>ID: {item.id}</Text>
            <Text>Distance: {item.Distance}</Text>
            <Text>Category: {item.Category}</Text>
          </View>
        );
      })}

      <VictoryChart width={Dimensions.get('window').width - 16} height={220} domainPadding={{ x: 20 }}>
        <VictoryAxis tickValues={labelData} />
        <VictoryAxis dependentAxis />
        <VictoryLine data={distanceData.map((d, i) => ({ x: labelData[i], y: d }))} />
      </VictoryChart>

      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'brown',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  itemContainer: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
});

export default Analytics;
