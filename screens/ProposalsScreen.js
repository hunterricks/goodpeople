import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { colors } from '../styles/colors';

const dummyProposals = [
  { id: '1', jobTitle: 'React Native Developer', status: 'Submitted', date: '2023-05-15' },
  { id: '2', jobTitle: 'UI/UX Designer', status: 'Interviewing', date: '2023-05-10' },
  { id: '3', jobTitle: 'Content Writer', status: 'Rejected', date: '2023-05-05' },
];

const ProposalsScreen = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.proposalItem}
      onPress={() => navigation.navigate('ProposalDetails', { proposal: item })}
    >
      <Text style={styles.jobTitle}>{item.jobTitle}</Text>
      <Text style={[styles.status, { color: getStatusColor(item.status) }]}>
        Status: {item.status}
      </Text>
      <Text style={styles.date}>Submitted: {item.date}</Text>
    </TouchableOpacity>
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'Submitted':
        return colors.primary;
      case 'Interviewing':
        return colors.secondary;
      case 'Rejected':
        return colors.error;
      default:
        return colors.text;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Proposals</Text>
      <FlatList
        data={dummyProposals}
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
    marginBottom: 20,
    color: colors.text,
  },
  proposalItem: {
    backgroundColor: colors.background,
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 5,
  },
  status: {
    fontSize: 14,
    marginBottom: 5,
  },
  date: {
    fontSize: 14,
    color: colors.textLight,
  },
});

export default ProposalsScreen;