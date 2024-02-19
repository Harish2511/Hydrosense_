import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import DateSelector from './DateSelector';
import { InfluxDB } from "@influxdata/influxdb-client";

const token = '1f-jAzMp7AsoDQz-SLTYRLv43JRCNuMW_T8qq3AIuuz5aWJH-ktSHlV7zJCKmfyIGcOjrSIJ07cL7kYUmmzhPQ==';
const org = 'abb6618f3fac8447';
const url = 'https://us-east-1-1.aws.cloud2.influxdata.com';
const bucket = 'Hydrosense';

const Report = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDownloadCurrentData = async () => {
    // Handle "Download Current Data" button press
    const currentDate = new Date();
    const formattedDate = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;
    const waterLevel = await fetchWaterLevelForDate(currentDate);
    downloadReport(formattedDate, waterLevel);
  };

  const handleDownloadPreviousData = () => {
    setShowCalendar(true);
  };

  const handleDownloadReport = async () => {
    if (selectedDate) {
      const formattedDate = `${selectedDate.toLocaleDateString()} ${selectedDate.toLocaleTimeString()}`;
      const waterLevel = await fetchWaterLevelForDate(selectedDate);
      downloadReport(formattedDate, waterLevel);
    } else {
      Alert.alert('Error', 'Please select a date before downloading the report.');
    }
  };

  const fetchWaterLevelForDate = async (date) => {
    try {
      const client = new InfluxDB({ url, token });
      const queryApi = client.getQueryApi(org);

      const query = `
        from(bucket: "${bucket}")
        |> range(start: ${date.toISOString()}, stop: ${new Date(date.getTime() + 24 * 60 * 60 * 1000).toISOString()})
        |> filter(fn: (r) => r["_measurement"] == "WaterLevel" and r["_field"] == "distance")
        |> aggregateWindow(every: 1d, fn: mean)
      `;

      const result = await queryApi.collectRows(query);
      if (result.length > 0) {
        return result[0]["_value"];
      } else {
        return 'N/A';
      }
    } catch (error) {
      console.error('Error fetching water level data:', error);
      return 'N/A';
    }
  };

  const downloadReport = async () => {
    try {
      if (!selectedDate) {
        throw new Error('Error: No selected date for the report.');
      }
  
      // Get the current date and time when the report is being downloaded
      const downloadDate = new Date();
      const formattedDownloadDate = `${downloadDate.toLocaleDateString()} ${downloadDate.toLocaleTimeString()}`;
  
      // Fetch all data for the selected date
      const client = new InfluxDB({ url, token });
      const queryApi = client.getQueryApi(org);
  
      const query = `
        from(bucket: "${bucket}")
        |> range(start: ${selectedDate.toISOString()}, stop: ${new Date(selectedDate.getTime() + 24 * 60 * 60 * 1000).toISOString()})
      `;
  
      const result = await queryApi.collectRows(query);
  
      // Format the selected date for the filename
      const selectedDateFormatted = selectedDate.toLocaleDateString().replace(/\//g, '-');
  
      // Create the filename with the selected date
      const filename = `Report_${selectedDateFormatted}.csv`;
  
      // Construct the file URI
      const fileUri = FileSystem.documentDirectory + filename;
  
      // Construct the CSV header
      let reportData = 'ID,Date,Time,Water Level\n';
  
      // Initialize ID counter
      let id = 1;
  
      // Loop through the result and add each row to the report data
      result.forEach(row => {
        // Extract time from the timestamp
        const time = new Date(row['_time']).toLocaleTimeString();
  
        // Add row to report data
        reportData += `${id},${selectedDate.toLocaleDateString()},${time},${row['_value']}\n`;
  
        // Increment ID
        id++;
      });
  
      // Write report data to the CSV file
      await FileSystem.writeAsStringAsync(fileUri, reportData, { encoding: FileSystem.EncodingType.UTF8 });
  
      // Share and download the CSV file
      await Sharing.shareAsync(fileUri, { mimeType: 'text/csv', dialogTitle: 'Download Report' });
    } catch (error) {
      console.error('Error creating or sharing the file:', error);
    }
  
    setShowCalendar(false); // Close the calendar modal after selecting the date
    setSelectedDate(null); // Reset selectedDate
  };
  
  
  
    

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  const handleCloseCalendar = () => {
    setShowCalendar(false);
    setSelectedDate(null); // Reset selectedDate
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity
        style={{
          backgroundColor: 'black',
          paddingTop: 10,
          paddingBottom: 10,
          borderRadius: 5,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 10,
          width: '60%',
        }}
        onPress={handleDownloadCurrentData}
      >
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>
          Download Current Data
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: 'black',
          paddingTop: 10,
          paddingBottom: 10,
          borderRadius: 5,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 30,
          width: '60%',
        }}
        onPress={handleDownloadPreviousData}
      >
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>
          Download Previous Data
        </Text>
      </TouchableOpacity>

      {/* Calendar Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showCalendar}
        onRequestClose={handleCloseCalendar}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <DateSelector onDateChange={handleDateChange} onClose={handleCloseCalendar} />
          {selectedDate && (
            <TouchableOpacity
              onPress={handleDownloadReport}
              style={{
                backgroundColor: 'black',
                padding: 10,
                margin: 10,
                borderRadius: 5,
              }}
            >
              <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>
                Download Report
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </Modal>
    </View>
  );
};

export default Report;
