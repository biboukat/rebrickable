import AsyncStorage from '@react-native-async-storage/async-storage';

export enum ASKeys {
  authToken = 'authToken',
  user = 'user',
}

export const ASSetItem = async (key: ASKeys, value: string) => {
  await AsyncStorage.setItem(key, value);
};

export const ASGetItem = async (key: ASKeys) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (e) {
    console.log('bla AsyncStorage.getItem', e);
  }
  return null;
};

export const ASRemoveItem = async (key: ASKeys) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.log('bla AsyncStorage.removeItem', e);
  }
};

export const ASRemoveAll = async () => {
  try {
    const allKeys = await AsyncStorage.getAllKeys();
    await AsyncStorage.multiRemove(allKeys);
  } catch (e) {
    console.log('bla AsyncStorage.removeItem', e);
  }
};
