import {makeAutoObservable} from 'mobx';
import {IMocDetails, ISetDetails, ISetsListItem, IUserSet} from '../api/types';
import {IRootStore} from './types';
import {api} from '../api';
import {flowResult} from './helpers';

export class SetsStore {
  rs: IRootStore;
  getSetListLoading = false;
  getSetListByIdLoading = false;
  setDetailsLoading = false;
  addSetToListLoading = false;
  deleteSetFromListLoading = false;
  userSets: IUserSet[] = [];
  setListById: Map<number, ISetsListItem[]> = new Map();
  mocsBySetId: Map<string, {results: IMocDetails[]; count: number}> = new Map();
  setsById: Map<string, ISetDetails> = new Map();

  constructor(rs: IRootStore) {
    this.rs = rs;
    makeAutoObservable(this, {}, {autoBind: true});
  }

  *getSetLists() {
    try {
      this.getSetListLoading = true;
      const {data} = yield* flowResult(api.getSetLists());
      this.userSets = data.results;
    } catch (error) {
      console.log('bla getSetList error', typeof error);
    } finally {
      this.getSetListLoading = false;
    }
  }
  *getSetListById(listId: number) {
    try {
      this.getSetListByIdLoading = true;
      const {data} = yield* flowResult(api.getSetListById(listId));
      this.setListById.set(listId, data.results.reverse());
    } catch (error) {
      console.log('bla getSetList error', error);
    } finally {
      this.getSetListByIdLoading = false;
    }
  }
  *addSetToList(listId: number, set_num: string) {
    try {
      this.addSetToListLoading = true;
      const {data} = yield* flowResult(api.addSetToList(listId, set_num));
      console.log('bla addSetToList data', data);
      // this.setListById.set(listId, data.results.reverse());
    } catch (error) {
      console.log('bla addSetToList error', error);
    } finally {
      this.addSetToListLoading = false;
    }
  }
  *deleteSetFromList(listId: number, set_num: string) {
    try {
      this.deleteSetFromListLoading = true;
      const {data} = yield* flowResult(api.deleteSetFromList(listId, set_num));
      this.getSetListById(listId);
      console.log('bla deleteSetFromListLoading data', data);
      // this.setListById.set(listId, data.results.reverse());
    } catch (error) {
      console.log('bla deleteSetFromListLoading error', error);
    } finally {
      this.deleteSetFromListLoading = false;
    }
  }

  *getSpecificSetDetails(set_num: string) {
    try {
      this.setDetailsLoading = true;
      const {data: mocs} = yield* flowResult(api.getAlternativeBuilds(set_num));
      const {data} = yield* flowResult(api.getSetDetails(set_num));
      console.log('bla mocs', mocs, data);
      this.setsById.set(set_num, data);
      this.mocsBySetId.set(set_num, mocs);
    } catch (error) {
      console.log('bla getSpecificSetDetails error', error);
    } finally {
      this.setDetailsLoading = false;
    }
  }
}
