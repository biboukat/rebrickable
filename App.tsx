import React from 'react';
import {RootStack} from './src/router';
import {rootStore, RootStoreContext} from './src/stores';

function App(): React.JSX.Element {
  return (
    <RootStoreContext.Provider value={rootStore}>
      <RootStack />
    </RootStoreContext.Provider>
  );
}

export default App;
