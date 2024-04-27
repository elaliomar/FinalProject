import {StyleSheet, Text, View, Image, Platform} from 'react-native';
import React, {useState} from 'react';

const FeedHeader = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.secondContainer}>
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
  },
  Title: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
});
