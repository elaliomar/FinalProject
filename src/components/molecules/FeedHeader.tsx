import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import CustomInputText from './CustomInputText';

const FeedHeader = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.secondContainer}>
        <Image
          source={require('../../assets/androidIcon.png')}
          style={styles.imageStyle}
        />
        <Text style={styles.Title}>News24</Text>
      </View>
      <View style={styles.inputText}>
        <CustomInputText
          placeholder="Search"
          placeholderTextColor={'gray'}
          name="search"
        />
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
    width: 30,
    height: 25,
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
  inputText: {
    backgroundColor: 'white',
    marginVertical: 10,
    padding: 3,
    borderRadius: 10,
  },
});
