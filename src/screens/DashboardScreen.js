/* eslint-disable prettier/prettier */
// DashboardScreen.js
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import ExpenseTracker from '../components/ExpenseTracker';
import BudgetPlanner from '../components/BudgetPlanner';
import GoalSetting from '../components/GoalSetting';
import FinancialAnalysis from '../components/FinancialAnalysis';
import Notifications from '../components/Notifications';
import { fetchUserData } from '../services/api';
import FinancialDataWidget from '../components/FinancialDataWidget';

export default function DashboardScreen() {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const data = await fetchUserData(user.id);
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    loadUserData();
  }, [user]);

  if (!userData) {
    return <Text>Loading...</Text>;
  }

  const components = [
    { key: 'notifications', component: <Notifications notifications={userData.notifications} /> },
    { key: 'expenseTracker', component: <ExpenseTracker expenses={userData.expenses} /> },
    { key: 'budgetPlanner', component: <BudgetPlanner budgets={userData.budgets} /> },
    { key: 'goalSetting', component: <GoalSetting goals={userData.goals} /> },
    { key: 'financialAnalysis', component: <FinancialAnalysis data={userData} /> },
    { key: 'financialDataWidget', component: <FinancialDataWidget /> },
  ];

  return (
    <FlatList
      style={styles.container}
      data={components}
      renderItem={({ item }) => <View style={styles.componentContainer}>{item.component}</View>}
      keyExtractor={(item) => item.key}
      ListHeaderComponent={<Text style={styles.title}>Welcome, {user.email}!</Text>}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  componentContainer: {
    marginBottom: 20,
  },
});
