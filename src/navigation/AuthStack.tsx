import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import Icon from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

const AuthStack = () => {
  return (
    <Tab.Navigator initialRouteName="News">
      <Tab.Screen
        name="News"
        component={HomeScreen}
        options={{
          headerTitleAlign: 'center',
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#eb5d0c',
          tabBarIcon: ({color}) => (
            <Icon name="newspaper-o" size={30} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={FavoriteScreen}
        options={{
          headerTitleAlign: 'center',
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#eb5d0c',
          tabBarIcon: ({color}) => (
            <Icon name="star-o" size={30} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AuthStack;
