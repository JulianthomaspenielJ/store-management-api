import { createStackNavigator } from '@react-navigation/stack';
import Home from './Home';
import Search from './Search';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react'
const Stack = createStackNavigator();

function StackNavigation() {
  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName="Home" >
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
        <Stack.Screen name="SearchResults" component={Search} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default StackNavigation