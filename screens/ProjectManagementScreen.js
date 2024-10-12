import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, TextInput, Switch } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../styles/colors';

const ProjectManagementScreen = () => {
  const [projects, setProjects] = useState([
    { id: '1', title: 'Web App Development', status: 'In Progress', milestones: [
      { id: '1', title: 'Frontend Design', completed: true },
      { id: '2', title: 'Backend Integration', completed: false },
    ]},
    { id: '2', title: 'Mobile App Design', status: 'Completed', milestones: [
      { id: '1', title: 'UI/UX Design', completed: true },
      { id: '2', title: 'Prototype', completed: true },
    ]},
  ]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProjectTitle, setNewProjectTitle] = useState('');
  const [showMilestoneModal, setShowMilestoneModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [newMilestoneTitle, setNewMilestoneTitle] = useState('');

  const renderProject = ({ item }) => (
    <View style={styles.projectItem}>
      <Text style={styles.projectTitle}>{item.title}</Text>
      <Text style={styles.projectStatus}>{item.status}</Text>
      <Text style={styles.milestonesHeader}>Milestones:</Text>
      {item.milestones.map((milestone) => (
        <View key={milestone.id} style={styles.milestoneItem}>
          <Switch
            value={milestone.completed}
            onValueChange={() => toggleMilestone(item.id, milestone.id)}
          />
          <Text style={[
            styles.milestoneTitle,
            milestone.completed && styles.completedMilestone
          ]}>{milestone.title}</Text>
        </View>
      ))}
      <TouchableOpacity
        style={styles.addMilestoneButton}
        onPress={() => {
          setSelectedProject(item);
          setShowMilestoneModal(true);
        }}
      >
        <Text style={styles.addMilestoneButtonText}>Add Milestone</Text>
      </TouchableOpacity>
    </View>
  );

  const addProject = () => {
    if (newProjectTitle.trim() === '') return;
    const newProject = {
      id: String(projects.length + 1),
      title: newProjectTitle,
      status: 'Not Started',
      milestones: [],
    };
    setProjects([...projects, newProject]);
    setNewProjectTitle('');
    setShowAddModal(false);
  };

  const addMilestone = () => {
    if (newMilestoneTitle.trim() === '') return;
    const updatedProjects = projects.map(project => {
      if (project.id === selectedProject.id) {
        return {
          ...project,
          milestones: [
            ...project.milestones,
            {
              id: String(project.milestones.length + 1),
              title: newMilestoneTitle,
              completed: false,
            }
          ]
        };
      }
      return project;
    });
    setProjects(updatedProjects);
    setNewMilestoneTitle('');
    setShowMilestoneModal(false);
  };

  const toggleMilestone = (projectId, milestoneId) => {
    const updatedProjects = projects.map(project => {
      if (project.id === projectId) {
        const updatedMilestones = project.milestones.map(milestone => {
          if (milestone.id === milestoneId) {
            return { ...milestone, completed: !milestone.completed };
          }
          return milestone;
        });
        return { ...project, milestones: updatedMilestones };
      }
      return project;
    });
    setProjects(updatedProjects);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Project Management</Text>
      <FlatList
        data={projects}
        renderItem={renderProject}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => setShowAddModal(true)}>
        <Icon name="add" size={24} color={colors.background} />
        <Text style={styles.addButtonText}>Add New Project</Text>
      </TouchableOpacity>

      <Modal
        visible={showAddModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowAddModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Project</Text>
            <TextInput
              style={styles.input}
              value={newProjectTitle}
              onChangeText={setNewProjectTitle}
              placeholder="Project Title"
            />
            <TouchableOpacity style={styles.addProjectButton} onPress={addProject}>
              <Text style={styles.addProjectButtonText}>Add Project</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        visible={showMilestoneModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowMilestoneModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Milestone</Text>
            <TextInput
              style={styles.input}
              value={newMilestoneTitle}
              onChangeText={setNewMilestoneTitle}
              placeholder="Milestone Title"
            />
            <TouchableOpacity style={styles.addProjectButton} onPress={addMilestone}>
              <Text style={styles.addProjectButtonText}>Add Milestone</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  // ... (keep existing styles)
  completedMilestone: {
    textDecorationLine: 'line-through',
    color: colors.textLight,
  },
  addMilestoneButton: {
    backgroundColor: colors.secondary,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  addMilestoneButtonText: {
    color: colors.background,
    textAlign: 'center',
  },
});

export default ProjectManagementScreen;
