import {StyleSheet, Text, View, Image, Pressable} from 'react-native';
import React from 'react';
import {NewsData} from '../../types/newsTypes';
import {useNavigation} from '@react-navigation/native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {authBottomStackParamList} from '../../types/authBottomTab';

const NewsPost = ({_id, title, image_url, pubDate, country}: NewsData) => {
  const navigation =
    useNavigation<
      BottomTabNavigationProp<authBottomStackParamList, 'Details'>
    >();
  const handlePress = () => {
    navigation.navigate('Details', {
      postId: _id,
    });
  };
  const dateWithoutTime = pubDate?.substring(0, 10);
  return (
    <Pressable
      style={styles.mainContainer}
      android_ripple={styles.pressableStyle}
      onPress={handlePress}>
      <View>
        {image_url === null ? (
          <Image
            source={require('../../assets/emtyImage.png')}
            style={styles.imageStyle}
          />
        ) : (
          <Image source={{uri: image_url}} style={styles.imageStyle} />
        )}
      </View>
      <View style={styles.secondContainer}>
        <View style={styles.thirdContainer}>
          <Text style={styles.countryText}>
            {country && country.length > 0
              ? country[0]
              : 'Country not available'}
          </Text>
          <View style={styles.slpitLine} />
          <Text style={styles.dateText}>{dateWithoutTime}</Text>
        </View>
        <Text style={styles.title}>{title}</Text>
      </View>
    </Pressable>
  );
};

export default React.memo(NewsPost);

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: 'lightgrey',
  },

  imageStyle: {
    width: 100,
    height: 100,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#d3d3d3',
    resizeMode: 'cover',
  },
  secondContainer: {
    paddingHorizontal: 7,
    flex: 1,
  },
  thirdContainer: {
    marginVertical: 2,
    flexDirection: 'row',
  },
  countryText: {
    marginRight: 5,
    color: '#eb5d0c',
  },
  slpitLine: {
    borderRightWidth: 2,
    borderColor: '#eb5d0c',
    height: 18,
  },
  dateText: {
    marginLeft: 5,
  },
  title: {
    lineHeight: 20,
    fontWeight: 'bold',
    fontSize: 15,
    color: 'black',
  },
  pressableStyle: {
    color: '#cccccc',
  },
});
