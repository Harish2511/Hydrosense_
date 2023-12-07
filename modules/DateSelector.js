import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import DatePicker from 'react-native-modern-datepicker';

const DateSelector = ({ onDateChange }) => {
  const [date, setDate] = useState(new Date());

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
              // display: 'none',
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0,
            },
            dateInput: {
              marginLeft: 36,
            },
          }}
          onDateChange={(selectedDate) => {
            // Replace slashes with hyphens in the date string
            const formattedDate = selectedDate.replace(/\//g, '-');
            const parsedDate = new Date(formattedDate);
          
            // Check if parsedDate is a valid date
            if (!isNaN(parsedDate.getTime())) {
              setDate(parsedDate);
              onDateChange(parsedDate);
            } else {
              console.error('Invalid date:', selectedDate);
            }
          }}
          
        />
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
    width: 200,
    marginTop: 20,
  },
});

export default DateSelector;
