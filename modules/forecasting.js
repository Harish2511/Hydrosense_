import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableHighlight,
} from 'react-native';
import { fetchData } from '../AwsFunctions';
import DateSelector from './DateSelector';
import { VictoryLine, VictoryChart, VictoryTheme, VictoryLegend, VictoryAxis } from 'victory-native';
import Arima from './Arima';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Forecasting = ({ navigation }) => {
  const [tableData, setTableData] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [forecastResult, setForecastResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const tankHeight = 300;

  const fetchDataFromDynamoDb = async () => {
    try {
      setIsRefreshing(true);
      const data = await fetchData('SensorTableData');
      console.log('Raw DynamoDB Response:', data);

      if (data.length > 0) {
        const filteredData = data.filter((item) => item.Distance !== 0);
        setTableData(filteredData);

        // Perform ARIMA forecast on the selected date
        const arimaModel = new Arima(filteredData.map((item) => tankHeight - item.Distance));
        const arimaResult = arimaModel.predict(10); // Adjust the number of predictions as needed
        setForecastResult(arimaResult);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsRefreshing(false);
      setIsLoading(false);
    }
  };

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const handleRefresh = () => {
    fetchDataFromDynamoDb();
  };

  useEffect(() => {
    fetchDataFromDynamoDb(); // Fetch data initially

    // Set up navigation options
    navigation.setOptions({
      headerTitle: null,
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
  }, [navigation, selectedDate, showDatePicker]);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} colors={['#8B4513']} />
      }
    >

      {/* Date Picker */}
      <TouchableOpacity onPress={toggleDatePicker} style={[styles.button, { width: 150, alignSelf: 'center' }]}>
        <Text style={styles.buttonText}>Select Date</Text>
      </TouchableOpacity>

      {/* Show DateSelector when showDatePicker is true */}
      {showDatePicker && (
        <DateSelector
          onDateChange={(date) => {
            setSelectedDate(date);
            toggleDatePicker(); // Close DateSelector after selecting a date
          }}
        />
      )}

      {/* Display ARIMA Forecast Result */}
      {forecastResult !== null && (
        <View>
          <View style={styles.chartContainer}>
          <VictoryChart theme={VictoryTheme.grayscale}>
          {/* Displaying the last 15 records */}
          <VictoryLine
            data={tableData.slice(-10).map((item, index) => ({ x: item.Time, y: tankHeight - item.Distance }))}
            style={{
              data: { stroke: 'blue' },
            }}
          />
          {/* Displaying the predicted data for the next 10 steps */}
          <VictoryLine
            data={forecastResult.map((value, index) => ({
              x: tableData[tableData.length - 1].Time + (index + 1),
              y: value,
            }))}
            style={{
              data: { stroke: 'red' },
            }}
          />
          <VictoryAxis
            label="Time"
            style={{
              tickLabels: {
                fontSize: 5,
                angle: 45, // Rotate the tick labels diagonally in the opposite direction
              },
            }}
          />
          <VictoryAxis
            dependentAxis
            label="Water Level"
            style={{
              tickLabels: { fontSize: 8, padding: 5 },
            }}
          />
      </VictoryChart>
          </View>
          <View style={styles.legendContainer}>
            <VictoryLegend
              orientation="horizontal"
              gutter={20}
              style={{ border: { stroke: 'black' }, title: { fontSize: 10 } }}
              colorScale={['blue', 'red']}
              data={[
                { name: 'Actual Data' },
                { name: 'Predicted Data' },
              ]}
            />
          </View>
          <View style={styles.additionalTextContainer}>
            <Text style={styles.additionalText}>
              This model provides a comprehensive view of water level data, presenting both historical records and ARIMA-based predictions. Enabling you to explore trends, refresh real-time data, and select specific dates to gain precise insights into tank levels, facilitating informed decision-making.
            </Text>
          </View>
        </View>
      )}

      <StatusBar style="auto" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  button: {
    backgroundColor: 'black',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  datePicker: {
    width: 200,
    marginVertical: 10,
  },
  chartContainer: {
    marginBottom: 20,
  },
  legendContainer: {
    alignItems: 'center',
    marginLeft: 120,
  },
  refreshButton: {
    marginRight: 16,
  },

  additionalTextContainer: {
    position: 'absolute',
    backgroundColor: 'lightgrey',
    borderRadius: 10,
    padding: 10,
    top: '50%',
    left: 16,
    right: 16,
    marginTop: 70, // Adjust this value to fine-tune the vertical centering
  },
  
  additionalText: {
    color: 'black',
    textAlign: 'justify', // Add this line to set the text alignment to justify
  },
  
});

export default Forecasting;
