// DateSelector.js

import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import DatePicker from 'react-native-modern-datepicker';

const DateSelector = ({ onDateChange, onClose }) => {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (selectedDate) => {
    const formattedDate = selectedDate.replace(/\//g, '-');
    const parsedDate = new Date(formattedDate);

    if (!isNaN(parsedDate.getTime())) {
      setDate(parsedDate);
      onDateChange(parsedDate);
    } else {
      console.error('Invalid date:', selectedDate);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <DatePicker
          style={styles.datePickerStyle}
          mode="calendar"
          selected={date}
          placeholder="Select date"
          format="YYYY-MM-DD"
          minDate="2023-12-01"
          maxDate="2025-01-01"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0,
            },
            dateInput: {
              marginLeft: 36,
            },
          }}
          onDateChange={handleDateChange}
        />
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>X</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  datePickerStyle: {
    width: 300,
    marginTop: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 120,
    right: 10,
    backgroundColor: 'brown',
    padding: 8,
    borderRadius: 0,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default DateSelector;