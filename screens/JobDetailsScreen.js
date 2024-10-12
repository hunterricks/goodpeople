import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../styles/colors';

const JobDetailsScreen = ({ route, navigation }) => {
  const { job } = route.params;
  const [showBidModal, setShowBidModal] = useState(false);
  const [bidAmount, setBidAmount] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('');
  const [coverLetter, setCoverLetter] = useState('');

  const handleSubmitBid = () => {
    if (!bidAmount || !deliveryTime || !coverLetter) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    // Here you would typically send the bid data to your backend
    console.log('Submitting bid:', { bidAmount, deliveryTime, coverLetter });
    Alert.alert('Success', 'Your bid has been submitted!');
    setShowBidModal(false);
    navigation.navigate('Proposals');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{job.title}</Text>
      <Text style={styles.budget}>{job.budget}</Text>
      <Text style={styles.category}>{job.category}</Text>
      
      <View style={styles.clientInfo}>
        <Icon name="person-circle-outline" size={24} color={colors.text} />
        <View style={styles.clientDetails}>
          <Text style={styles.clientName}>{job.clientName}</Text>
          <Text style={styles.clientLocation}>{job.clientLocation}</Text>
        </View>
        <Text style={styles.postedDate}>Posted {job.postedDate}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Job Description</Text>
        <Text style={styles.description}>{job.description}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Skills Required</Text>
        <View style={styles.skillsContainer}>
          {job.skills.map((skill, index) => (
            <View key={index} style={styles.skillItem}>
              <Text style={styles.skillText}>{skill}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Job Details</Text>
        <View style={styles.detailItem}>
          <Icon name="briefcase-outline" size={20} color={colors.text} />
          <Text style={styles.detailText}>Project Type: {job.projectType}</Text>
        </View>
        <View style={styles.detailItem}>
          <Icon name="star-outline" size={20} color={colors.text} />
          <Text style={styles.detailText}>Experience Level: {job.experienceLevel}</Text>
        </View>
        <View style={styles.detailItem}>
          <Icon name="time-outline" size={20} color={colors.text} />
          <Text style={styles.detailText}>Duration: {job.duration}</Text>
        </View>
        <View style={styles.detailItem}>
          <Icon name="cash-outline" size={20} color={colors.text} />
          <Text style={styles.detailText}>Budget: {job.budget}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.bidButton} onPress={() => setShowBidModal(true)}>
        <Text style={styles.bidButtonText}>Submit a Proposal</Text>
      </TouchableOpacity>

      <Modal
        visible={showBidModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowBidModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Submit a Proposal</Text>
            <TextInput
              style={styles.input}
              placeholder="Bid Amount ($)"
              value={bidAmount}
              onChangeText={setBidAmount}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Delivery Time (e.g., 5 days)"
              value={deliveryTime}
              onChangeText={setDeliveryTime}
            />
            <TextInput
              style={[styles.input, styles.coverLetterInput]}
              placeholder="Cover Letter"
              value={coverLetter}
              onChangeText={setCoverLetter}
              multiline
            />
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmitBid}>
              <Text style={styles.submitButtonText}>Submit Proposal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  // ... (keep existing styles)
  clientDetails: {
    flex: 1,
    marginLeft: 10,
  },
  postedDate: {
    fontSize: 12,
    color: colors.textLight,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  detailText: {
    fontSize: 14,
    color: colors.text,
    marginLeft: 10,
  },
});

export default JobDetailsScreen;