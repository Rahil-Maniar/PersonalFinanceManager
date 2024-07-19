/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { addGoal } from '../services/api';
import { formatCurrency, formatPercentage } from '../utils/formatters';
import { validateGoalName, validateTargetAmount } from '../utils/validation';

export default function GoalSetting({ goals }) {
  const [name, setName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [error, setError] = useState('');

  const handleAddGoal = async () => {
    setError('');
    if (!validateGoalName(name)) {
      setError('Please enter a valid goal name');
      return;
    }
    if (!validateTargetAmount(targetAmount)) {
      setError('Please enter a valid target amount');
      return;
    }
    try {
      await addGoal({ name, targetAmount: parseFloat(targetAmount), currentAmount: 0 });
      setName('');
      setTargetAmount('');
      // In a real app, you'd update the goals list here
    } catch (error) {
      console.error('Error adding goal:', error);
      setError('Failed to add goal. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Financial Goals</Text>
      <TextInput
        style={styles.input}
        placeholder="Goal Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Target Amount"
        value={targetAmount}
        onChangeText={setTargetAmount}
        keyboardType="numeric"
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button title="Add Goal" onPress={handleAddGoal} />
      <FlatList
        data={goals}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text>{`${item.name}: ${formatCurrency(item.currentAmount)} / ${formatCurrency(item.targetAmount)} (${formatPercentage(item.currentAmount / item.targetAmount)})`}</Text>
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
