import { StyleSheet } from 'react-native';

const Questionstyles = StyleSheet.create({
  questionContainer: {
    gap: 1,
    width: "auto",
    height: "auto",
    display: "flex",
    position: "relative",
    alignItems: "flex-start",
    marginBottom: 15,
  },
  questionText: {
    fontWeight: "700",
    lineHeight: 20,
  },
  answerText: {
    color: '#888', // Replace this with your desired color value
    lineHeight: 15,
    fontWeight: "300",
  }
});

export { Questionstyles };
