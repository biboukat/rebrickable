import {AuthStore} from './auth';
import { UserStore } from './user';

export interface IRootStore {
  authStore: AuthStore;
  userStore: UserStore;
}
