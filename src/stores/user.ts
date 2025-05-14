import {makeAutoObservable} from 'mobx';
import {api} from '../api';
import {IRootStore} from './types';
import {flowResult} from './helpers';

export class UserStore {
  rs: IRootStore;
  loading = false;
  constructor(rs: IRootStore) {
    this.rs = rs;
    makeAutoObservable(this, {}, {autoBind: true});
  }

  *getProfile() {
    try {
      console.log('bla here');

      this.loading = true;
      const res = yield* flowResult(api.profile(this.rs.authStore.authToken));
      console.log('bla res', res);
    } catch (error) {
      console.log('bla getProfile', error);
    } finally {
      this.loading = false;
    }
  }
}

// export const userStore = new UserStore();
