import {makeAutoObservable} from 'mobx';
import {api} from '../api';
import {IRootStore} from './types';
import {flowResult} from './helpers';
import {ISetDetails} from '../api/types';

export class SearchStore {
  rs: IRootStore;
  loading = false;
  results: ISetDetails[] = [];
  count: number = 0;
  constructor(rs: IRootStore) {
    this.rs = rs;
    makeAutoObservable(this, {}, {autoBind: true});
  }
  clearSearch() {
    this.results = [];
    this.count = 0;
  }
  *search(search: string) {
    try {
      this.loading = true;
      const {data} = yield* flowResult(api.search(search));
      this.results = data.results;
      this.count = data.count;
    } catch (error) {
      console.log('bla error', error);
    } finally {
      this.loading = false;
    }
  }
}
