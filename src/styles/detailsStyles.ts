import { StyleSheet,Dimensions } from "react-native";
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    image: {
      height: 300,
      width: Dimensions.get('window').width,
    },
    infoContainer: {
      padding: 24,
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 26,
      fontWeight: 'bold',
      fontFamily: 'mon-sb',
    },
    location: {
      fontSize: 18,
      marginTop: 10,
      fontFamily: 'mon-sb',
      color: '#eb5d0c',
    },
    keywords: {
      fontSize: 16,
      color: 'grey',
      marginVertical: 4,
      fontFamily: 'mon',
    },
    divider: {
      height: StyleSheet.hairlineWidth,
      backgroundColor: 'grey',
      marginVertical: 16,
    },
    host: {
      width: 50,
      height: 50,
      borderRadius: 50,
      backgroundColor: 'grey',
    },
    hostView: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    description: {
      fontSize: 16,
      marginTop: 10,
      fontFamily: 'mon',
    },
    nestedText: {
      color: '#eb5d0c',
    },
    sourceText: {
      fontWeight: '500',
      fontSize: 16,
    },
    roundButton: {
      backgroundColor: '#eb5d0c',
      borderWidth: 1,
      borderRadius: 40,
      borderColor: '#eb5d0c',
      padding: 5,
    },
    iconContainer: {
      padding: 12,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    loaderStyle: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    pressed: {
      backgroundColor: '#9c4614',
    },
  });

  export default styles