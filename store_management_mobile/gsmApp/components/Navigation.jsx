import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import * as React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
// import HomeScreen from './Home';
import MobileScreen from './Products';
import ElectronicsScreen from './Electronics';
import CartScreen from './Cart';
import Register from '../screens/Register';
import ProfileDetails from './ProfileDetails';

const homeName = 'Home';
const mobiles = 'Mobiles';
const eelectronics = 'Electronics';
const cart = 'Cart';
const profileName = 'Profile';

const Tab = createBottomTabNavigator();
export default function Navigation() {
  return (
    <NavigationContainer>
      {/* <Tab.Navigator
        initialRouteName={profileName}
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarIcon: ({foused, color, size}) => {
            let iconName;
            let rn = route.name;

            if (rn == homeName) {
              iconName = foused ? 'home' : 'home';
            } else if (rn == mobiles) {
              iconName = foused ? 'phone-android' : 'phone-android';
            } else if (rn == eelectronics) {
              iconName = foused ? 'electrical-services' : 'electrical-services';
            } else if (rn == cart) {
              iconName = foused ? 'shopping-cart' : 'shopping-cart';
            } else if (rn == profileName || rn == 'Login') {
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
        <Tab.Screen name={homeName} component={HomeScreen} />
        <Tab.Screen name={mobiles} component={MobileScreen} />
        <Tab.Screen name={eelectronics} component={ElectronicsScreen} />
        <Tab.Screen name={cart} component={CartScreen} />
        <Tab.Screen name={profileName} component={ProfileDetails} />
      </Tab.Navigator> */}
    </NavigationContainer>
  );
}
