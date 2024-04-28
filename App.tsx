import React from 'react';
import {useColorScheme, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import MainNavigation from './src/navigation/MainNavigation';
import {store, persistor, RootState} from './src/redux/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import BootSplash from 'react-native-bootsplash';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer
          onReady={() => {
            BootSplash.hide();
          }}>
          <MainNavigation />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;
