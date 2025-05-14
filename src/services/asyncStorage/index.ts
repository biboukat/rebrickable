import AsyncStorage from '@react-native-async-storage/async-storage';

export enum ASKeys {
  authToken = 'authToken',
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
