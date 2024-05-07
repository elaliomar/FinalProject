import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import UnAuthStack from './UnAuthStack';
import AuthStack from './AuthStack';

const MainNavigation = () => {
  const {accessToken, refreshToken} = useSelector(
    (state: RootState) => state.auth,
  );
  const isAuthenticated = accessToken && refreshToken;
  return isAuthenticated ? <AuthStack /> : <UnAuthStack />;
};

export default MainNavigation;
