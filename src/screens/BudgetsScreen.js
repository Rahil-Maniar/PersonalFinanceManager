/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import BudgetPlanner from '../components/BudgetPlanner';
import { fetchUserData } from '../services/api';
import { formatCurrency } from '../utils/formatters';

export default function BudgetsScreen() {
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    const loadBudgets = async () => {
      try {
        const userData = await fetchUserData();
        setBudgets(userData.budgets);
      } catch (error) {
        console.error('Error fetching budgets:', error);
      }
    };
    loadBudgets();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Budgets</Text>
      <BudgetPlanner budgets={budgets} />
      <FlatList
        data={budgets}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.budgetItem}>
            <Text style={styles.budgetCategory}>{item.category}</Text>
            <Text style={styles.budgetLimit}>{formatCurrency(item.limit)}</Text>
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
  budgetItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  budgetCategory: {
    fontSize: 16,
    flex: 1,
  },
  budgetLimit: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
