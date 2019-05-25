import React, { Component } from 'react';
import {  ActivityIndicator } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react'
import { useScreens } from 'react-native-screens';
import createStore from './src/Redux/create'


import ApiClient from './src/Utils/apiClient';
import AppNavigator from './src/Navigator/AppNavigator';

/**
 * make store and persistor and pass apiclient to it and put in in provider and PersistGate
 */

const client = new ApiClient();
const { store, persistor } = createStore(client);

/**
 * use screens module for better memory performances
 */

useScreens();

console.disableYellowBox = true;

class App extends Component {

  render() {
    return (
        <Provider store={store}>
          <PersistGate
              loading={<ActivityIndicator />}
              persistor={persistor}
          >
            <AppNavigator />
          </PersistGate>
        </Provider>
    );
  }
}

export default App;
