import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  Dimensions,
  ScrollView,
  RefreshControl,
  Modal,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { fetchData } from '../AwsFunctions';
import { useNavigation } from '@react-navigation/native';
import DateSelector from './DateSelector';
import moment from 'moment';
import * as tf from '@tensorflow/tfjs';

const tankHeight = 300;

const Forecasting = () => {
  const [tableData, setTableData] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [inputTime, setInputTime] = useState('');
  const [expectedWaterLevel, setExpectedWaterLevel] = useState(null);
  const [dailyAnalysis, setDailyAnalysis] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  const toggleCalendarModal = () => {
    setShowCalendar(!showCalendar);
  };

  const fetchDataFromDynamoDb = async () => {
    try {
      setIsRefreshing(true);
      const data = await fetchData('SensorTableData');
      console.log('Raw DynamoDB Response:', data);

      if (data.length > 0) {
        const filteredData = data.filter((item) => item.Distance !== 0);
        setTableData(filteredData);
        // Perform time series analysis on the selected date using LSTM
        const lstmResult = await performLSTM(filteredData, selectedDate);
        setDailyAnalysis(lstmResult);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsRefreshing(false);
      setIsLoading(false);
    }
  };

  const onDateChange = async (newDate) => {
    setSelectedDate(newDate);
    // Perform time series analysis for the selected date using LSTM
    const lstmResult = await performLSTM(tableData, newDate);
    setDailyAnalysis(lstmResult);
  };

  const onInputTimeChange = (time) => {
    setInputTime(time);
    setExpectedWaterLevel(null);
  };

  const calculateExpectedWaterLevel = async () => {
    if (inputTime === '') {
      alert('Please enter a valid time slot');
      return;
    }

    const time = parseFloat(inputTime);
    if (isNaN(time) || time < 0 || time > 24) {
      alert('Please enter a valid time between 0 and 24');
      return;
    }

    // Perform time series analysis for the selected date using LSTM
    const lstmResult = await performLSTM(tableData, selectedDate);
    const selectedTimeData = lstmResult.find((item) => item.time === time);

    if (selectedTimeData) {
      setExpectedWaterLevel(selectedTimeData.value);
    } else {
      alert('No data available for the selected time slot');
    }
  };

  const performLSTM = async (data, date) => {
    try {
      const selectedDateData = data.filter((item) => item.Date === date.toISOString().split('T')[0]);
      const distanceData = selectedDateData.map((item) => item.Distance);
  
      // Check if there are enough data points for training
      console.log(distanceData)
      if (distanceData.length < 3) {
        console.warn('Not enough data for LSTM analysis');
        //return [];
      }
  
      // Convert data to tensors
      const inputTensor = tf.tensor2d(distanceData.slice(0, -1).map((value) => [value]));
      const outputTensor = tf.tensor2d(distanceData.slice(1).map((value) => [value]));
  
      // Create and train a simple LSTM model
      const model = tf.sequential();
      model.add(tf.layers.lstm({ units: 50, inputShape: [1, 1], returnSequences: true }));
      model.add(tf.layers.dense({ units: 1 }));
  
      model.compile({ loss: 'meanSquaredError', optimizer: 'adam' });
  
      await model.fit(inputTensor, outputTensor, { epochs: 50 });
  
      // Predict future values
      const futureData = distanceData.slice(-1);
      const predictions = [];
  
      for (let i = 0; i < 10; i++) {
        const nextPrediction = model.predict(tf.tensor3d([futureData.slice(-1)]));
        predictions.push(nextPrediction.dataSync()[0]);
        futureData.push(nextPrediction.dataSync()[0]);
        futureData.shift();
      }
  
      // Invert scaling and return the forecasted values
      const maxDistance = Math.max(...distanceData);
      const forecastedValues = predictions.map((value, i) => ({
        time: Date.now() + i * 3600 * 1000,
        value: maxDistance - value,
      }));
  
      return forecastedValues;
    } catch (error) {
      console.error('Error in performLSTM:', error);
      return [];
    }
  };
  

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={fetchDataFromDynamoDb} colors={['#8B4513']} />
      }
    >
      <TouchableOpacity onPress={fetchDataFromDynamoDb} style={styles.button}>
        <Text style={styles.buttonText}>Refresh Data</Text>
      </TouchableOpacity>

      {/* Date Selector */}
      <TouchableOpacity onPress={toggleCalendarModal} style={styles.datePickerButton}>
        <Text style={styles.datePickerButtonText}>Select a Date to View Water Level</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showCalendar}
        onRequestClose={toggleCalendarModal}
      >
        <View style={styles.modalContainer}>
          <DateSelector onDateChange={onDateChange} />
          <TouchableOpacity onPress={toggleCalendarModal} style={styles.modalCloseButton}>
            <Text style={styles.modalCloseButtonText}>Close Calendar</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <View style={styles.insightsContainer}>
        <Text style={styles.insightsText}>
          Motor State: {tableData.length > 0 ? tableData[0]?.motorstate || 'N/A' : 'N/A'}
        </Text>
        <Text style={styles.insightsText}>
          Category: {tableData.length > 0 ? tableData[0]?.Category || 'N/A' : 'N/A'}
        </Text>
      </View>

      <View>
        {/* Line Chart for Actual and Predicted Data */}
        {isLoading ? (
          <ActivityIndicator size="large" color="#8B4513" />
        ) : (
          tableData.length > 0 &&
          dailyAnalysis.length > 0 && (
            <View style={styles.chartContainer}>
              <Text style={styles.subSectionHeader}>Actual vs Predicted Usage:</Text>
              <LineChart
                data={{
                  labels: tableData.map((item) => moment(item.Time).format('LT')),
                  datasets: [
                    {
                      data: tableData.map((item) => tankHeight - item.Distance),
                      color: (opacity = 1) => `rgba(139, 69, 19, ${opacity})`, // Actual usage color
                    },
                    {
                      data: dailyAnalysis.map((item) => item.value),
                      color: (opacity = 1) => `rgba(255, 99, 71, ${opacity})`, // Predicted usage color
                    },
                  ],
                }}
                width={Dimensions.get('window').width - 16}
                height={220}
                chartConfig={{
                  backgroundGradientFrom: '#FFFFFF',
                  backgroundGradientTo: '#FFFFFF',
                  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                }}
              />
            </View>
          )
        )}
      </View>

      {/* Input for Expected Water Level */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter Time (0-24)"
          keyboardType="numeric"
          value={inputTime}
          onChangeText={onInputTimeChange}
        />
        <TouchableOpacity onPress={calculateExpectedWaterLevel} style={styles.button}>
          <Text style={styles.buttonText}>Calculate Expected Water Level</Text>
        </TouchableOpacity>
      </View>

      {/* Display Expected Water Level */}
      {expectedWaterLevel !== null && (
        <View style={styles.insightsContainer}>
          <Text style={styles.insightsText}>Expected Water Level: {expectedWaterLevel.toFixed(2)} cm</Text>
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
    backgroundColor: '#8B4513',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  datePickerButton: {
    backgroundColor: '#8B4513',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  datePickerButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalCloseButton: {
    backgroundColor: '#8B4513',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  modalCloseButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  insightsContainer: {
    backgroundColor: '#D2B48C',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  insightsText: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#8B4513',
  },
  subSectionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#8B4513',
  },
  chartContainer: {
    marginBottom: 20,
  },
  inputContainer: {
    marginVertical: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

export default Forecasting;
