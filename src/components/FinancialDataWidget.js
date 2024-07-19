/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { getExchangeRate, getFinancialNews, getStockQuote } from '../services/api';
import { formatCurrency } from '../utils/formatters';

export default function FinancialDataWidget() {
  const [exchangeRate, setExchangeRate] = useState(null);
  const [news, setNews] = useState([]);
  const [stockQuote, setStockQuote] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rate = await getExchangeRate('USD', 'EUR');
        setExchangeRate(rate);

        const newsData = await getFinancialNews();
        setNews(newsData.slice(0, 5)); // Get first 5 news items

        const quote = await getStockQuote('AAPL');
        setStockQuote(quote);
      } catch (error) {
        console.error('Error fetching financial data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Financial Data</Text>
      {exchangeRate && (
        <Text>USD to EUR: {formatCurrency(exchangeRate, 'EUR')}</Text>
      )}
      {stockQuote && (
        <Text>AAPL Stock Price: {stockQuote['05. price']}</Text>
      )}
      <Text style={styles.subtitle}>Latest Financial News:</Text>
      <FlatList
        data={news}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <Text style={styles.newsItem}>{item.title}</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  newsItem: {
    marginBottom: 5,
  },
});
