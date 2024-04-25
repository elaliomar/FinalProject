import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import Icon from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

const AuthStack = () => {
  return (
    <Tab.Navigator
      initialRouteName="News"
      screenOptions={{
        headerTitleAlign: 'center',
        headerShown: false,
        tabBarStyle: {
          height: 60,
          position: 'absolute',
          bottom: 30,
          right: 16,
          left: 16,
          borderRadius: 15,
          backgroundColor: '#eb5d0c',
        },
      }}>
      <Tab.Screen
        name="News"
        component={HomeScreen}
        options={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: 'black',
          tabBarIcon: ({color}) => (
            <Icon name="newspaper-o" size={30} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={FavoriteScreen}
        options={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: 'black',
          tabBarIcon: ({color}) => (
            <Icon name="star-o" size={30} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AuthStack;
