import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {useDispatch} from 'react-redux';
import {clearAuthToken} from '../redux/slices/authSlice';

const HomeScreen = () => {
  const dispatch = useDispatch();
  return (
    <View>
      <Text>HomeScreen</Text>
      <Pressable
        onPress={() => {
          dispatch(clearAuthToken());
        }}>
        <Text>Log out</Text>
      </Pressable>
    </View>
  );
};

export default HomeScreen;
