import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Products from '../screens/Products';
import {Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const AppNavigator = () => (
  <Tab.Navigator
    screenOptions={({route}) => ({
      tabBarIcon: ({focused, color, size}) => {
        let iconName: string = '';

        if (route.name === 'Products') {
          iconName = focused ? 'cart' : 'cart-outline';
        } else if (route.name === 'Placeholder') {
          iconName = focused ? 'settings' : 'settings-outline';
        } else {
          iconName = 'alert-circle-outline';
        }

        return <Icon name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#007AFF',
      tabBarInactiveTintColor: '#888',
      //  headerStyle: {backgroundColor: '#f8f8f8'},
      // headerTitleStyle: {fontSize: 18, fontWeight: 'bold'},
      headerShown: false,
      tabBarLabelStyle: {fontSize: 12},
    })}>
    <Tab.Screen
      name="Products"
      component={Products}
      options={{
        tabBarLabel: 'Products',
        headerTitle: 'Product List',
      }}
    />
    <Tab.Screen
      name="Placeholder"
      component={() => <Text>Placeholder Screen</Text>}
      options={{
        tabBarLabel: 'More',
        headerTitle: 'More Options',
      }}
    />
  </Tab.Navigator>
);

export default AppNavigator;
