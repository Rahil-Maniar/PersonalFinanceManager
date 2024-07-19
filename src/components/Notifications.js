/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { formatDate } from '../utils/formatters';

export default function Notifications({ notifications }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications</Text>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.notificationItem}>
            <Text style={styles.notificationText}>{item.message}</Text>
            <Text style={styles.notificationDate}>{formatDate(item.date)}</Text>
          </View>
        )}
        ListEmptyComponent={<Text>No notifications</Text>}
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
  notificationItem: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginBottom: 5,
    borderRadius: 5,
  },
  notificationText: {
    fontSize: 14,
  },
  notificationDate: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
});
