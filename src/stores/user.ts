import {makeAutoObservable} from 'mobx';
import {api} from '../api';
import {IRootStore} from './types';
import {flowResult} from './helpers';
import {IUser} from '../api/types';
import {
  ASGetItem,
  ASKeys,
  ASRemoveAll,
  ASSetItem,
} from '../services/asyncStorage';

export class UserStore {
  rs: IRootStore;
  loading = false;
  user: IUser = {avatar_img: null, email: '', user_id: null, username: ''};
  constructor(rs: IRootStore) {
    this.rs = rs;
    makeAutoObservable(this, {}, {autoBind: true});
  }

  *init(): Generator {
    try {
      const userJSON: string | null = yield ASGetItem(ASKeys.user);
      if (userJSON) {
        const user: IUser = JSON.parse(userJSON);
        this.user = {...user};
      }
    } catch (error) {}
  }

  *getProfile() {
    try {
      this.loading = true;
      const {data} = yield* flowResult(api.profile());
      ASSetItem(
        ASKeys.user,
        JSON.stringify({
          avatar_img: data.avatar_img,
          email: data.email,
          user_id: data.user_id,
          username: data.username,
        }),
      );
      console.log('bla profile', data);

      this.user = {...this.user, ...data};
    } catch (error) {
      console.log('bla getProfile', error);
    } finally {
      this.loading = false;
    }
  }

  *logOut() {
    ASRemoveAll();
  }
}
