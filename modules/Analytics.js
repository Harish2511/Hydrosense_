import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {
  VictoryChart,
  VictoryLine,
  VictoryAxis,
  VictoryTheme,
  VictoryTooltip,
  VictoryBar,
  VictoryStack,
} from 'victory-native';
import { fetchData } from '../AwsFunctions';
import { useNavigation } from '@react-navigation/native';
import _debounce from 'lodash/debounce';

const Analytics = () => {
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    fetchDataFromDynamoDb();

    // Customize the header when the component mounts
    navigation.setOptions({
      headerTitle: 'Water Usage Analytics',
      headerStyle: {
        backgroundColor: 'darkslateblue',
      },
      headerTintColor: 'white',
      headerTitleAlign: 'center',
    });

    // Setup interval for real-time updates
    const interval = setInterval(fetchDataFromDynamoDb, 60000); // Refresh every 1 minute

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [navigation]);

  // Debounce the fetchDataFromDynamoDb function to avoid multiple rapid calls
  const debouncedFetchData = _debounce(fetchDataFromDynamoDb, 1000);

  const fetchDataFromDynamoDb = async () => {
    try {
      setIsLoading(true);
      const data = await fetchData('ultraAwsTable');
      console.log('Raw DynamoDB Response:', data);

      // Update state only if there is new data
      if (data.length > 0) {
        setTableData(data);
      }

      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    }
  };

  const lastRecords = tableData.slice(-20); // Displaying the last 20 records
  const lastRecord = lastRecords.length > 0 ? lastRecords[lastRecords.length - 1] : null;

  const labelData = lastRecords.map((item) => item.id || '');
  const distanceData = lastRecords.map((item) => item.Distance || 0);

  const averageData = calculateDailyAverage(tableData);
  const currentMonthAverage = calculateMonthlyAverage(tableData);

  const dailyCategoriesData = calculateDailyCategories(tableData);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={debouncedFetchData} style={styles.button}>
        <Text style={styles.buttonText}>Refresh Data</Text>
      </TouchableOpacity>

      {isLoading ? (
        <ActivityIndicator style={styles.loader} size="large" color="#3498db" />
      ) : (
        <View>
          {lastRecord && (
            <View style={styles.lastRecordContainer}>
              <Text style={styles.lastRecordText}>
                Last Record: ID {lastRecord.id}, Distance {lastRecord.Distance} gallons
              </Text>
            </View>
          )}

          <Text style={styles.sectionHeader}>Last 20 Records Line Chart:</Text>
          <VictoryChart
            theme={VictoryTheme.material}
            width={Dimensions.get('window').width - 16}
            height={220}
            domainPadding={{ x: 20 }}
          >
            <VictoryAxis
              tickValues={labelData.filter((_, index) => index % 2 === 0)}
              style={{ tickLabels: { fontSize: 8, angle: 45 } }}
            />
            <VictoryAxis dependentAxis />
            <VictoryLine
              data={distanceData.map((d, i) => ({ x: labelData[i], y: d }))}
              style={{
                data: { stroke: 'darkslateblue', strokeWidth: 2 },
                labels: { fontSize: 8, fill: 'darkslateblue' },
              }}
              labels={({ datum }) => `${datum.y} gallons`}
              labelComponent={<VictoryTooltip />}
            />
          </VictoryChart>

          <Text style={styles.sectionHeader}>Daily Water Usage Averages (Bar Chart):</Text>
          <VictoryChart
            theme={VictoryTheme.material}
            width={Dimensions.get('window').width - 16}
            height={220}
            domainPadding={{ x: 20 }}
          >
            <VictoryAxis
              tickValues={averageData.map((item) => item.day)}
              style={{ tickLabels: { fontSize: 8, angle: 45 } }}
            />
            <VictoryAxis dependentAxis />
            <VictoryBar
              data={averageData.map((item) => ({ x: item.day, y: item.average }))}
              style={{ data: { fill: 'darkslateblue' } }}
              labels={({ datum }) => `${datum.y.toFixed(2)} gallons`}
              labelComponent={<VictoryTooltip />}
            />
          </VictoryChart>

          <Text style={styles.sectionHeader}>Current Month Average: {currentMonthAverage.toFixed(2)} gallons</Text>

          <Text style={styles.sectionHeader}>Daily Water Usage Categories (Stacked Bar Chart):</Text>
          <VictoryChart
            theme={VictoryTheme.material}
            width={Dimensions.get('window').width - 16}
            height={220}
            domainPadding={{ x: 20 }}
          >
            <VictoryAxis
              tickValues={labelData.filter((_, index) => index % 2 === 0)}
              style={{ tickLabels: { fontSize: 8, angle: 45 } }}
            />
            <VictoryAxis dependentAxis />
            <VictoryStack colorScale="cool">
              {dailyCategoriesData.map((category) => (
                <VictoryBar
                  key={category.name}
                  data={category.data.map((item, i) => ({ x: labelData[i], y: item }))}
                />
              ))}
            </VictoryStack>
          </VictoryChart>
        </View>
      )}

      <StatusBar style="auto" />
    </View>
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

const calculateDailyCategories = (data) => {
  const categories = Array.from(new Set(data.map((entry) => entry.Category)));

  return categories.map((category) => {
    const categoryData = data.map((entry) => (entry.Category === category ? entry.Distance : 0));
    return { name: category, data: categoryData };
  });
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    padding: 16,
  },
  button: {
    backgroundColor: 'darkslateblue',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  loader: {
    marginTop: 10,
  },
  lastRecordContainer: {
    backgroundColor: 'lightgray',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  lastRecordText: {
    fontWeight: 'bold',
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    color: 'darkslateblue',
  },
  itemContainer: {
    borderWidth: 1,
    borderColor: '#bdc3c7',
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
});

export default Analytics;
