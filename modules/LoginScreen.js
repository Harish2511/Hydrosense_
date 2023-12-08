import React, { useState, useEffect } from 'react';
import { TextInput, View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, Switch } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    // Customize the header when the component mounts
    navigation.setOptions({
      headerTitle: 'Login',
      headerStyle: {
        backgroundColor: 'brown', // Background color
      },
      headerTintColor: 'white', // Text color
      headerTitleAlign: 'left', // Align title to the left
    });
  }, [navigation]);

  const handleLogin = () => {
    // Add your authentication logic here
    // For now, let's assume login is successful
    // and call the onLogin callback to toggle the loggedIn state
    onLogin();
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require('../assets/Logo.png')} style={styles.logoImage} />

      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Username"
          placeholderTextColor="#003f5c"
          onChangeText={setUsername}
        />
        <MaterialCommunityIcons name="account" size={24} color="#aaa" style={styles.icon} />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={!showPassword}
          onChangeText={setPassword}
        />
        <MaterialCommunityIcons
          name={showPassword ? 'eye-off' : 'eye'}
          size={24}
          color="#aaa"
          style={styles.icon}
          onPress={toggleShowPassword}
        />
      </View>

      <View style={styles.toggleView}>
        <View style={styles.toggleItem}>
          <Text style={styles.toggleLabel}>Remember Me</Text>
          <Switch value={rememberMe} onValueChange={toggleRememberMe} />
        </View>
      </View>

      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    width: 130,
    height: 130,
    marginBottom: 35,
  },
  inputView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    borderColor: '#465881',
    borderWidth: 1,
    borderRadius: 15,
    marginBottom: 20,
    paddingVertical: 0,
    justifyContent: 'space-between',
  },
  icon: {
    marginLeft: 10,
    marginRight: 15,
  },
  inputText: {
    height: 50,
    color: 'black',
    flex: 1,
    marginLeft: 10,
  },
  loginBtn: {
    width: '40%',
    backgroundColor: 'brown',
    borderRadius: 10,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  loginText: {
    color: 'white',
    fontSize: 18,
  },
  toggleView: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 10,
  },
  toggleItem: {
    marginTop: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleLabel: {
    color: 'black',
    marginRight: 10,
  },
});

export default LoginScreen;
