import React, { useState, useEffect } from "react";
import { InfluxDB } from "@influxdata/influxdb-client";
import { StyleSheet, View, Text, ScrollView } from "react-native";
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

const AlertPage = () => {
  const [latestData, setLatestData] = useState({});
  const [lastRecordTime, setLastRecordTime] = useState(null);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000); // Update data every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    const client = new InfluxDB({ url, token });
    const queryApi = client.getQueryApi(org);

    const query = `
      from(bucket: "${bucket}")
      |> range(start: -1d)
      |> filter(fn: (r) => r["_measurement"] == "WaterLevel")
      |> last()
    `;

    try {
      const result = await queryApi.collectRows(query);
      console.log('Result', result);
      if (result.length > 0) {
        setLatestData(result[0]); // Assuming only one result is returned
        setLastRecordTime(result[0]["_time"]); // Set the time of the last record
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Format time to 12-hour format
  const formatTime = (time) => {
    const date = new Date(time);
    return date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  };

  // Format time to only include date
  const formatDate = (time) => {
    const date = new Date(time);
    return date.toLocaleDateString('en-US');
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.content}>
          <Text style={styles.headerText}>Water Level Data</Text>
          <View style={styles.recordContainer}>
            <Text style={[styles.recordText, styles.stylishText]}>Last Record Time: {lastRecordTime ? formatTime(lastRecordTime) : 'N/A'}</Text>
            <Text style={[styles.recordText, styles.stylishText]}>Last Record Date: {lastRecordTime ? formatDate(lastRecordTime) : 'N/A'}</Text>
            <Text style={[styles.recordText, styles.stylishText]}>Water Level (in cm): {latestData["_value"] || 'N/A'}</Text>
            <Text style={[styles.recordText, styles.stylishText]}>Motor State: {latestData["Motorstate"] || 'N/A'}</Text>
            <Text style={[styles.recordText, styles.stylishText]}>Category: {latestData["Category"] || 'N/A'}</Text>
          </View>
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
  content: {
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  recordContainer: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  recordText: {
    fontSize: 20,
    marginBottom: 5,
  },
  stylishText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default AlertPage;
