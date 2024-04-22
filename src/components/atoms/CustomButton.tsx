import {StyleSheet, Text, Pressable, View} from 'react-native';
import React, {FC} from 'react';

interface Props {
  title: string;
  onPress: () => void;
}

const CustomButton: FC<Props> = ({title, onPress}) => {
  return (
    <View style={styles.mainContainer}>
      <Pressable
        onPress={onPress}
        style={({pressed}) => [styles.container, pressed && styles.pressed]}>
        <Text style={styles.title}>{title}</Text>
      </Pressable>
    </View>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#eb5d0c',
    padding: 12,
    borderRadius: 20,
    width: '80%',
    marginBottom: 20,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
  pressed: {
    backgroundColor: '#9c4614',
  },
});
