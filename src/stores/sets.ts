import {makeAutoObservable} from 'mobx';
import {ISetsListItem, IUserSet} from '../api/types';
import {IRootStore} from './types';
import {api} from '../api';
import {flowResult} from './helpers';

export class SetsStore {
  rs: IRootStore;
  getSetListLoading = false;
  getSetListByIdLoading = false;
  userSets: IUserSet[] = [];
  setListById: Map<number, ISetsListItem[]> = new Map();
  constructor(rs: IRootStore) {
    this.rs = rs;
    makeAutoObservable(this, {}, {autoBind: true});
  }

  *getSetLists() {
    try {
      this.getSetListLoading = true;
      const {data} = yield* flowResult(
        api.getSetLists(this.rs.authStore.authToken),
      );
      this.userSets = data.results;
      console.log('bla set list', data);
    } catch (error) {
      console.log('bla getSetList error', typeof error);
    } finally {
      this.getSetListLoading = false;
    }
  }
  *getSetListById(listId: number) {
    try {
      this.getSetListByIdLoading = true;
      const {data} = yield* flowResult(
        api.getSetListById(this.rs.authStore.authToken, listId),
      );
      this.setListById.set(listId, data.results);
      console.log('bla set list', data.results);
    } catch (error) {
      console.log('bla getSetList error', error);
    } finally {
      this.getSetListByIdLoading = false;
    }
  }
}
