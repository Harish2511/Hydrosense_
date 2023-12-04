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
} from 'react-native';
import {
  VictoryChart,
  VictoryLine,
  VictoryAxis,
  VictoryTheme,
  VictoryTooltip,
  VictoryBar,
  VictoryStack,
  VictoryPie,
} from 'victory-native';
import { fetchData } from '../AwsFunctions';
import { useNavigation } from '@react-navigation/native';

const Analytics = () => {
  const [tableData, setTableData] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const navigation = useNavigation();

  const fetchDataFromDynamoDb = async () => {
    try {
      setIsRefreshing(true);
      const data = await fetchData('ultraAwsTable');
      console.log('Raw DynamoDB Response:', data);

      // Update state only if there is new data
      if (data.length > 0) {
        setTableData(data);
      }

      setIsRefreshing(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsRefreshing(false);
    }
  };

  const lastRecords = tableData.slice(-20); // Displaying the last 20 records
  const lastRecord = lastRecords.length > 0 ? lastRecords[lastRecords.length - 1] : null;

  const labelData = lastRecords.map((item) => item.id || '');
  const distanceData = lastRecords.map((item) => item.Distance || 0);

  const averageData = calculateDailyAverage(tableData);
  const currentMonthAverage = calculateMonthlyAverage(tableData);

  useEffect(() => {
    fetchDataFromDynamoDb();
  }, []);

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

      <View>
        {lastRecord && (
          <View style={styles.lastRecordContainer}>
            <Text style={styles.lastRecordText}>
              Last Record: ID {lastRecord.id}, Distance {lastRecord.Distance} gallons
            </Text>
          </View>
        )}

        {/* Line Chart */}
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
            labels={({ datum }) => `${datum.y} gallons`}
            labelComponent={<VictoryTooltip />}
          />
        </VictoryChart>

        {/* Bar Chart */}
        <View style={styles.chartContainer}>
          <Text style={styles.sectionHeader}>Daily Water Usage Averages:</Text>
          <VictoryChart
            theme={VictoryTheme.material}
            width={Dimensions.get('window').width - 16}
            height={220}
            domainPadding={{ x: 20 }}
          >
            <VictoryAxis
              tickValues={averageData.map((_, index) => index)}
              tickFormat={averageData.map((item) => item.day)}
              style={{ tickLabels: { fontSize: 10, angle: 45 } }}
            />
            <VictoryAxis dependentAxis />
            <VictoryBar
              data={averageData.map((item, index) => ({ x: index, y: item.average }))}
              style={{ data: { fill: '#8B4513' } }}
              labels={({ datum }) => `${datum.y.toFixed(2)}\ngallons`}
              labelComponent={<VictoryTooltip />}
            />
          </VictoryChart>
        </View>

        

        {/* Pie Chart */}
        <View style={styles.chartContainer}>
          <Text style={styles.sectionHeader}>Monthly Water Usage Distribution:</Text>
          <VictoryPie
            data={averageData.map((item) => ({ x: item.day, y: item.average }))}
            colorScale={['#8B4513', '#CD853F', '#D2691E', '#A0522D', '#DEB887']}
            labels={({ datum }) => `${datum.x}\n${(datum.y / currentMonthAverage * 100).toFixed(2)}%`}
            labelRadius={({ innerRadius }) => innerRadius + 50}
            labelComponent={<VictoryTooltip />}
          />
        </View>

        <Text style={styles.sectionHeader}>Current Month Average: {currentMonthAverage.toFixed(2)} gallons</Text>
      </View>

      <StatusBar style="auto" />
    </ScrollView>
  );
};

const calculateDailyAverage = (data) => {
  const dailyData = data.reduce((acc, entry) => {
    const date = entry.id; // Assuming 'id' is a valid date string
    if (!acc[date]) {
      acc[date] = { sum: 0, count: 0 };
    }
    acc[date].sum += entry.Distance;
    acc[date].count += 1;
    return acc;
  }, {});

  return Object.keys(dailyData).map((date) => ({
    day: date,
    average: dailyData[date].sum / dailyData[date].count,
  }));
};

const calculateMonthlyAverage = (data) => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; // Months are zero-based in JavaScript
  const monthlyData = data.reduce((acc, entry) => {
    const entryDate = new Date(entry.id);
    const entryMonth = entryDate.getMonth() + 1;
    if (entryMonth === currentMonth) {
      acc.sum += entry.Distance;
      acc.count += 1;
    }
    return acc;
  }, { sum: 0, count: 0 });

  return monthlyData.sum / monthlyData.count;
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
  lastRecordContainer: {
    backgroundColor: '#D2B48C',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  lastRecordText: {
    fontWeight: 'bold',
  },
  chartContainer: {
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    color: '#8B4513',
  },
});

export default Analytics;
