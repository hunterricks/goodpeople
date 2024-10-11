import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../styles/colors';
import SearchBar from '../components/SearchBar';

const dummyJobs = [
  { id: '1', title: 'React Native Developer', description: 'We need a skilled React Native developer for a 3-month project.', budget: '$30-50/hr', category: 'Mobile Development' },
  { id: '2', title: 'UI/UX Designer', description: 'Looking for a creative UI/UX designer to redesign our mobile app.', budget: '$1000-2000', category: 'Design' },
  { id: '3', title: 'Content Writer', description: 'Seeking a content writer for our tech blog. Must have experience in writing about mobile technologies.', budget: '$20-30/hr', category: 'Writing' },
  { id: '4', title: 'Web Developer', description: 'Full-stack web developer needed for an e-commerce project.', budget: '$40-60/hr', category: 'Web Development' },
  { id: '5', title: 'Data Scientist', description: 'Experienced data scientist required for a machine learning project.', budget: '$50-70/hr', category: 'Data Science' },
];

const categories = ['All', 'Mobile Development', 'Design', 'Writing', 'Web Development', 'Data Science'];
const budgetRanges = ['All', '$0-$30', '$30-$50', '$50-$100', '$100+'];

const JobsScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBudgetRange, setSelectedBudgetRange] = useState('All');
  const [showFilters, setShowFilters] = useState(false);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.jobItem}
      onPress={() => navigation.navigate('JobDetails', { job: item })}
    >
      <Text style={styles.jobTitle}>{item.title}</Text>
      <Text style={styles.jobDescription} numberOfLines={2}>{item.description}</Text>
      <Text style={styles.jobCategory}>{item.category}</Text>
      <Text style={styles.jobBudget}>{item.budget}</Text>
    </TouchableOpacity>
  );

  const filterJobs = (job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || job.category === selectedCategory;
    const matchesBudget = selectedBudgetRange === 'All' || matchBudgetRange(job.budget, selectedBudgetRange);
    return matchesSearch && matchesCategory && matchesBudget;
  };

  const matchBudgetRange = (jobBudget, range) => {
    const budgetValue = parseInt(jobBudget.replace(/[^0-9]/g, ''));
    switch (range) {
      case '$0-$30': return budgetValue <= 30;
      case '$30-$50': return budgetValue > 30 && budgetValue <= 50;
      case '$50-$100': return budgetValue > 50 && budgetValue <= 100;
      case '$100+': return budgetValue > 100;
      default: return true;
    }
  };

  const filteredJobs = dummyJobs.filter(filterJobs);

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Search jobs..."
        onChangeText={setSearchQuery}
      />
      <TouchableOpacity style={styles.filterButton} onPress={() => setShowFilters(true)}>
        <Icon name="options-outline" size={24} color={colors.primary} />
        <Text style={styles.filterButtonText}>Filters</Text>
      </TouchableOpacity>
      <Text style={styles.header}>Available Jobs</Text>
      <FlatList
        data={filteredJobs}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <Modal
        visible={showFilters}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowFilters(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filter Jobs</Text>
            <Text style={styles.filterLabel}>Category</Text>
            <FlatList
              data={categories}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.filterItem, selectedCategory === item && styles.selectedFilterItem]}
                  onPress={() => setSelectedCategory(item)}
                >
                  <Text style={[styles.filterItemText, selectedCategory === item && styles.selectedFilterItemText]}>{item}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={item => item}
            />
            <Text style={styles.filterLabel}>Budget Range</Text>
            <FlatList
              data={budgetRanges}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.filterItem, selectedBudgetRange === item && styles.selectedFilterItem]}
                  onPress={() => setSelectedBudgetRange(item)}
                >
                  <Text style={[styles.filterItemText, selectedBudgetRange === item && styles.selectedFilterItemText]}>{item}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={item => item}
            />
            <TouchableOpacity style={styles.applyButton} onPress={() => setShowFilters(false)}>
              <Text style={styles.applyButtonText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  jobItem: {
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
  jobDescription: {
    fontSize: 14,
    color: colors.textLight,
    marginBottom: 5,
  },
  jobCategory: {
    fontSize: 14,
    color: colors.secondary,
    marginBottom: 5,
  },
  jobBudget: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: 'bold',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  filterButtonText: {
    marginLeft: 5,
    color: colors.primary,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: colors.text,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: colors.text,
  },
  filterItem: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: 10,
    marginBottom: 10,
  },
  selectedFilterItem: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterItemText: {
    color: colors.text,
  },
  selectedFilterItemText: {
    color: colors.background,
  },
  applyButton: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  applyButtonText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default JobsScreen;