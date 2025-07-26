import {createContext, useContext} from 'react';
import {AuthStore} from './auth';
import {UserStore} from './user';
import {IRootStore} from './types';
import {SetsStore} from './sets';
import {SearchStore} from './search';

class RootStore implements IRootStore {
  userStore: UserStore;
  authStore: AuthStore;
  setsStore: SetsStore;
  searchStore: SearchStore;
  constructor() {
    this.userStore = new UserStore(this);
    this.authStore = new AuthStore(this);
    this.setsStore = new SetsStore(this);
    this.searchStore = new SearchStore(this);
  }
}

export const rootStore = new RootStore();

export const RootStoreContext = createContext<RootStore>(rootStore);
export const useStore = () => useContext(RootStoreContext);
