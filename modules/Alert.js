import React, { useState, useEffect } from "react";
import { InfluxDB } from "@influxdata/influxdb-client";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import * as Notifications from 'expo-notifications';

const token = '1f-jAzMp7AsoDQz-SLTYRLv43JRCNuMW_T8qq3AIuuz5aWJH-ktSHlV7zJCKmfyIGcOjrSIJ07cL7kYUmmzhPQ==';
const org = 'abb6618f3fac8447';
const url = 'https://us-east-1-1.aws.cloud2.influxdata.com';
const bucket = 'Hydrosense';

const AlertPage = () => {
  const [latestData, setLatestData] = useState({});
  const [lastRecordTime, setLastRecordTime] = useState(null);

  useEffect(() => {
    registerForPushNotificationsAsync();
    fetchData();
    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      const client = new InfluxDB({ url, token });
      const queryApi = client.getQueryApi(org);

      const query = `
        from(bucket: "${bucket}")
        |> range(start: -1d)
        |> filter(fn: (r) => r["_measurement"] == "WaterLevel")
        |> keep(columns: ["_time", "_value"])
        |> sort(columns:["_time"])
      `;

      const result = await queryApi.collectRows(query);

      if (result.length > 1) {
        const dataPoints = result.map(row => ({
          time: row["_time"],
          value: row["_value"]
        }));

        const previousData = dataPoints[dataPoints.length - 2];
        const currentData = dataPoints[dataPoints.length - 1];

        const previousWaterLevel = previousData.value;
        const currentWaterLevel = currentData.value;

        let previousMotorstate, previousCategory;
        if (previousWaterLevel < 50) {
          previousCategory = 'D';
          previousMotorstate = 'ON';
        } else if (previousWaterLevel < 100) {
          previousCategory = 'C';
        } else if (previousWaterLevel < 200) {
          previousCategory = 'B';
        } else {
          previousCategory = 'A';
          previousMotorstate = 'OFF';
        }

        let motorstate, category;
        if (currentWaterLevel < 50) {
          category = 'D';
          motorstate = 'ON';
        } else if (currentWaterLevel < 100) {
          category = 'C';
          motorstate = previousMotorstate === 'ON' ? 'ON' : 'OFF';
        } else if (currentWaterLevel < 200) { 
          category = 'B';
          motorstate = previousMotorstate === 'ON' ? 'ON' : 'OFF';
        } else {
          category = 'A';
          motorstate = 'OFF';
        }

        setLastRecordTime(currentData.time);
        setLatestData({ waterLevel: currentWaterLevel, motorstate, category });

        checkMessageAlert({ previousMotorstate, previousCategory, motorstate, category });
      } else {
        console.log('Insufficient data to calculate motor state and category.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const checkMessageAlert = ({ previousMotorstate, previousCategory, motorstate, category }) => {
    if (motorstate !== previousMotorstate) {
      sendPushNotification(`Attention! Motor State Changed: ${motorstate}`);
    } 
    
    if (category === 'D' && motorstate !== 'ON') {
      sendPushNotification('Attention! LOW Water Level. Turning ON Motor');
    } else if (category === 'A' && motorstate === 'ON') {
      sendPushNotification('Attention! Water Level Almost Full. Turning OFF Motor');
    }
  };

  const registerForPushNotificationsAsync = async () => {
    try {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        throw new Error('Failed to get push token for push notification!');
      }
    } catch (error) {
      console.error('Push notification permission error:', error);
    }
  };

  const sendPushNotification = async (message) => {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Hydrosense Alert',
          body: message,
        },
        trigger: null,
      });
    } catch (error) {
      console.error('Push notification scheduling error:', error);
    }
  };

  const formatTime = (time) => {
    const date = new Date(time);
    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
    return date.toLocaleString('en-US', options);
  };

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
            <Text style={styles.recordText}>Last Record Time: {lastRecordTime ? formatTime(lastRecordTime) : 'N/A'}</Text>
            <Text style={styles.recordText}>Last Record Date: {lastRecordTime ? formatDate(lastRecordTime) : 'N/A'}</Text>
            <Text style={styles.recordText}>Water Level (in cm): {latestData.waterLevel || 'N/A'}</Text>
            <Text style={styles.recordText}>Motor State: {latestData.motorstate || 'N/A'}</Text>
            <Text style={styles.recordText}>Category: {latestData.category || 'N/A'}</Text>
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
    fontSize: 18,
    marginBottom: 5,
  },
});

export default AlertPage;
