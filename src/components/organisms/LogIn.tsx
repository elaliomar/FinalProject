import {
  Text,
  View,
  ScrollView,
  ImageBackground,
  Pressable,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomInputText from '../molecules/CustomInputText';
import CustomButton from '../atoms/CustomButton';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {AuthStackParamList} from '../../types/authTypes';
import {Formik, FormikHelpers} from 'formik';
import * as yup from 'yup';
import styles from '../../utils/authStyles';
import Animated, {FadeInDown, FadeInUp} from 'react-native-reanimated';
import axios, {AxiosError} from 'axios';
// import {setAuthToken} from '../../redux/slices/authSlice';
import {useDispatch} from 'react-redux';
import {UserCredentials} from '../../types/userCredientials';
import handleApiResponseError from '../../utils/authErrorHandle';
import {setAccessToken, setRefreshToken} from '../../redux/slices/authSlice';

type LoginScreenNavigationProp = NavigationProp<AuthStackParamList, 'LogIn'>;

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const LogIn = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const handleFormSubmit = async (
    values: UserCredentials,
    formikHelpers: FormikHelpers<{
      email: string;
      password: string;
    }>,
  ) => {
    console.log(values);
    const userData = {
      email: values.email,
      password: values.password,
    };
    setIsLoading(true);
    try {
      const response = await axios.post(
        'https://backend-practice.euriskomobility.me/login',
        userData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      console.log(JSON.stringify(userData));
      console.log('Data getted successfully:', response.data);
      if (response.status === 200) {
        dispatch(setAccessToken(response.data.accessToken));
        dispatch(setRefreshToken(response.data.refreshToken));
        // dispatch(
        //   setTokens({
        //     authToken: response.data.accessToken,
        //     refreshToken: response.data.refreshToken,
        //   }),
        // );
      }
    } catch (error) {
      handleApiResponseError(error as AxiosError, 'login');
    } finally {
      setIsLoading(false);
      formikHelpers.resetForm();
    }
  };
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={require('../../assets/background.png')}
          style={styles.imageStyle}>
          <Animated.View
            style={styles.headerContainer}
            entering={FadeInUp.delay(200)
              .duration(1000)
              .springify()
              .damping(3)}>
            <Icon name="key" color={'white'} size={50} />
            <Text style={styles.headerText}>Log In</Text>
          </Animated.View>
        </ImageBackground>
        <View style={styles.secondContainer}>
          <View style={styles.secondContainerView}>
            <Text style={styles.secondContainerTitle}>Welcome</Text>
            <View style={styles.nestedContainer}>
              <Text>Don't have an account?</Text>
              <Pressable onPress={() => navigation.navigate('SignUp')}>
                <Text style={styles.secondContainerText}>Sign Up</Text>
              </Pressable>
            </View>
            <Formik
              initialValues={{email: '', password: ''}}
              validationSchema={validationSchema}
              onSubmit={handleFormSubmit}>
              {({handleChange, handleSubmit, values, errors}) => (
                <View style={styles.thirdContainer}>
                  <Animated.View
                    style={styles.inputContainer}
                    entering={FadeInDown.duration(1000).springify()}>
                    <CustomInputText
                      placeholder="Email"
                      placeholderTextColor={'gray'}
                      onChangeText={handleChange('email')}
                      value={values.email}
                      name="email"
                    />
                    {errors.email && (
                      <Text style={styles.error}>{errors.email}</Text>
                    )}
                  </Animated.View>
                  <Animated.View
                    style={styles.inputContainer}
                    entering={FadeInDown.delay(200).duration(1000).springify()}>
                    <CustomInputText
                      placeholder="Password"
                      placeholderTextColor={'gray'}
                      onChangeText={handleChange('password')}
                      value={values.password}
                      secureTextEntry
                      name="key"
                    />
                    {errors.password && (
                      <Text style={styles.error}>{errors.password}</Text>
                    )}
                  </Animated.View>
                  {isLoading ? (
                    <ActivityIndicator size={'large'} color="#eb5d0c" />
                  ) : (
                    <CustomButton onPress={handleSubmit} title="LogIn" />
                  )}
                </View>
              )}
            </Formik>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default LogIn;
