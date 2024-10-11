import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView, Image, TextInput, Modal } from 'react-native';
// ... (other imports)

const ProfileScreen = ({ navigation }) => {
  // ... (existing state variables)
  const [portfolio, setPortfolio] = useState([
    { id: '1', title: 'E-commerce Website', description: 'A fully functional online store built with React and Node.js', image: 'https://example.com/portfolio1.jpg' },
    { id: '2', title: 'Mobile App UI Design', description: 'User interface design for a fitness tracking app', image: 'https://example.com/portfolio2.jpg' },
  ]);
  const [showPortfolioModal, setShowPortfolioModal] = useState(false);
  const [newPortfolioItem, setNewPortfolioItem] = useState({ title: '', description: '', image: '' });

  // ... (existing functions)

  const addPortfolioItem = () => {
    if (newPortfolioItem.title && newPortfolioItem.description && newPortfolioItem.image) {
      setPortfolio([...portfolio, { ...newPortfolioItem, id: String(portfolio.length + 1) }]);
      setNewPortfolioItem({ title: '', description: '', image: '' });
      setShowPortfolioModal(false);
    } else {
      Alert.alert('Error', 'Please fill in all fields');
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* ... (existing profile content) */}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Portfolio</Text>
        {portfolio.map((item) => (
          <View key={item.id} style={styles.portfolioItem}>
            <Image source={{ uri: item.image }} style={styles.portfolioImage} />
            <View style={styles.portfolioContent}>
              <Text style={styles.portfolioTitle}>{item.title}</Text>
              <Text style={styles.portfolioDescription}>{item.description}</Text>
            </View>
          </View>
        ))}
        <TouchableOpacity style={styles.addButton} onPress={() => setShowPortfolioModal(true)}>
          <Text style={styles.addButtonText}>Add Portfolio Item</Text>
        </TouchableOpacity>
      </View>

      {/* ... (existing buttons) */}

      <Modal
        visible={showPortfolioModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowPortfolioModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Portfolio Item</Text>
            <TextInput
              style={styles.input}
              placeholder="Title"
              value={newPortfolioItem.title}
              onChangeText={(text) => setNewPortfolioItem({ ...newPortfolioItem, title: text })}
            />
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Description"
              value={newPortfolioItem.description}
              onChangeText={(text) => setNewPortfolioItem({ ...newPortfolioItem, description: text })}
              multiline
            />
            <TextInput
              style={styles.input}
              placeholder="Image URL"
              value={newPortfolioItem.image}
              onChangeText={(text) => setNewPortfolioItem({ ...newPortfolioItem, image: text })}
            />
            <TouchableOpacity style={styles.addButton} onPress={addPortfolioItem}>
              <Text style={styles.addButtonText}>Add Item</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  // ... (existing styles)
  portfolioItem: {
    flexDirection: 'row',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    overflow: 'hidden',
  },
  portfolioImage: {
    width: 100,
    height: 100,
  },
  portfolioContent: {
    flex: 1,
    padding: 10,
  },
  portfolioTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 5,
  },
  portfolioDescription: {
    fontSize: 14,
    color: colors.textLight,
  },
  addButton: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonText: {
    color: colors.background,
    fontSize: 16,
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
    marginBottom: 15,
    color: colors.text,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    color: colors.text,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
});

export default ProfileScreen;