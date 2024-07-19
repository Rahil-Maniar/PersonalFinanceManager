/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import GoalSetting from '../components/GoalSetting';
import { fetchUserData } from '../services/api';
import { formatCurrency, formatPercentage } from '../utils/formatters';

export default function GoalsScreen() {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    const loadGoals = async () => {
      try {
        const userData = await fetchUserData();
        setGoals(userData.goals);
      } catch (error) {
        console.error('Error fetching goals:', error);
      }
    };
    loadGoals();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Financial Goals</Text>
      <GoalSetting goals={goals} />
      <FlatList
        data={goals}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.goalItem}>
            <Text style={styles.goalName}>{item.name}</Text>
            <Text style={styles.goalProgress}>
              {formatCurrency(item.currentAmount)} / {formatCurrency(item.targetAmount)}
            </Text>
            <Text style={styles.goalPercentage}>
              {formatPercentage(item.currentAmount / item.targetAmount)}
            </Text>
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
  goalItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  goalName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  goalProgress: {
    fontSize: 14,
    marginTop: 5,
  },
  goalPercentage: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
});
