import {
  ActivityIndicator,
  Text,
  View,
  Image,
  Platform,
  Pressable,
  ImageBackground,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useRoute, useNavigation, RouteProp} from '@react-navigation/native';
import {authBottomStackParamList} from '../../types/authBottomTab';
import {NewsData} from '../../types/newsTypes';
import {api} from '../../utils/services/axiosInterceptore';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import onShare from '../../utils/ShareNews';
import styles from '../../utils/detailsStyles';

const Details = () => {
  const route = useRoute<RouteProp<authBottomStackParamList, 'Details'>>();
  const navigation = useNavigation();
  const [serverData, setServerData] = useState<NewsData[]>([]);
  const postId = route.params.postId;
  const selectedNews = serverData.filter(news => news._id === postId);

  const fetchPosts = async () => {
    await api.get(`/posts?pageSize=${110}`).then(res => {
      console.log('length', res.data.results.length);
      setServerData(res.data.results);
    });
  };

  useEffect(() => {
    fetchPosts();
  }, [postId]);

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {selectedNews.length > 0 ? (
        selectedNews.map(news => (
          <ScrollView key={news._id}>
            <ImageBackground
              source={
                news.image_url === null
                  ? require('../../assets/emtyImage.png')
                  : {uri: news.image_url}
              }
              style={styles.image}>
              <View style={styles.iconContainer}>
                <Pressable
                  onPress={goBack}
                  style={({pressed}) => [
                    styles.roundButton,
                    pressed && styles.pressed,
                  ]}>
                  <MaterialIcons name="arrow-back" size={22} color={'white'} />
                </Pressable>
                <Pressable
                  onPress={() => onShare(news.link)}
                  style={({pressed}) => [
                    styles.roundButton,
                    pressed && styles.pressed,
                  ]}>
                  {Platform.OS === 'android' ? (
                    <MaterialIcons name="share" size={22} color={'white'} />
                  ) : (
                    <MaterialIcons name="ios-share" size={22} color={'white'} />
                  )}
                </Pressable>
              </View>
            </ImageBackground>
            <View style={styles.infoContainer}>
              <Text style={styles.title}>{news.title}</Text>
              <Text style={styles.location}>
                {Platform.OS === 'android' ? (
                  <Icon name="location" size={20} />
                ) : (
                  <Icon name="location-sharp" size={20} />
                )}
                {news.country && news.country.length > 0
                  ? news.country[0]
                  : 'Country not available'}
              </Text>
              <Text style={styles.keywords}>
                {news.keywords != null ? (
                  news.keywords?.map((keyword, index) => {
                    return (
                      <Text key={index} style={styles.keywords}>
                        #{keyword} ·{' '}
                      </Text>
                    );
                  })
                ) : (
                  <Text style={styles.keywords}>No keywords</Text>
                )}
              </Text>
              <View style={styles.divider} />

              <View style={styles.hostView}>
                {news.source_icon === null ? (
                  <Image
                    source={require('../../assets/emtyImage.png')}
                    style={styles.host}
                  />
                ) : (
                  <Image source={{uri: news.source_icon}} style={styles.host} />
                )}
                <View>
                  <Text style={styles.sourceText}>
                    Published by{' '}
                    <Text style={styles.nestedText}>{news.source_id}</Text>
                  </Text>
                  <Text>
                    Published since{' '}
                    <Text style={styles.nestedText}>{news.pubDate}</Text>
                  </Text>
                </View>
              </View>
              <View style={styles.divider} />
              {news.description != null ? (
                <Text style={styles.description}>{news.description}</Text>
              ) : (
                <Text style={styles.description}>Empty description</Text>
              )}
            </View>
          </ScrollView>
        ))
      ) : (
        <ActivityIndicator
          color="#eb5d0c"
          style={styles.loaderStyle}
          size={'large'}
        />
      )}
    </View>
  );
};

export default Details;
