import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../app new/GoodPeople/styles/colors';

const ReviewScreen = ({ route, navigation }) => {
  const { jobTitle, freelancerName } = route.params;
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  const handleSubmitReview = () => {
    if (rating === 0) {
      Alert.alert('Error', 'Please select a rating');
      return;
    }

    if (review.trim() === '') {
      Alert.alert('Error', 'Please write a review');
      return;
    }

    // Here you would typically send the review data to your backend
    console.log('Submitting review:', { rating, review });
    Alert.alert('Success', 'Your review has been submitted!');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Review for {jobTitle}</Text>
      <Text style={styles.subHeader}>Freelancer: {freelancerName}</Text>

      <View style={styles.ratingContainer}>
        <Text style={styles.ratingLabel}>Rating:</Text>
        <View style={styles.starsContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity key={star} onPress={() => setRating(star)}>
              <Icon
                name={star <= rating ? 'star' : 'star-outline'}
                size={30}
                color={colors.primary}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <Text style={styles.reviewLabel}>Write your review:</Text>
      <TextInput
        style={styles.reviewInput}
        multiline
        numberOfLines={4}
        value={review}
        onChangeText={setReview}
        placeholder="Share your experience working with this freelancer..."
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmitReview}>
        <Text style={styles.submitButtonText}>Submit Review</Text>
      </TouchableOpacity>
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
    marginBottom: 20,
    color: colors.textLight,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  ratingLabel: {
    fontSize: 18,
    marginRight: 10,
    color: colors.text,
  },
  starsContainer: {
    flexDirection: 'row',
  },
  reviewLabel: {
    fontSize: 18,
    marginBottom: 10,
    color: colors.text,
  },
  reviewInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    color: colors.text,
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
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ReviewScreen;