import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StatusBar, StyleSheet } from 'react-native';
import { fetchData } from '../AwsFunctions';

const Analytics = () => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetchDataFromDynamoDb();    
  }, []); // Fetch data on component mount

  const fetchDataFromDynamoDb = async () => {
    try {
      const data = await fetchData('ultraAwsTable');
      console.log('Raw DynamoDB Response:', data); // Log the raw response
      setTableData(data.slice(0, 3));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  console.log('Table Data:', tableData); // Log table data

  return (
    <View style={styles.container}>
      <Text>Open up Analytics.js to start working on your analytics!</Text>

      <TouchableOpacity onPress={() => fetchDataFromDynamoDb()} style={styles.button}>
        <Text style={styles.buttonText}>Fetch Data</Text>
      </TouchableOpacity>

      <Text>Table Data:</Text>
      {tableData.map((item, index) => {
        console.log('Item:', item); // Log the item
        return (
          <View key={index} style={styles.itemContainer}>
            <Text>ID: {item.id}</Text>
            <Text>Distance: {item.Distance}</Text>
            <Text>Category: {item.Category}</Text>
          </View>
        );
      })}

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
    backgroundColor: 'blue',
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
