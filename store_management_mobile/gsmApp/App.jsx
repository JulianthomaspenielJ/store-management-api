/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {ModalPortal} from 'react-native-modals';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Navigation from './components/Navigation';
import {createStackNavigator} from '@react-navigation/stack';
// import Homes from './components/Home';
import Search from './components/Search';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Stack = createStackNavigator();

import Icon from 'react-native-vector-icons/MaterialIcons';

import MobileScreen from './components/Products';
import ElectronicsScreen from './components/Electronics';
import CartScreen from './components/Cart';
import Profile from './screens/Login';
import Register from './screens/Register';
import Login from './screens/Login';
import ProfileDetails from './components/ProfileDetails';
import Home from './screens/Home';
import Store from './screens/Store';
import Product from './screens/Product';
import ProductInfo from './screens/ProductIfo';
import Order from './screens/Order';
import ProfileScreen from './screens/Profile';
import AddressScreen from './screens/AddressScreen';
import AddAddressScreen from './screens/AddAddressScreen';
import ConfirmationScreen from './screens/ConfirmationScreen';

const homeName = 'Home';
const mobiles = 'Category';
const eelectronics = 'Electronics';
const cart = 'Cart';
const profileName = 'Profile';

const Tab = createBottomTabNavigator();
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={'#fff'} barStyle="dark-content" />
      <Stack.Navigator initialRouteName="Login">
        {/* {isLoggedIn ? ( */}
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MainTab"
          component={MainTabNavigator}
          options={{headerShown: false}}
        />
        {/* ) : ( */}

        {/* )} */}
        <Stack.Screen
          name="Search"
          component={Search}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Order"
          component={Order}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Store"
          component={Store}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ProductInfo"
          component={ProductInfo}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AddAddress"
          component={AddressScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Address"
          component={AddAddressScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ConfirmOrder"
          component={ConfirmationScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
      <ModalPortal />
    </NavigationContainer>
  );
}

function MainTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName={homeName}
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({foused, color, size}) => {
          let iconName;
          let rn = route.name;

          if (rn == homeName) {
            iconName = foused ? 'home' : 'home';
          } else if (rn == mobiles) {
            iconName = foused ? 'category' : 'category';
          } else if (rn == eelectronics) {
            iconName = foused ? 'electrical-services' : 'electrical-services';
          } else if (rn == cart) {
            iconName = foused ? 'shopping-cart' : 'shopping-cart';
          } else if (rn == profileName) {
            iconName = foused ? 'person' : 'person';
          }
          return <Icon name={iconName} size={30} color={color} />;
        },

        tabBarActiveTintColor: '#5F9EA0',
        tabBarStyle: [
          {
            display: 'flex',
          },
          null,
        ],
      })}>
      <Tab.Screen name={homeName} component={Home} />
      <Tab.Screen name={mobiles} component={Product} />
      {/* <Tab.Screen name={eelectronics} component={ElectronicsScreen} /> */}
      <Tab.Screen name={cart} component={CartScreen} />
      <Tab.Screen name={profileName} component={ProfileScreen} />
    </Tab.Navigator>
  );
}
const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
