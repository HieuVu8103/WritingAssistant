import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from './screens/MainScreen';
import GrammarCheckScreen from './screens/GrammarCheckScreen ';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={MainScreen} />
        <Stack.Screen name="GrammarCheck" component={GrammarCheckScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};