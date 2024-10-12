import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { colors } from '../styles/colors';
import { JOB_CATEGORIES } from '../utils/constants';

const JobCategoriesScreen = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.categoryItem}
      onPress={() => navigation.navigate('Jobs', { category: item })}
    >
      <Text style={styles.categoryText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Job Categories</Text>
      <FlatList
        data={JOB_CATEGORIES}
        renderItem={renderItem}
        keyExtractor={(item) => item}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: colors.text,
  },
  categoryItem: {
    flex: 1,
    margin: 5,
    padding: 20,
    backgroundColor: colors.primary,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default JobCategoriesScreen;