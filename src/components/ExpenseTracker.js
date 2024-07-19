/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { addExpense } from '../services/api';
import { formatCurrency } from '../utils/formatters';

export default function ExpenseTracker({ expenses }) {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');

  const handleAddExpense = async () => {
    if (amount && category) {
      try {
        await addExpense({ amount: parseFloat(amount), category });
        setAmount('');
        setCategory('');
        // In a real app, you'd update the expenses list here
      } catch (error) {
        console.error('Error adding expense:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expense Tracker</Text>
      <TextInput
        style={styles.input}
        placeholder="Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
      />
      <Button title="Add Expense" onPress={handleAddExpense} />
      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text>{`${item.category}: ${formatCurrency(item.amount)}`}</Text>
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
});
