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
} from 'react-native';
import {
  VictoryChart,
  VictoryLine,
  VictoryAxis,
  VictoryTheme,
  VictoryTooltip,
  VictoryBar,
} from 'victory-native';
import { fetchData } from '../AwsFunctions';
import { useNavigation } from '@react-navigation/native';
import DateSelector from './DateSelector';

const tankHeight = 300; // Total height of the tank in centimeters

const Analytics = () => {
  const [tableData, setTableData] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [motorState, setMotorState] = useState('');
  const [category, setCategory] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const navigation = useNavigation();

  const fetchDataFromDynamoDb = async () => {
    try {
      setIsRefreshing(true);
      const data = await fetchData('SensorTableData');
      console.log('Raw DynamoDB Response:', data);

      // Update state only if there is new data
      if (data.length > 0) {
        setTableData(data);
        filterRecords(data, selectedDate);
        updateMotorStateAndCategory(selectedDate);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const filterRecords = (data, date) => {
    const formattedDate = date.toISOString().split('T')[0];
    const filteredData = data.filter((item) => item.Date === formattedDate);
    setFilteredRecords(filteredData.slice(-15)); // Displaying the last 30 records
  };
 
  const onDateChange = (newDate) => {
    setSelectedDate(newDate);
    filterRecords(tableData, newDate);
    updateMotorStateAndCategory(newDate);
  };

  const updateMotorStateAndCategory = (date) => {
    const formattedDate = date.toISOString().split('T')[0];
    const lastRecord = tableData.find((item) => item.Date === formattedDate);

    setMotorState(lastRecord?.motorstate || '');
    setCategory(lastRecord?.Category || '');
  };

  const labelData = filteredRecords.map((item) => item.Time || '');
  const distanceData = filteredRecords.map((item) => tankHeight - item.Distance || 0);

  const averageWaterUsage = calculateAverageWaterUsage(filteredRecords);
  const dailyUsageStatistics = calculateDailyUsageStatistics(filteredRecords);

  useEffect(() => {
    fetchDataFromDynamoDb();
  }, []);

  const toggleCalendarModal = () => {
    setShowCalendar(!showCalendar);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={fetchDataFromDynamoDb}
          colors={['#8B4513']} // Color of the refresh indicator
        />
      }
    >
      <TouchableOpacity onPress={fetchDataFromDynamoDb} style={styles.button}>
        <Text style={styles.buttonText}>Refresh Data</Text>
      </TouchableOpacity>

      {/* Date Selector */}
      <TouchableOpacity onPress={toggleCalendarModal} style={styles.datePickerButton}>
        <Text style={styles.datePickerButtonText}>
          Select a Date to View Water Level
        </Text>
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
          Motor State: {motorState || 'N/A'}
        </Text>
        <Text style={styles.insightsText}>
          Category: {category || 'N/A'}
        </Text>
      </View>

      <View>
        {/* Line Chart for Last 30 Records */}
        <VictoryChart
          theme={VictoryTheme.material}
          width={Dimensions.get('window').width - 16}
          height={220}
          domainPadding={{ x: 20 }}
        >
          <VictoryAxis
            tickValues={labelData.map((_, index) => index)}
            tickFormat={labelData}
            style={{ tickLabels: { fontSize: 8, angle: 45 } }}
          />
          <VictoryAxis dependentAxis />
          <VictoryLine
            data={distanceData.map((d, i) => ({ x: i, y: d }))}
            style={{
              data: { stroke: '#8B4513', strokeWidth: 2 },
              labels: { fontSize: 8, fill: '#8B4513' },
            }}
            labels={({ datum }) => `${datum.y} cm`}
            labelComponent={<VictoryTooltip />}
          />
        </VictoryChart>
      </View>

      {/* Additional Insights */}
      <Text style={styles.sectionHeader}>Additional Insights:</Text>

      {/* Bar Chart for Daily Usage Statistics */}
      <View style={styles.chartContainer}>
        <Text style={styles.subSectionHeader}>Daily Water Usage Statistics:</Text>
        <VictoryChart
          theme={VictoryTheme.material}
          width={Dimensions.get('window').width - 16}
          height={220}
          domainPadding={{ x: 20 }}
        >
          <VictoryAxis
            tickValues={dailyUsageStatistics.map((_, index) => index)}
            tickFormat={dailyUsageStatistics.map((item) => item.day)}
            style={{ tickLabels: { fontSize: 10, angle: 45 } }}
          />
          <VictoryAxis dependentAxis />
          <VictoryBar
            data={dailyUsageStatistics.map((item, index) => ({ x: index, y: item.usage }))}
            style={{ data: { fill: '#8B4513' } }}
            labels={({ datum }) => `${datum.y.toFixed(2)} cm`}
            labelComponent={<VictoryTooltip />}
          />
        </VictoryChart>
      </View>

      {/* Average Water Usage */}
      <View style={styles.insightsContainer}>
        <Text style={styles.insightsText}>
          Average Water Usage: {averageWaterUsage.toFixed(2)} cm
        </Text>
      </View>

      <StatusBar style="auto" />
    </ScrollView>
  );
};

const calculateAverageWaterUsage = (data) => {
  const totalUsage = data.reduce((acc, entry) => acc + (tankHeight - entry.Distance), 0);
  return totalUsage / data.length;
};

const calculateDailyUsageStatistics = (data) => {
  const dailyData = data.reduce((acc, entry) => {
    const dateTime = entry.Date + ' ' + entry.Time;
    if (!acc[dateTime]) {
      acc[dateTime] = { sum: 0, count: 0 };
    }
    acc[dateTime].sum += tankHeight - entry.Distance; // Adjusted for tank height
    acc[dateTime].count += 1;
    return acc;
  }, {});

  return Object.keys(dailyData).map((dateTime) => ({
    day: dateTime,
    usage: dailyData[dateTime].sum / dailyData[dateTime].count,
  }));
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
});

export default Analytics;
