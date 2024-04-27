import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Image,
  Platform,
  Pressable,
  ImageBackground,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {useRoute, useNavigation, RouteProp} from '@react-navigation/native';
import {authBottomStackParamList} from '../../types/authBottomTab';
import {NewsData} from '../../types/newsTypes';
import {api} from '../../utils/services/axiosInterceptore';
import Animated from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const IMG_HEIGHT = 300;
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
          <Animated.ScrollView>
            {news.image_url === null ? (
              <View>
                <Animated.Image
                  source={require('../../assets/emtyImage.png')}
                  style={styles.image}
                />
                <Pressable onPress={goBack} style={styles.roundButton}>
                  <MaterialIcons name="arrow-back" size={22} color={'white'} />
                </Pressable>
              </View>
            ) : (
              <View>
                <Animated.Image
                  source={{uri: news.image_url}}
                  style={styles.image}
                />
                <Pressable onPress={goBack} style={styles.roundButton}>
                  <MaterialIcons name="arrow-back" size={22} color={'white'} />
                </Pressable>
              </View>
            )}
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
                {news.keywords?.map(keyword => {
                  return <Text style={styles.keywords}>{keyword} · </Text>;
                })}
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
                    Hosted by{' '}
                    <Text style={styles.nestedText}>{news.source_id}</Text>
                  </Text>
                  <Text>
                    Host since{' '}
                    <Text style={styles.nestedText}>{news.pubDate}</Text>
                  </Text>
                </View>
              </View>

              <View style={styles.divider} />

              <Text style={styles.description}>{news.description}</Text>
            </View>
          </Animated.ScrollView>
        ))
      ) : (
        <ActivityIndicator />
      )}
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    height: IMG_HEIGHT,
    width: Dimensions.get('window').width,
  },
  infoContainer: {
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    fontFamily: 'mon-sb',
  },
  location: {
    fontSize: 18,
    marginTop: 10,
    fontFamily: 'mon-sb',
    color: '#eb5d0c',
  },
  keywords: {
    fontSize: 16,
    color: 'grey',
    marginVertical: 4,
    fontFamily: 'mon',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'grey',
    marginVertical: 16,
  },
  host: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: 'grey',
  },
  hostView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  description: {
    fontSize: 16,
    marginTop: 10,
    fontFamily: 'mon',
  },
  nestedText: {
    color: '#eb5d0c',
  },
  sourceText: {
    fontWeight: '500',
    fontSize: 16,
  },
  roundButton: {
    backgroundColor: '#eb5d0c',
    margin: 10,
    padding: 5,
    position: 'absolute',
    borderWidth: 1,
    borderRadius: 40,
    borderColor: '#eb5d0c',
  },
});
