import {createContext, useContext} from 'react';
import {AuthStore} from './auth';
import {UserStore} from './user';
import {IRootStore} from './types';
import { SetsStore } from './sets';

class RootStore implements IRootStore {
  userStore: UserStore;
  authStore: AuthStore;
  setsStore: SetsStore;
  constructor() {
    this.userStore = new UserStore(this);
    this.authStore = new AuthStore(this);
    this.setsStore = new SetsStore(this);
  }
}

export const rootStore = new RootStore();

export const RootStoreContext = createContext<RootStore>(rootStore);
export const useStore = () => useContext(RootStoreContext);
