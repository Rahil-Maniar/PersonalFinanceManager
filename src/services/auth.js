/* eslint-disable prettier/prettier */
import { getStoredUser, storeUser, removeStoredUser, getAllUsers } from './storage';

export const login = async (email, password) => {
  const users = await getAllUsers();
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    await storeUser(user);
    return { id: user.id, email: user.email };
  } else {
    throw new Error('Invalid email or password');
  }
};

export const register = async (email, password) => {
  const users = await getAllUsers();
  if (users.some(u => u.email === email)) {
    throw new Error('Email already in use');
  }
  const newUser = {
    id: Date.now().toString(),
    email,
    password,
    expenses: [],
    budgets: [],
    goals: [],
    notifications: [],
  };
  await storeUser(newUser);
  return { id: newUser.id, email: newUser.email };
};

export const logout = async () => {
  await removeStoredUser();
};
