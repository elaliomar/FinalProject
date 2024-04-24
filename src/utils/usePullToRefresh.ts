import {useCallback, useState} from 'react';
interface UsePullToRefreshConfig {
  onRefreshFunction: () => Promise<void>;
}

const usePullToRefresh = ({onRefreshFunction}: UsePullToRefreshConfig) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefreshHandler = useCallback(async () => {
    try {
      setRefreshing(true);
      await onRefreshFunction();
    } finally {
      setRefreshing(false);
    }
  }, [onRefreshFunction]);

  return {refreshing, onRefreshHandler};
};

export default usePullToRefresh;