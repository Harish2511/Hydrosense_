import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';

const Tank = ({ fillPercentage }) => {
  // Define an array of images for different water levels
  const images = [
    require('./images/lvl1.png'),
    require('./images/lvl2.png'),
    require('./images/lvl3.png'),
    require('./images/lvl4.png'),
    require('./images/lvl5.png'),
    require('./images/lvl6.png'),
    require('./images/lvl7.png'),
  ];

  // Determine the index of the image to be displayed based on the fillPercentage
  const imageIndex = Math.floor((fillPercentage / 100) * images.length);
  const displayedImage = images[imageIndex];

  return (
    <View>
      {/* Display the selected image */}
      <Image source={displayedImage} style={styles.image} />

      {/* Additional components (if needed) */}
      {/* ... */}
    </View>
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
  image: {
    width: 200, // Adjust the width and height according to your design
    height: 200,
  },
});

export default TankScreen;
