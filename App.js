import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import ResultScreen from './ResultScreen';
import DetailsScreen from './DetailsScreen';
import RegistrationForm from './RegistrationForm';
import DataScreen from './DataScreen';
import DetailScreen from './DetailsScreen';
import SearchComponent from './SearchComponent';
import AgeVotersList from './AgeVotersList';
import LoginScreen from './LoginScreen';
import ForgotPasswordScreen from './ForgotPasswordScreen';




const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Result" component={ResultScreen} />
        <Stack.Screen name="RegistrationForm" component={RegistrationForm} />
        <Stack.Screen name="DataScreen" component={DataScreen} />
        <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
        <Stack.Screen name="SearchComponent" component={SearchComponent} />
        <Stack.Screen name="AgeVotersList" component={AgeVotersList} />
        <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />







      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
