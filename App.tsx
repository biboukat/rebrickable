import React from 'react';
import {RootStack} from './src/router';
import {rootStore, RootStoreContext} from './src/stores';
import {StatusBar} from 'react-native';

function App(): React.JSX.Element {
  return (
    <RootStoreContext.Provider value={rootStore}>
      <StatusBar barStyle={'dark-content'} />
      <RootStack />
    </RootStoreContext.Provider>
  );
}

export default App;
