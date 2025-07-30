import axios from 'axios';
import {
  IMocDetails,
  ISetDetails,
  ISetsListItem,
  IUser,
  IUserSet,
} from './types';

const apiKey = '1ac04b6a59f34ff47432b041b231bd89';
const baseURL = 'https://rebrickable.com/api/v3/';
const instance = axios.create({
  baseURL,
  timeout: 10000,
  headers: {Authorization: `key ${apiKey}`},
});

class Api {
  private authToken = '';
  public setAuthToken(authToken: string) {
    this.authToken = authToken;
  }
  public async profile() {
    return instance.get<IUser>(`users/${this.authToken}/profile/`);
  }
  public async getSetLists() {
    return instance.get<{results: IUserSet[]}>(
      `users/${this.authToken}/setlists/`,
    );
  }

  public async getSetListById(listId: number) {
    return instance.get<{results: ISetsListItem[]}>(
      `users/${this.authToken}/setlists/${listId}/sets/`,
    );
  }
  public async addSetToList(list_id: number, set_num: string) {
    return instance.post(`users/${this.authToken}/setlists/${list_id}/sets/`, {
      set_num,
    });
  }

  public async userToken(username: string, password: string) {
    return instance.post<{user_token: string}>(
      'users/_token/',
      {username, password},
      {headers: {'Content-Type': 'application/x-www-form-urlencoded'}},
    );
  }

  public async getSetDetails(set_num: string) {
    return instance.get<ISetDetails>(`lego/sets/${set_num}/`);
  }
  public async getAlternativeBuilds(set_num: string) {
    return instance.get<{results: IMocDetails[]; count: number}>(
      `lego/sets/${set_num}/alternates/?ordering=-year`,
    );
  }
  public async deleteSetFromList(list_id: number, set_num: string) {
    return instance.delete(
      `users/${this.authToken}/setlists/${list_id}/sets/${set_num}/`,
    );
  }
  public async search(search: string) {
    return instance.get<{results: ISetDetails[]; count: number}>(
      `lego/sets/?search=${search}`,
    );
  }
}

export const api = new Api();
