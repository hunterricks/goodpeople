import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../styles/colors';
import SearchBar from '../components/SearchBar';

const dummyJobs = [
  { id: '1', title: 'React Native Developer', budget: '$30-50/hr', description: 'We need a skilled React Native developer for a 3-month project.' },
  { id: '2', title: 'UI/UX Designer', budget: '$1000-2000', description: 'Looking for a creative UI/UX designer to redesign our mobile app.' },
  { id: '3', title: 'Content Writer', budget: '$20-30/hr', description: 'Seeking a content writer for our tech blog. Must have experience in writing about mobile technologies.' },
];

const HomeScreen = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.jobItem}
      onPress={() => navigation.navigate('JobDetails', { job: item })}
    >
      <Text style={styles.jobTitle}>{item.title}</Text>
      <Text style={styles.jobDescription} numberOfLines={2}>{item.description}</Text>
      <Text style={styles.jobBudget}>{item.budget}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <SearchBar placeholder="Search jobs..." onChangeText={() => {}} />
      <Text style={styles.header}>Welcome to GoodPeople</Text>
      <Text style={styles.subHeader}>Recent Job Postings</Text>
      <FlatList
        data={dummyJobs}
        renderItem={renderItem}
        keyExtractor={item => item.id}
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
    marginBottom: 10,
    color: colors.text,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: colors.secondary,
  },
  jobItem: {
    backgroundColor: colors.background,
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 5,
  },
  jobDescription: {
    fontSize: 14,
    color: colors.textLight,
    marginBottom: 5,
  },
  jobBudget: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: 'bold',
  },
});

export default HomeScreen;