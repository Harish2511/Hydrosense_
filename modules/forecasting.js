import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Svg, Rect, Circle } from 'react-native-svg';

const forecasting = ({ fillPercentage }) => {
  const tankHeight = 200;
  const tankWidth = 100;
  const fillHeight = (fillPercentage / 100) * tankHeight;
  const tankFillColor = '#3498db'; // Blue color for the tank

  return (
    <Svg height={tankHeight} width={tankWidth}>
      {/* Tank Body */}
      <Rect
        x={(tankWidth - 80) / 2}
        y={tankHeight - fillHeight}
        width="80"
        height={fillHeight}
        fill={tankFillColor}
      />

      {/* Tank Outline */}
      <Rect
        x={(tankWidth - 80) / 2}
        y="0"
        width="80"
        height={tankHeight}
        fill="none"
        stroke="black"
        strokeWidth="2"
      />

      {/* Tank Cap */}
      <Circle
        cx={tankWidth / 2}
        cy={tankHeight}
        r="10"
        fill="none"
        stroke="black"
        strokeWidth="2"
      />
    </Svg>
  );
};

const TankScreen = () => {
  const fillPercentage = 80; // Replace this with your actual sensor data

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Overhead Tank</Text>
      <Tank fillPercentage={fillPercentage} />
      <Text style={styles.text}>Water Level: {fillPercentage}%</Text>
      <Button title="REFRESH" onPress={() => console.log('Leakage Test Pressed')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginVertical: 10,
  },
});

export default forecasting;
