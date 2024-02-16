import React, { useState, useEffect } from "react";
import { InfluxDB } from "@influxdata/influxdb-client";
import { StyleSheet, View, Text, ScrollView, Button } from "react-native";
import DatePicker from 'react-native-datepicker';
import { VictoryChart, VictoryLine, VictoryAxis } from "victory-native";
import { TextDecoder, TextEncoder } from 'text-encoding';

if (!global.TextDecoder) {
  global.TextDecoder = TextDecoder;
}

// Polyfill TextEncoder if it doesn't exist
if (!global.TextEncoder) {
  global.TextEncoder = TextEncoder;
}

const token = '1f-jAzMp7AsoDQz-SLTYRLv43JRCNuMW_T8qq3AIuuz5aWJH-ktSHlV7zJCKmfyIGcOjrSIJ07cL7kYUmmzhPQ==';
const org = 'abb6618f3fac8447';
const url = 'https://us-east-1-1.aws.cloud2.influxdata.com';
const bucket = 'Hydrosense';

const InfluxChart = ({ data }) => {
  return (
    <View>
      <VictoryChart height={300} width={350}>
        <VictoryLine
          style={{ data: { stroke: '#34d5eb', strokeWidth: 1 } }}
          data={data}
          x="name"
          y="distance"
        />
        <VictoryAxis
          tickFormat={(t) => {
            const date = new Date(t);
            return `${date.getHours()}:${date.getMinutes()}`;
          }}
        />
      </VictoryChart>
    </View>
  );
};

const App = () => {
  const [latestRecords, setLatestRecords] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [analytics, setAnalytics] = useState({});

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000); // Update data every 5 seconds
    return () => clearInterval(interval);
  }, [selectedDate]);

  const fetchData = async () => {
    const client = new InfluxDB({ url, token });
    const queryApi = client.getQueryApi(org);

    const startDate = selectedDate.toISOString().split('T')[0];
    const query = `from(bucket: "${bucket}")
      |> range(start: ${startDate}T00:00:00Z, stop: ${startDate}T23:59:59Z)
      |> filter(fn: (r) => r["_measurement"] == "WaterLevel")
      |> filter(fn: (r) => r["_field"] == "distance")
      |> last(n: 2)`;

    const res = await queryApi.collectRows(query);
    setLatestRecords(res);
    calculateAnalytics(res);
  };

  const calculateAnalytics = (data) => {
    const waterLevels = data.map(item => item["_value"]);
    const maxWaterLevel = Math.max(...waterLevels);
    const minWaterLevel = Math.min(...waterLevels);

    setAnalytics({
      maxWaterLevel,
      minWaterLevel,
    });
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Water Level Analytics</Text>
      </View>
      <View style={styles.datePickerContainer}>
        <DatePicker
          style={{width: 200}}
          date={selectedDate}
          mode="date"
          format="YYYY-MM-DD"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          onDateChange={handleDateChange}
        />
      </View>
      <ScrollView>
        <View style={styles.content}>
          <Text style={styles.subHeaderText}>Latest Records</Text>
          <ScrollView horizontal>
            <View style={styles.latestRecords}>
              {latestRecords.map((record, index) => (
                <Text key={index} style={styles.recordText}>
                  {new Date(record["_time"]).toLocaleString()}: {record["_value"]}m
                </Text>
              ))}
            </View>
          </ScrollView>
          <View style={styles.chartContainer}>
            <InfluxChart data={latestRecords.map(item => ({ distance: item["_value"], name: new Date(item["_time"]) }))} />
          </View>
          <Text style={styles.subHeaderText}>Daily Analytics</Text>
          <Text>Date: {selectedDate.toLocaleDateString()}</Text>
          <Text>Maximum Water Level: {analytics.maxWaterLevel}m</Text>
          <Text>Minimum Water Level: {analytics.minWaterLevel}m</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    backgroundColor: '#34d5eb',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    padding: 20,
  },
  subHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  latestRecords: {
    flexDirection: 'row',
  },
  recordText: {
    marginRight: 10,
  },
  chartContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  datePickerContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
});

export default App;
