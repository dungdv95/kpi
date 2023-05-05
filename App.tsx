import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import NavigatorCustom from './src/navigation';
import {Provider as PaperProvider} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {store} from './src/store/store';

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <PaperProvider>
          <NavigationContainer>
            <NavigatorCustom />
          </NavigationContainer>
        </PaperProvider>
      </SafeAreaProvider>
    </Provider>
  );
}
