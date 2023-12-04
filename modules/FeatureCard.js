import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const FeatureCard = (props) => {
  return (
    <View style={styles.featureCardContainer}>
      <View style={styles.iconContainer}>
        {/* Your SVG icon */}
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.heading}>{props.Heading}</Text>
        <Text style={styles.subHeading}>{props.SubHeading}</Text>
      </View>
    </View>
  );
};

FeatureCard.defaultProps = {
  Heading: 'Lorem ipsum',
  SubHeading:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In lorem lorem, malesuada in metus vitae, scelerisque accumsan ipsum.',
};

FeatureCard.propTypes = {
  Heading: PropTypes.string,
  SubHeading: PropTypes.string,
};

const styles = StyleSheet.create({
  featureCardContainer: {
    width: '100%',
    flexDirection: 'row',
    padding: 16,
    position: 'relative',
    alignItems: 'flex-start',
    borderRadius: 8,
    justifyContent: 'flex-start',
    backgroundColor: '#9cd3db', 
    marginBottom:20,// Replace with your color
  },
  iconContainer: {
    marginRight: 12,
    // Add styles for the icon container here
  },
  textContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  heading: {
    fontFamily: 'Raleway',
    fontWeight: '700',
    lineHeight: 28,
    // Add styles for the heading text here
  },
  subHeading: {
    color: '#555', // Replace with your color
    lineHeight: 15,
    fontWeight:'300',
    // Add styles for the subheading text here
  },
});

export default FeatureCard;