import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import LandingPage from './modules/LandingPage';
import LoginScreen from './modules/LoginScreen';
import Analytics from './modules/Analytics';
import MotorState from './modules/MotorState';
import Waterlevel from './modules/Waterlevel';
import TankScreen from './modules/TankScreen';
import Forecasting from './modules/forecasting';
import { Image } from 'react-native'; // Import Image from react-native
import * as Font from 'expo-font';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [fontLoaded, setFontLoaded] = useState(false);

  const toggleLoggedIn = () => {
    setLoggedIn(!loggedIn);
  };

  const handleLogOut = () => {
    setLoggedIn(false);
  };

  useEffect(() => {
    // Load the Raleway font asynchronously
    const loadFont = async () => {
      await Font.loadAsync({
        'Raleway-Regular': require('./assets/fonts/Raleway-Regular.ttf'),
        'Raleway-Bold': require('./assets/fonts/Raleway-Bold.ttf'),
        // Add more font variants if needed
      });

      setFontLoaded(true);
    };

    loadFont();
  }, []); // Empty dependency array means this effect runs once after the initial render

  const CustomDrawerContent = (props) => {
    const [selectedRoute, setSelectedRoute] = useState('TankScreen');
  
    const handleRoutePress = (routeName) => {
      setSelectedRoute(routeName);
      props.navigation.navigate(routeName);
    };
  
    const getLabelStyle = (routeName) => ({
      color: selectedRoute === routeName ? 'brown' : 'black',
    });

    return (
      <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: 0 }}>
        <View style={{ backgroundColor: 'brown', padding: 16, marginBottom: 16 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>Options</Text>
        </View>

        <DrawerItem
          label="Tank Screen"
          onPress={() => handleRoutePress('TankScreen')}
          labelStyle={getLabelStyle('TankScreen')}
        />

        <DrawerItem
          label="Motor State"
          onPress={() => handleRoutePress('MotorState')}
          labelStyle={getLabelStyle('MotorState')}
        />

        <DrawerItem
          label="Water Level"
          onPress={() => handleRoutePress('Waterlevel')}
          labelStyle={getLabelStyle('Waterlevel')}
        />

        <DrawerItem
          label="Analytics"
          onPress={() => handleRoutePress('Analytics')}
          labelStyle={getLabelStyle('Analytics')}
        />
        
        <DrawerItem
          label="Water Forecasting"
          onPress={() => handleRoutePress('Forecasting')}
          labelStyle={getLabelStyle('Forecasting')}
        />
        {loggedIn && (
          <DrawerItem
            label=""
            onPress={() => {
              handleLogOut();
              props.navigation.navigate('LandingPage');
            }}
            icon={() => (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ color: 'black' }}>Log Out</Text>
                <Ionicons name="log-out" size={24} color="black" style={{ marginLeft: 8 }} />
              </View>
            )}
          />
        )}
      </DrawerContentScrollView>
    );
  };

  const CustomAppBar = ({ route }) => {
    let title = route.params ? route.params.title : 'Options';

    if (route.name === 'Analytics') {
      title = 'Analytics';
    } else if (route.name === 'Forecasting') {
      title = 'Water Forecasting';
    } else if (route.name === 'TankScreen') {
      title = 'Tank Screen';
    } else if (route.name === 'MotorState') {
      title = 'Motor State';
    } else if (route.name === 'Waterlevel') {
      title = 'Water Level';
    }

    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white', fontFamily: 'Raleway-Bold' }}>
          {title}
        </Text>
      </View>
    );
  };

  return (
    <NavigationContainer>
      {fontLoaded && ( // Wait for the font to be loaded
        loggedIn ? (
          <Drawer.Navigator
            initialRouteName="TankScreen"
            drawerContent={(props) => <CustomDrawerContent {...props} />}
          >
            <Drawer.Screen
              name="MotorState"
              component={MotorState}
              options={({ route }) => ({
                headerTitle: () => <CustomAppBar route={route} />,
                headerStyle: { backgroundColor: 'brown' },
                headerTintColor: 'white',
              })}
            />
            <Drawer.Screen
              name="Analytics"
              component={Analytics}
              options={({ route }) => ({
                headerTitle: () => <CustomAppBar route={route} />,
                headerStyle: { backgroundColor: 'brown' },
                headerTintColor: 'white',
              })}
            />
            <Drawer.Screen
              name="Waterlevel"
              component={Waterlevel}
              options={({ route }) => ({
                headerTitle: () => <CustomAppBar route={route} />,
                headerStyle: { backgroundColor: 'brown' },
                headerTintColor: 'white',
              })}
            />
            <Drawer.Screen
              name="TankScreen"
              component={TankScreen}
              options={({ route }) => ({
                headerTitle: () => <CustomAppBar route={route} />,
                headerStyle: { backgroundColor: 'brown' },
                headerTintColor: 'white',
              })}
            />
            <Drawer.Screen
              name="Forecasting"
              component={Forecasting}
              options={({ route }) => ({
                headerTitle: () => <CustomAppBar route={route} />,
                headerStyle: { backgroundColor: 'brown' },
                headerTintColor: 'white',
              })}
            />
          </Drawer.Navigator>
        ) : (
          <Stack.Navigator initialRouteName="LandingPage" headerMode="none">
            <Stack.Screen
              name="LandingPage"
              component={LandingPage}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="LoginScreen" options={{ headerShown: true }}>
              {() => <LoginScreen onLogin={toggleLoggedIn} />}
            </Stack.Screen>
          </Stack.Navigator>
        )
      )}
    </NavigationContainer>
  );
};

export default App;
