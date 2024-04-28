import {
  Text,
  View,
  ScrollView,
  ImageBackground,
  Pressable,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomInputText from '../molecules/CustomInputText';
import CustomButton from '../atoms/CustomButton';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {unAuthStackParamList} from '../../types/unAuthTypes';
import {Formik, FormikHelpers} from 'formik';
import * as yup from 'yup';
import styles from '../../utils/authStyles';
import Animated, {FadeInDown, FadeInUp} from 'react-native-reanimated';
import axios, {AxiosError} from 'axios';
import handleApiResponseError from '../../utils/authErrorHandle';
import {UserCredentials} from '../../types/userCredientials';

type SignScreenNavigationProp = NavigationProp<unAuthStackParamList, 'SignUp'>;

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

const SignUp = () => {
  const navigation = useNavigation<SignScreenNavigationProp>();
  const [isLoading, setIsLoading] = useState(false);
  const handleFormSubmit = async (
    values: UserCredentials,
    formikHelpers: FormikHelpers<{
      email: string;
      password: string;
    }>,
  ) => {
    const userData = {
      email: values.email,
      password: values.password,
      token_expires_in: '30m',
    };
    setIsLoading(true);
    try {
      const response = await axios.post(
        'https://backend-practice.euriskomobility.me/signup',
        userData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      if (response.status === 201) {
        Alert.alert('User created successfully');
        navigation.navigate('LogIn');
      }
    } catch (error) {
      handleApiResponseError(error as AxiosError, 'signup');
    } finally {
      setIsLoading(false);
      formikHelpers.resetForm();
    }
  };
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <ImageBackground
        source={require('../../assets/background.png')}
        style={styles.imageStyle}>
        <Animated.View
          style={styles.headerContainer}
          entering={FadeInUp.delay(200).duration(1000).springify().damping(3)}>
          <Icon name="key" color={'white'} size={50} />
          <Text style={styles.headerText}>Sign Up</Text>
        </Animated.View>
      </ImageBackground>
      <View style={styles.secondContainer}>
        <View style={styles.secondContainerView}>
          <Text style={styles.secondContainerTitle}>Welcome</Text>
          <View style={styles.nestedContainer}>
            <Text>Already have an account?</Text>
            <Pressable onPress={() => navigation.navigate('LogIn')}>
              <Text style={styles.secondContainerText}>Login now</Text>
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
                  <CustomButton onPress={handleSubmit} title="SignUp" />
                )}
              </View>
            )}
          </Formik>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUp;
