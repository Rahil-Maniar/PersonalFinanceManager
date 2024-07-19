/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getStoredUser = async () => {
  try {
    const userId = await AsyncStorage.getItem('currentUserId');
    if (userId) {
      const userData = await AsyncStorage.getItem(`userData_${userId}`);
      return userData ? JSON.parse(userData) : null;
    }
    return null;
  } catch (error) {
    console.error('Error getting stored user:', error);
    return null;
  }
};

export const storeUser = async (user) => {
  try {
    await AsyncStorage.setItem('currentUserId', user.id);
    await AsyncStorage.setItem(`userData_${user.id}`, JSON.stringify(user));
  } catch (error) {
    console.error('Error storing user:', error);
  }
};

export const removeStoredUser = async () => {
  try {
    const userId = await AsyncStorage.getItem('currentUserId');
    await AsyncStorage.removeItem('currentUserId');
    await AsyncStorage.removeItem(`userData_${userId}`);
  } catch (error) {
    console.error('Error removing stored user:', error);
  }
};

export const getAllUsers = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const userKeys = keys.filter(key => key.startsWith('userData_'));
    const users = await AsyncStorage.multiGet(userKeys);
    return users.map(([key, value]) => JSON.parse(value));
  } catch (error) {
    console.error('Error getting all users:', error);
    return [];
  }
};
