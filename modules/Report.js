import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import DateSelector from './DateSelector';

const Report = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDownloadCurrentData = () => {
    // Handle "Download Current Data" button press
  };

  const handleDownloadPreviousData = () => {
    setShowCalendar(true);
  };

  const handleDownloadReport = async () => {
    if (selectedDate) {
      try {
        const fileUri = FileSystem.documentDirectory + 'Report.csv';

        // Write 'Report' to the CSV file
        await FileSystem.writeAsStringAsync(fileUri, 'Report', { encoding: FileSystem.EncodingType.UTF8 });

        // Trigger the download process
        await Sharing.shareAsync(fileUri, { mimeType: 'text/csv', dialogTitle: 'Download Report' });
      } catch (error) {
        console.error('Error creating or sharing the file:', error);
      }

      setShowCalendar(false); // Close the calendar modal after selecting the date
      setSelectedDate(null); // Reset selectedDate
    } else {
      Alert.alert('Error', 'Please select a date before downloading the report.');
    }
  };

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  const handleCloseCalendar = () => {
    // Close the calendar without selecting a date
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
