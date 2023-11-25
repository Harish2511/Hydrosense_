import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LoginScreen from './modules/LoginScreen';
import HomeScreen from './modules/Homescreen';
import Analytics from './modules/Analytics';

const Drawer = createDrawerNavigator();

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const toggleLoggedIn = () => {
    setLoggedIn(!loggedIn);
  };

  return (
    <NavigationContainer>
      {loggedIn ? (
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="Analytics" component={Analytics} />
          {/* Add more screens as needed */}
        </Drawer.Navigator>
      ) : (
        <LoginScreen onLogin={toggleLoggedIn} />
      )}
    </NavigationContainer>
  );
}
