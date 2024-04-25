import {StyleSheet, Text, View, FlatList} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';

const CustomLoader = () => {
  const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);
  return (
    <FlatList
      data={[1, 1, 1, 1, 1, 1]}
      renderItem={() => {
        return (
          <View style={styles.firstContainer}>
            <ShimmerPlaceHolder
              style={styles.secondContainer}></ShimmerPlaceHolder>
            <View style={styles.fifthContainer}>
              <ShimmerPlaceHolder
                style={styles.thirdContainer}></ShimmerPlaceHolder>
              <ShimmerPlaceHolder
                style={styles.fourthContainer}></ShimmerPlaceHolder>
            </View>
          </View>
        );
      }}></FlatList>
  );
};

export default CustomLoader;

const styles = StyleSheet.create({
  firstContainer: {
    width: '90%',
    height: 100,
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 10,
    marginVertical: 10,
  },
  secondContainer: {
    width: 100,
    height: 100,
    backgroundColor: '#9e9e9e',
    opacity: 0.2,
    borderRadius: 10,
  },
  thirdContainer: {
    width: '40%',
    height: 20,
    backgroundColor: '#9e9e9e',
    opacity: 0.2,
  },
  fourthContainer: {
    width: '70%',
    height: 30,
    backgroundColor: '#9e9e9e',
    opacity: 0.2,
    marginTop: 10,
  },
  fifthContainer: {
    width: '80%',
    marginLeft: 10,
  },
});
