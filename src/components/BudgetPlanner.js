/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { addBudget } from '../services/api';
import { formatCurrency } from '../utils/formatters';
import { validateAmount, validateCategory } from '../utils/validation';

export default function BudgetPlanner({ budgets }) {
  const [category, setCategory] = useState('');
  const [limit, setLimit] = useState('');
  const [error, setError] = useState('');

  const handleAddBudget = async () => {
    setError('');
    if (!validateCategory(category)) {
      setError('Please enter a valid category');
      return;
    }
    if (!validateAmount(limit)) {
      setError('Please enter a valid amount');
      return;
    }
    try {
      await addBudget({ category, limit: parseFloat(limit) });
      setCategory('');
      setLimit('');
      // In a real app, you'd update the budgets list here
    } catch (error) {
      console.error('Error adding budget:', error);
      setError('Failed to add budget. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Budget Planner</Text>
      <TextInput
        style={styles.input}
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
      />
      <TextInput
        style={styles.input}
        placeholder="Limit"
        value={limit}
        onChangeText={setLimit}
        keyboardType="numeric"
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button title="Add Budget" onPress={handleAddBudget} />
      <FlatList
        data={budgets}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text>{`${item.category}: ${formatCurrency(item.limit)}`}</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});
