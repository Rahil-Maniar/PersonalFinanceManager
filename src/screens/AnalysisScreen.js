/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import FinancialAnalysis from '../components/FinancialAnalysis';
import { fetchUserData } from '../services/api';
import { formatCurrency } from '../utils/formatters';

export default function AnalysisScreen() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const data = await fetchUserData();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    loadUserData();
  }, []);

  if (!userData) {
    return <Text>Loading...</Text>;
  }

  const totalIncome = (userData.income || []).reduce((sum, income) => sum + income.amount, 0);
  const totalExpenses = (userData.expenses || []).reduce((sum, expense) => sum + expense.amount, 0);
  const savings = totalIncome - totalExpenses;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Financial Analysis</Text>
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryText}>Total Income: {formatCurrency(totalIncome)}</Text>
        <Text style={styles.summaryText}>Total Expenses: {formatCurrency(totalExpenses)}</Text>
        <Text style={styles.summaryText}>Savings: {formatCurrency(savings)}</Text>
      </View>
      <FinancialAnalysis data={userData} />
    </ScrollView>
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
  summaryContainer: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  summaryText: {
    fontSize: 16,
    marginBottom: 5,
  },
});
