import {StyleSheet, Text, View, Image, Platform, Pressable} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import {clearTokens} from '../../redux/slices/authSlice';
import {useDispatch} from 'react-redux';

const FeedHeader = () => {
  const dispatch = useDispatch();
  const LogOut = () => {
    dispatch(clearTokens());
  };
  return (
    <View style={styles.mainContainer}>
      <View style={styles.secondContainer}>
        <View style={styles.container}>
          {Platform.OS === 'android' ? (
            <Image
              source={require('../../assets/androidIcon.png')}
              style={styles.imageStyle}
            />
          ) : (
            <Image
              source={require('../../assets/iosIcon.png')}
              style={styles.imageStyle}
            />
          )}
          <Text style={styles.Title}>News24</Text>
        </View>
        <Pressable style={styles.container} onPress={LogOut}>
          <Icon name="logout" size={20} color={'white'} />
          <Text style={styles.Title}> Logout</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default FeedHeader;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#eb5d0c',
    padding: 10,
    paddingBottom: 50,
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
  },
  imageStyle: {
    resizeMode: 'contain',
    width: Platform.OS === 'android' ? 30 : 30,
    height: Platform.OS === 'android' ? 25 : 20,
  },
  secondContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  Title: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
