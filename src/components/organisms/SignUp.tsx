import {Text, View, ScrollView, ImageBackground, Pressable} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomInputText from '../molecules/CustomInputText';
import CustomButton from '../atoms/CustomButton';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {AuthStackParamList} from '../../types/authTypes';
import {Formik} from 'formik';
import * as yup from 'yup';
import styles from '../../utils/authStyles';
import Animated, {FadeInDown, FadeInUp} from 'react-native-reanimated';

type SignScreenNavigationProp = NavigationProp<AuthStackParamList, 'SignUp'>;

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
  const handleFormSubmit = (values: {email: string; password: string}) => {
    console.log(values);
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
                <CustomButton onPress={handleSubmit} title="SignUp" />
              </View>
            )}
          </Formik>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUp;
