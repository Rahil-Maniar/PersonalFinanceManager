/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { formatCurrency } from '../utils/formatters';

export default function FinancialAnalysis({ data }) {
  const expensesByCategory = data.expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});

  const totalExpenses = Object.values(expensesByCategory).reduce((a, b) => a + b, 0);
  const totalBudget = data.budgets.reduce((acc, budget) => acc + budget.limit, 0);

  const chartData = {
    labels: Object.keys(expensesByCategory),
    datasets: [
      {
        data: Object.values(expensesByCategory),
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Financial Analysis</Text>
      <Text>Total Expenses: {formatCurrency(totalExpenses)}</Text>
      <Text>Total Budget: {formatCurrency(totalBudget)}</Text>
      <Text>Budget Utilization: {((totalExpenses / totalBudget) * 100).toFixed(2)}%</Text>
      <Text style={styles.subtitle}>Expenses by Category</Text>
      <LineChart
        data={chartData}
        width={300}
        height={200}
        yAxisLabel="$"
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
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
  subtitle: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 5,
  },
});
