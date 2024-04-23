import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import UnAuthStack from './UnAuthStack';
import AuthStack from './AuthStack';

const MainNavigation = () => {
  const authToken = useSelector((state: RootState) => state.auth.authToken);
  return authToken ? <AuthStack /> : <UnAuthStack />;
};

export default MainNavigation;
