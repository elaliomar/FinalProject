import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import Icon from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

const AuthStack = () => {
  return (
    <Tab.Navigator
      initialRouteName="News"
      screenOptions={{
        headerTitleAlign: 'center',
        headerShown: false,
      }}>
      <Tab.Screen
        name="News"
        component={HomeScreen}
        options={{
          tabBarActiveTintColor: '#eb5d0c',
          tabBarIcon: ({color}) => (
            <Icon name="newspaper-o" size={30} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Details"
        component={DetailsScreen}
        options={{
          tabBarButton: () => null,
          title: 'Details',
        }}
      />
    </Tab.Navigator>
  );
};

export default AuthStack;
