import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, TextInput, Switch } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../styles/colors';
import SearchBar from '../components/SearchBar';
import { JOB_CATEGORIES, SKILLS } from '../utils/constants';

const JobsScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [minBudget, setMinBudget] = useState('');
  const [maxBudget, setBudgetMax] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [onlyVerifiedClients, setOnlyVerifiedClients] = useState(false);

  // ... (keep existing code for renderItem and other functions)

  const applyFilters = () => {
    // Apply filters logic here
    setShowFilters(false);
  };

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
      
      {/* ... (keep existing FlatList for job listings) */}

      <Modal
        visible={showFilters}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowFilters(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Advanced Filters</Text>
            
            <Text style={styles.filterLabel}>Category</Text>
            <FlatList
              data={['All', ...JOB_CATEGORIES]}
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

            <Text style={styles.filterLabel}>Skills</Text>
            <FlatList
              data={SKILLS}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.filterItem, selectedSkills.includes(item) && styles.selectedFilterItem]}
                  onPress={() => {
                    if (selectedSkills.includes(item)) {
                      setSelectedSkills(selectedSkills.filter(skill => skill !== item));
                    } else {
                      setSelectedSkills([...selectedSkills, item]);
                    }
                  }}
                >
                  <Text style={[styles.filterItemText, selectedSkills.includes(item) && styles.selectedFilterItemText]}>{item}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={item => item}
            />

            <Text style={styles.filterLabel}>Budget Range</Text>
            <View style={styles.budgetInputContainer}>
              <TextInput
                style={styles.budgetInput}
                placeholder="Min"
                value={minBudget}
                onChangeText={setMinBudget}
                keyboardType="numeric"
              />
              <Text style={styles.budgetSeparator}>-</Text>
              <TextInput
                style={styles.budgetInput}
                placeholder="Max"
                value={maxBudget}
                onChangeText={setBudgetMax}
                keyboardType="numeric"
              />
            </View>

            <Text style={styles.filterLabel}>Sort By</Text>
            <View style={styles.sortByContainer}>
              {['newest', 'oldest', 'highest budget', 'lowest budget'].map((item) => (
                <TouchableOpacity
                  key={item}
                  style={[styles.sortByItem, sortBy === item && styles.selectedSortByItem]}
                  onPress={() => setSortBy(item)}
                >
                  <Text style={[styles.sortByItemText, sortBy === item && styles.selectedSortByItemText]}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.switchContainer}>
              <Text style={styles.switchLabel}>Only Verified Clients</Text>
              <Switch
                value={onlyVerifiedClients}
                onValueChange={setOnlyVerifiedClients}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={onlyVerifiedClients ? colors.background : colors.textLight}
              />
            </View>

            <TouchableOpacity style={styles.applyButton} onPress={applyFilters}>
              <Text style={styles.applyButtonText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  // ... (keep existing styles)
  budgetInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  budgetInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  budgetSeparator: {
    marginHorizontal: 10,
  },
  sortByContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  sortByItem: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  selectedSortByItem: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  sortByItemText: {
    color: colors.text,
  },
  selectedSortByItemText: {
    color: colors.background,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  switchLabel: {
    fontSize: 16,
    color: colors.text,
  },
});

export default JobsScreen;
