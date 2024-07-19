/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getStoredUser, storeUser } from './storage'; // Ensure storeUser is imported

const EXCHANGE_RATE_API_KEY = 'b335c84cac121458d3bfaf3e';
const NEWS_API_KEY = 'c9dca5476eb140c1b9ceb0e395052bbc';
const ALPHA_VANTAGE_API_KEY = 'RGFIUDA61PHDXX6S';

// Existing mock API functions...

export const getExchangeRate = async (from, to) => {
  try {
    const response = await fetch(`https://v6.exchangerate-api.com/v6/${EXCHANGE_RATE_API_KEY}/latest/${from}`);
    const data = await response.json();
    return data.conversion_rates[to];
  } catch (error) {
    console.error('Error fetching exchange rate:', error);
    throw error;
  }
};

export const getFinancialNews = async () => {
  try {
    const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${NEWS_API_KEY}`);
    const data = await response.json();
    return data.articles;
  } catch (error) {
    console.error('Error fetching financial news:', error);
    throw error;
  }
};

export const getStockQuote = async (symbol) => {
  try {
    const response = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apiKey=${ALPHA_VANTAGE_API_KEY}`);
    const data = await response.json();
    return data['Global Quote'];
  } catch (error) {
    console.error('Error fetching stock quote:', error);
    throw error;
  }
};

export const fetchUserData = async () => {
  return await getStoredUser();
};

export const addExpense = async (expense) => {
  const userData = await getStoredUser();
  userData.expenses.push({ ...expense, id: Date.now().toString() });
  await storeUser(userData);
};

export const addBudget = async (budget) => {
  const userData = await getStoredUser();
  userData.budgets.push({ ...budget, id: Date.now().toString() });
  await storeUser(userData);
};

export const addGoal = async (goal) => {
  const userData = await getStoredUser();
  userData.goals.push({ ...goal, id: Date.now().toString() });
  await storeUser(userData);
};
