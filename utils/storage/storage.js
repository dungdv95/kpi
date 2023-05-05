import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';

export const setStorageData = async (key, value = '') => {
  try {
    if (typeof value === 'string') {
      await AsyncStorage.setItem(key, value);
    }
    if (typeof value === 'object') {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    }
  } catch (e) {
    Alert('Set storage error');
  }
};

export const getStorageData = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value === null) {
      return null;
    }
    if (value.includes('{')) {
      return value !== null ? JSON.parse(value) : null;
    }
    return value;
  } catch (e) {
    Alert('Get storage error');
  }
};

export const removeStorage = async key => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    Alert('Remove storage error');
  }
};
