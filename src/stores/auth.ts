import {makeAutoObservable} from 'mobx';
import {api} from '../api';
import {
  ASGetItem,
  ASKeys,
  ASRemoveItem,
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
    this.authToken = user_token ?? '';
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
    } catch (error: any) {
      console.error('bla auth store login', JSON.parse(error));
    } finally {
      this.loginLoading = false;
    }
  }

  logOut() {
    this.authToken = '';
    ASRemoveItem(ASKeys.authToken);
  }
}
