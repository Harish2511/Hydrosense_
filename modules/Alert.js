import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as SMS from 'expo-sms'; // Import expo-sms

const Alert = () => {
  const [waterLevel, setWaterLevel] = useState(0); // Initial water level set to 0%
  const [notifications, setNotifications] = useState([]); // Array to store notifications
  const tankSize = 1000; // Tank size in cms
  const recipientPhoneNumber = '7904432526'; // Your phone number

  useEffect(() => {
    // Simulating real-time data updates
    const interval = setInterval(() => {
      // Generating random water level between 0 and tank size
      const randomLevel = Math.floor(Math.random() * (tankSize + 1));
      setWaterLevel(randomLevel);
    }, 5000); // Update interval every 5 seconds

    return () => clearInterval(interval); // Cleanup function to clear interval
  }, []);

  useEffect(() => {
    // Check water level and add notification
    const currentTime = new Date().toLocaleString();
    if (waterLevel < 0.15 * tankSize) {
      // If water level is less than 15%
      const notification = `Alert: Water level is below 15% - ${currentTime}`;
      setNotifications(prevNotifications => [notification, ...prevNotifications.slice(0, 4)]);
      sendSMS(notification); // Send SMS notification
    } else if (waterLevel >= 0.95 * tankSize) {
      // If water level is about to full (95% or more)
      const notification = `Alert: Water tank is almost full - ${currentTime}`;
      setNotifications(prevNotifications => [notification, ...prevNotifications.slice(0, 4)]);
      sendSMS(notification); // Send SMS notification
    }
  }, [waterLevel]);

  const sendSMS = async (message) => {
    try {
      const isAvailable = await SMS.isAvailableAsync();
      if (isAvailable) {
        await SMS.sendSMSAsync(
          [recipientPhoneNumber], // An array of recipient phone numbers
          message // The message body
        );
      } else {
        console.error('SMS functionality is not available on this device.');
      }
    } catch (error) {
      console.error('Error sending SMS:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Water Level Monitoring</Text>
      <Text style={styles.text}>Current Water Level: {((waterLevel / tankSize) * 100).toFixed(2)}%</Text>
      <Text style={styles.text}>Tank Capacity: {tankSize} cm</Text>
      <Text style={styles.heading}>Recent Notifications:</Text>
      {notifications.map((notification, index) => (
        <Text key={index} style={styles.notification}>{notification}</Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  notification: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default Alert;
