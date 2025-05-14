import axios from 'axios';

const apiKey = '1ac04b6a59f34ff47432b041b231bd89';
const baseURL = 'https://rebrickable.com/api/v3/';
const instance = axios.create({
  baseURL,
  timeout: 10000,
  headers: {Authorization: `key ${apiKey}`},
});

const test = async () => {
  return instance.get('lego/colors/');
};
const profile = async (user_token: string) => {
  return instance.get(`users/${user_token}/profile/`);
};
const userToken = async (username: string, password: string) => {
  return instance.post<{user_token: string}>(
    'users/_token/',
    {
      username,
      password,
    },
    {headers: {'Content-Type': 'application/x-www-form-urlencoded'}},
  );
};

export const api = {test, userToken, profile};
