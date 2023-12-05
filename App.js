import React, { useState } from 'react';
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

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const toggleLoggedIn = () => {
    setLoggedIn(!loggedIn);
  };

  const handleLogOut = () => {
    setLoggedIn(false);
  };

  const CustomDrawerContent = (props) => {
    const [selectedRoute, setSelectedRoute] = useState('MotorState');
  
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
          label="Motor State"
          onPress={() => handleRoutePress('MotorState')}
          labelStyle={getLabelStyle('MotorState')}
        />
        <DrawerItem
          label="Analytics"
          onPress={() => handleRoutePress('Analytics')}
          labelStyle={getLabelStyle('Analytics')}
        />
        <DrawerItem
          label="Water Level"
          onPress={() => handleRoutePress('Waterlevel')}
          labelStyle={getLabelStyle('Waterlevel')}
        />
        <DrawerItem
          label="Tank Screen"
          onPress={() => handleRoutePress('TankScreen')}
          labelStyle={getLabelStyle('TankScreen')}
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
    const title = route.params ? route.params.title : 'Tank Screen';

    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>{title}</Text>
      </View>
    );
  };

  return (
    <NavigationContainer>
      {loggedIn ? (
        <Drawer.Navigator
          initialRouteName="MotorState"
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
          
          <Stack.Screen name="LoginScreen" options={{ headerShown: false }}>
          {() => <LoginScreen onLogin={toggleLoggedIn} />}
          </Stack.Screen>

        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default App;
