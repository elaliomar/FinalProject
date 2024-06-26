import {View, StyleSheet, FlatList, RefreshControl} from 'react-native';
import React, {useEffect, useState} from 'react';
import {api} from '../../utils/services/axiosInterceptore';
import {NewsData} from '../../types/newsTypes';
import usePullToRefresh from '../../utils/usePullToRefresh';
import NewsPost from '../molecules/NewsPost';
import CustomLoader from '../molecules/CustomLoader';
import FeedHeader from '../molecules/FeedHeader';

const Feed = () => {
  const [serverData, setServerData] = useState<NewsData[] | null>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [isListEnd, setIsListEnd] = useState(false);

  const fetchPosts = async () => {
    if (!isLoading && !isListEnd) {
      setIsLoading(true);
      await api
        .get(`/posts?page=${page}`)
        .then(response => {
          if (response.data.results.length > 0) {
            setPage(prevPage => prevPage + 1);
            setServerData(prevData => [
              ...(prevData ?? []),
              ...response.data.results,
            ]);
            setIsLoading(false);
          } else {
            setIsListEnd(true);
            setIsLoading(false);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  const {refreshing, onRefreshHandler} = usePullToRefresh({
    onRefreshFunction: async () => {
      setServerData([]);
      setPage(1);
      setIsListEnd(false);
    },
  });

  const renderFooter = () => {
    return (
      <View style={styles.loaderView}>
        {isLoading ? <CustomLoader /> : null}
      </View>
    );
  };

  useEffect(() => {
    fetchPosts();
  }, [page]);

  const renderPosts = ({item}: {item: NewsData}) => {
    return (
      <NewsPost
        _id={item._id}
        title={item.title}
        image_url={item.image_url}
        pubDate={item.pubDate}
        country={item.country}
      />
    );
  };

  return (
    <View style={styles.page}>
      {serverData && (
        <FlatList
          data={serverData}
          keyExtractor={(item, index) => `${item._id}_${index}`}
          renderItem={renderPosts}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          ListFooterComponent={renderFooter}
          ListHeaderComponent={<FeedHeader />}
          onEndReached={fetchPosts}
          onEndReachedThreshold={0.5}
          refreshing={refreshing}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefreshHandler}
            />
          }
        />
      )}
    </View>
  );
};

export default Feed;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loaderView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    margin: 15,
  },
});
