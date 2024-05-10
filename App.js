import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from './screens/MainScreen';
import GrammarCheckScreen from './screens/GrammarCheckScreen ';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Writing Assitant"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#2CB673',
            borderBottomWidth: 1,
            borderBottomColor: "black",
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen name="Writing Assitant" component={MainScreen} />
        <Stack.Screen name="GrammarCheck" component={GrammarCheckScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};