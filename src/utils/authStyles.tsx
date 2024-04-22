import {StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  imageStyle: {
    height: Dimensions.get('window').height / 2.5,
    width: '100%',
  },
  headerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: '#eb5d0c',
    fontSize: 40,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  secondContainer: {
    flex: 1,
    backgroundColor: 'white',
    bottom: 50,
    borderTopStartRadius: 60,
    borderTopEndRadius: 60,
  },
  secondContainerView: {
    padding: 40,
  },
  secondContainerTitle: {
    fontSize: 34,
    color: '#eb5d0c',
  },
  nestedContainer: {
    flexDirection: 'row',
    gap: 7,
  },
  pressebalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondContainerText: {
    color: '#eb5d0c',
    fontStyle: 'italic',
  },
  thirdContainer: {
    marginTop: 30,
  },
  inputContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    padding: 10,
    borderRadius: 20,
    width: '100%',
    marginBottom: 20,
  },
  error: {
    color: 'red',
    paddingTop: 8,
    paddingLeft: 25,
  },
});

export default styles;
