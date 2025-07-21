import {makeAutoObservable} from 'mobx';
import {api} from '../api';
import {
  ASGetItem,
  ASKeys,
  ASRemoveAll,
  ASSetItem,
} from '../services/asyncStorage';
import {IRootStore} from './types';
import {flowResult} from './helpers';

export class AuthStore {
  rs: IRootStore;
  authToken = '';
  initLoading = true;
  loginLoading = false;
  constructor(rs: IRootStore) {
    this.rs = rs;
    makeAutoObservable(this, {}, {autoBind: true});
  }
  *init() {
    const user_token = yield* flowResult(ASGetItem(ASKeys.authToken));
    if (user_token) {
      yield this.rs.userStore.init();
      this.authToken = user_token;
      this.postLoginFetch();
    }
    this.initLoading = false;
  }
  *login(username: string, password: string): Generator {
    try {
      this.loginLoading = true;
      const {
        data: {user_token},
      } = yield* flowResult(api.userToken(username, password));
      this.authToken = user_token;
      ASSetItem(ASKeys.authToken, user_token);
      this.postLoginFetch();
    } catch (error: any) {
      console.error('bla auth store login', JSON.parse(error));
    } finally {
      this.loginLoading = false;
    }
  }

  postLoginFetch() {
    this.rs.userStore.getProfile();
  }

  logOut() {
    this.authToken = '';
    ASRemoveAll();
  }
}
