import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {NewsData} from '../../types/newsTypes';

const NewsPost = ({id, title, image_url, source_id}: NewsData) => {
  return (
    <View>
      <Text>{id}</Text>
      <Text>{title}</Text>
      <Image source={{uri: image_url}} style={{height: 100, width: 100}} />
      <Text>{source_id}</Text>
    </View>
  );
};

export default NewsPost;

const styles = StyleSheet.create({});
