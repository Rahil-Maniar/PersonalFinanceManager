/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import ExpenseTracker from '../components/ExpenseTracker';
import { fetchUserData } from '../services/api';
import { formatCurrency, formatDate } from '../utils/formatters';

export default function ExpensesScreen() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const loadExpenses = async () => {
      try {
        const userData = await fetchUserData();
        setExpenses(userData.expenses);
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    };
    loadExpenses();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expenses</Text>
      <ExpenseTracker expenses={expenses} />
      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.expenseItem}>
            <Text style={styles.expenseCategory}>{item.category}</Text>
            <Text style={styles.expenseAmount}>{formatCurrency(item.amount)}</Text>
            <Text style={styles.expenseDate}>{formatDate(item.date)}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  expenseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  expenseCategory: {
    fontSize: 16,
    flex: 1,
  },
  expenseAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  expenseDate: {
    fontSize: 12,
    color: '#666',
  },
});
