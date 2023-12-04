import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Questionstyles } from './questionstyle';
const Question = (props) => {
  return (
    <View style={Questionstyles.questionContainer}>
      <Text style={Questionstyles.questionText}>{props.question}</Text>
      <Text style={Questionstyles.answerText}>{props.answer}</Text>
    </View>
  );
};

Question.defaultProps = {
  answer:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non volutpat turpis. Mauris luctus rutrum mi ut rhoncus.',
  question: 'What types of cars do you sell?',
};

Question.propTypes = {
  answer: PropTypes.string,
  question: PropTypes.string,
};


export default Question;