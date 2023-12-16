import React, { useRef } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Animated,
  StyleSheet,
} from 'react-native';
import FeatureCard from './FeatureCard';
import GalleryCard3 from './GalleryCard3Page';
import Question from './QuestionPage';
import { useNavigation } from '@react-navigation/native';

const LandingPage = () => {
  const navigation = useNavigation();
  
  const scrollY = useRef(new Animated.Value(0)).current;
  //const featuresSectionRef = useRef(null);
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });
  const scrollViewRef = useRef(null); // Add this line to create a reference to the ScrollView
  const featuresSectionRef = useRef(null); // Add this line to create a reference to the features section

  const scrollToFeaturesSection = () => {
    if (featuresSectionRef.current && scrollViewRef.current) {
      featuresSectionRef.current.measure((x, y, width, height) => {
        scrollViewRef.current.scrollTo({ y, animated: true });
      });
    }
  };
  const imageScale = scrollY.interpolate({
    inputRange: [-100, 0, 100],
    outputRange: [2, 1, 1],
    extrapolate: 'clamp',
  });

  const fadeIn = {
    opacity: scrollY.interpolate({
      inputRange: [0, 200],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    }),
  };
  const GalleryCard = ({ item }) => (
    <View style={styles.galleryCard}>
      <Image source={item.imageSrc} style={{ width: 250, height: 250 }} />
    </View>

  );
  return (
    <ScrollView
    style={styles.container}
    ref={scrollViewRef} // Set the reference for ScrollView
    onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
      useNativeDriver: false,
    })}
    scrollEventThrottle={16}
    >
      <Animated.View style={[styles.hero, { opacity: headerOpacity }]}>
        <Text style={styles.heroHeading}>Hydrosense</Text>
        <Text style={styles.heroSubHeading}>
          Bringing smart water management to your campus
        </Text>
        <View style={styles.heroButtons}>
        <TouchableOpacity
          style={styles.heroButton}
          onPress={() => navigation.navigate('LoginScreen')} // Replace 'LoginScreen' with the name of your login screen
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
        <View ref={featuresSectionRef} style={styles.features}>
        {/* Features section content */}
        
      </View>

      {/* Learn More button */}
      <TouchableOpacity onPress={scrollToFeaturesSection} style={styles.heroButton}>
        <Text style={styles.buttonText}>Learn More →</Text>
      </TouchableOpacity>
        </View>
      </Animated.View>

      <Animated.View style={[styles.details, { transform: [{ scale: imageScale }] }]}>
        <Text style={styles.sectionTitle}>About Hydrosense</Text>
        <Text style={styles.detailsHeading}>
          Hydrosense is a React Native app that aims to revolutionize water
          management in campuses. With our smart system, you can automate the
          motors for the overhead tank and accurately forecast water usage data.
          Say goodbye to manual control and guesswork. Join us in creating a
          sustainable future.
        </Text>
        <Image
          source={{
            uri:
              'https://dm0qx8t0i9gc9.cloudfront.net/watermarks/image/rDtN98Qoishumwih/nature-background-with-save-water-concept_QktOvX_SB_PM.jpg',
          }}
          style={styles.detailsImage}
        />
      </Animated.View>

      <View ref={featuresSectionRef} style={styles.features} >
  <Text style={styles.sectionTitle}>Key Features</Text>
  <Text style={styles.featuresHeading}>
    Discover the powerful features of Hydrosense for smart water management.
  </Text>
  <View style={styles.featuresContainer}>
    <View style={styles.featureRow}>
      <FeatureCard
        Heading="Automated Motor Control"
        SubHeading="Effortlessly control the motors for the overhead tank with our smart water management system."
      />
      <FeatureCard
        Heading="Water Usage Forecasting"
        SubHeading="Get accurate predictions of water usage data to effectively manage and conserve water resources."
      />
      <FeatureCard
        Heading="Threshold-based Monitoring"
        SubHeading="Set thresholds for water levels; sensors monitor and trigger actions when thresholds are crossed."
      />
      <FeatureCard
        Heading="Real-time Decision Making and Optimization"
        SubHeading="Integrate data from sensors, weather forecasts, and consumption patterns for real-time optimization using techniques like fuzzy logic."
      />
    </View>
    {/* Add more FeatureCard components as needed */}
  </View>
</View>
<View style={styles.gallery}>
        <Text style={styles.sectionTitle}>Hydrosense Gallery</Text>
        <Text style={styles.gallerySubHeading}>
          Explore our smart water management system in action
        </Text>
        <FlatList
          data={[
            {
              id: '1',
              imageSrc: require('./images/homescreen4.jpg'),
            },
            {
              id: '2',
              imageSrc: require('./images/homescreen2.jpg'),
            },
            {
              id: '3',
              imageSrc: require('./images/homescreen3.jpg'),
            },
            {
              id: '4',
              imageSrc: require('./images/homescreen1.jpg'),
            },
            // Add more images
          ]}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <GalleryCard item={item} />}
          horizontal
          snapToInterval={250} // Adjust as needed
          decelerationRate="fast"
        />
      </View>

<View style={styles.faq}>
  <Text style={styles.sectionTitle}>FAQ</Text>
  <Text style={styles.faqSubHeading}>Common questions</Text>
  <Text style={styles.faqDescription}>
    Here are some of the most common questions that we get.
  </Text>
  <View style={styles.faqContainer}>
    <Question
      answer="Hydrosense is a React Native app that brings smart water management system into the campus."
      question="What is Hydrosense?"
    />
    <Question
      answer="Hydrosense automates the motors for the overhead tank."
      question="What does Hydrosense automate?"
    />
    <Question
      answer="Hydrosense forecasts the water usage data."
      question="What data does Hydrosense forecast?"
    />
    <Question
      answer="You can access Hydrosense by logging in."
      question="How can I access Hydrosense?"
    />
    <Question
      answer="To login to Hydrosense, use the provided login option on the landing page."
      question="How do I login to Hydrosense?"
    />
  </View>
</View>
    </ScrollView>
  );
  

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  hero: {
    backgroundColor: '#416bdf',
    padding: 20,
    alignItems: 'center',
  },
  heroHeading: {
    marginTop: 70,
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
  },
  heroSubHeading: {
    fontSize: 18,
    color: '#fff',
    marginTop: 10,
    textAlign: 'center',
  },
  heroButtons: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 20,
  },
  heroButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    margin: 0,
    width: 150,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  details: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  detailsHeading: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
  },
  detailsImage: {
    width: '100%',
    height: 250,
    marginTop: 15,
    borderRadius: 10,
  },
  features: {
    padding: 20,
  },
  featuresHeading: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 25,
  },
  gallery: {
    padding: 20,
  },
  gallerySubHeading: {
    fontSize: 18,
    color: '#555',
    marginBottom: 15,
  },
  galleryCard: {
    width: 200, // Adjust as needed
    marginRight: 15,
    borderRadius: 10,
    overflow: 'hidden',
  },
  galleryImage: {
    width: '100%',
    height: 150, // Adjust as needed
    borderRadius: 10,
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  featureCard: {
    width: '48%', // Adjust as needed
    marginBottom: 15,
  },
  featureCardText: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
  },

  faq: {
    padding: 20,
  },
  faqContainer: {
    marginTop: 15,
  },
  faqSubHeading: {
    fontSize: 18,
    color: '#555',
    marginBottom: 10,
  },
  faqDescription: {
    fontSize: 16,
    color: '#777',
    marginBottom: 15,
  },
  question: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  answer: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
  },



});

export default LandingPage;