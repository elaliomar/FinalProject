import {StyleSheet, TextInput, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Fontisto';

const CustomInputText = ({...props}) => {
  return (
    <View style={styles.container}>
      <Icon name={props.name} color={'#eb5d0c'} size={25} />
      <TextInput style={styles.inputField} {...props} />
    </View>
  );
};

export default CustomInputText;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputField: {
    marginLeft: 10,
    color: 'black',
    fontSize: 16,
    paddingVertical: 5,
    width: '82%',
  },
});
