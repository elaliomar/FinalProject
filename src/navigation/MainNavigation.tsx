import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import UnAuthStack from './UnAuthStack';
import AuthStack from './AuthStack';

const MainNavigation = () => {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  return accessToken ? <AuthStack /> : <UnAuthStack />;
};

export default MainNavigation;
