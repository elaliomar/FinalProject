import axios from 'axios';
import {clearTokens, setTokens} from '../../redux/slices/authSlice';
import {RootState} from '../../redux/store';
import {Dispatch} from '@reduxjs/toolkit';
import {API_KEY} from '@env';

const api = axios.create({
  baseURL: API_KEY,
});

// Add the interceptors

const setupInterceptors = (store: {
  getState: () => RootState;
  dispatch: Dispatch<any>;
}) => {
  api.interceptors.request.use(
    config => {
      const {accessToken} = store.getState().auth;
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    error => Promise.reject(error),
  );

  // Add interceptor response
  api.interceptors.response.use(
    response => response,
    async error => {
      const originalRequest = error.config;

      if (
        error.response &&
        error.response.status === 403 &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;

        const {refreshToken} = store.getState().auth;
        if (!refreshToken) {
          // redirect to login
          store.dispatch(clearTokens());
          return Promise.reject(error);
        }

        try {
          const response = await axios.post(`${API_KEY}/refresh-token`, {
            refreshToken: refreshToken,
          });
          const {accessToken} = response.data;

          // Store the token
          store.dispatch(
            setTokens({
              accessToken,
              refreshToken,
            }),
          );
          api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

          // Send again the original request
          return api(originalRequest);
        } catch (error) {
          store.dispatch(clearTokens());
          return Promise.reject(error);
        }
      }

      return Promise.reject(error);
    },
  );
};

export {api, setupInterceptors};
