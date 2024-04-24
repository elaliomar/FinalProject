import {View, Text, Pressable} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {clearTokens} from '../redux/slices/authSlice';
import {RootState, store} from '../redux/store';
import {api} from '../utils/services/axiosInterceptore';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const refreshToken = useSelector(
    (state: RootState) => state.auth.refreshToken,
  );
  const fetchPosts = async (page: number, pageSize: number) => {
    try {
      const response = await api.get(
        `/posts?page=${page}&pageSize=${pageSize}`,
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch posts:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchPosts(1, 10);
    console.log(accessToken);
  }, []);
  return (
    <View>
      <Text>HomeScreen</Text>
      <Pressable
        onPress={() => {
          dispatch(clearTokens());
        }}>
        <Text>{accessToken}</Text>
        <Text>{refreshToken}</Text>
      </Pressable>
    </View>
  );
};

export default HomeScreen;
