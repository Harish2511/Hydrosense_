import React from 'react';
import { View, Text, Image, TouchableOpacity, StatusBar } from 'react-native';

const LandingPage = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', backgroundColor: 'milkwhite' }}>
      <StatusBar backgroundColor="brown" barStyle="light-content" />
      <View
        style={{
          width: '100%',
          backgroundColor: 'brown',
          paddingVertical: 15,
          paddingHorizontal: 20,
          alignItems: 'flex-start',
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>
          Amrita Hydrosense
        </Text>
      </View>
      <Image
        source={require('../assets/Logo.png')}
        style={{ width: 250, height: 250, resizeMode: 'cover', marginTop: 120 }}
      />
      <View style={{ marginTop: 80 }}>
        <TouchableOpacity
          style={{
            width: 170,
            height: 45,
            backgroundColor: 'brown',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5,
          }}
          onPress={() => navigation.navigate('LoginScreen')}
        >
          <Text style={{ color: 'white', fontSize: 18 }}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LandingPage;
