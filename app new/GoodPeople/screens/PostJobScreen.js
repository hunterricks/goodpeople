import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { colors } from '../styles/colors';
import { JOB_CATEGORIES, SKILLS } from '../utils/constants';

const PostJobScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [budget, setBudget] = useState('');
  const [skills, setSkills] = useState([]);

  const handlePostJob = () => {
    if (!title || !description || !category || !budget || skills.length === 0) {
      Alert.alert('Error', 'Please fill in all fields and select at least one skill.');
      return;
    }

    // Here you would typically send the job data to your backend
    console.log({ title, description, category, budget, skills });
    Alert.alert('Success', 'Job posted successfully!');
    navigation.goBack();
  };

  const toggleSkill = (skill) => {
    if (skills.includes(skill)) {
      setSkills(skills.filter(s => s !== skill));
    } else {
      setSkills([...skills, skill]);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Post a New Job</Text>
      
      <Text style={styles.label}>Job Title</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter job title"
      />

      <Text style={styles.label}>Job Description</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter job description"
        multiline
        numberOfLines={4}
      />

      <Text style={styles.label}>Category</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={category}
          onValueChange={(itemValue) => setCategory(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select a category" value="" />
          {JOB_CATEGORIES.map((cat, index) => (
            <Picker.Item key={index} label={cat} value={cat} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Budget</Text>
      <TextInput
        style={styles.input}
        value={budget}
        onChangeText={setBudget}
        placeholder="Enter budget (e.g., $500 or $20-30/hr)"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Required Skills</Text>
      <View style={styles.skillsContainer}>
        {SKILLS.map((skill, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.skillItem, skills.includes(skill) && styles.selectedSkill]}
            onPress={() => toggleSkill(skill)}
          >
            <Text style={[styles.skillText,skills.includes(skill) && styles.selectedSkillText]}>{skill}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.postButton} onPress={handlePostJob}>
        <Text style={styles.postButtonText}>Post Job</Text>
      </TouchableOpacity>
    </ScrollView>
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
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: colors.text,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    color: colors.text,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 5,
    marginBottom: 15,
  },
  picker: {
    color: colors.text,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  skillItem: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  selectedSkill: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  skillText: {
    color: colors.text,
  },
  selectedSkillText: {
    color: colors.background,
  },
  postButton: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  postButtonText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PostJobScreen;