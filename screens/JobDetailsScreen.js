import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../styles/colors';

const JobDetailsScreen = ({ route, navigation }) => {
  const { job } = route.params;
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const [proposedRate, setProposedRate] = useState('');

  const handleSubmitApplication = () => {
    // Here you would typically send the application data to your backend
    console.log('Submitting application:', { coverLetter, proposedRate });
    setShowApplicationModal(false);
    navigation.navigate('Proposals');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{job.title}</Text>
      <Text style={styles.budget}>{job.budget}</Text>
      <Text style={styles.category}>{job.category}</Text>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Job Description</Text>
        <Text style={styles.description}>{job.description}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Skills Required</Text>
        <View style={styles.skillsContainer}>
          {['React Native', 'JavaScript', 'Mobile Development'].map((skill, index) => (
            <View key={index} style={styles.skillItem}>
              <Text style={styles.skillText}>{skill}</Text>
            </View>
          ))}
        </View>
      </View>
      <TouchableOpacity style={styles.applyButton} onPress={() => setShowApplicationModal(true)}>
        <Text style={styles.applyButtonText}>Apply Now</Text>
      </TouchableOpacity>

      <Modal
        visible={showApplicationModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowApplicationModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Submit Proposal</Text>
            <TextInput
              style={styles.input}
              placeholder="Proposed Rate ($/hr)"
              value={proposedRate}
              onChangeText={setProposedRate}
              keyboardType="numeric"
            />
            <TextInput
              style={[styles.input, styles.coverLetterInput]}
              placeholder="Cover Letter"
              value={coverLetter}
              onChangeText={setCoverLetter}
              multiline
            />
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmitApplication}>
              <Text style={styles.submitButtonText}>Submit Proposal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 10,
  },
  budget: {
    fontSize: 18,
    color: colors.primary,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  category: {
    fontSize: 16,
    color: colors.secondary,
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillItem: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  skillText: {
    color: colors.background,
    fontSize: 14,
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
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: colors.background,
    borderRadius: 8,
    padding: 20,
    width: '90%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    color: colors.text,
  },
  coverLetterInput: {
    height: 150,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default JobDetailsScreen;