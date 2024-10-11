import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../styles/colors';

const dummyMessages = [
  { id: '1', sender: 'John Doe', lastMessage: "Hi, I'm interested in your proposal.", time: '10:30 AM', unread: 2 },
  { id: '2', sender: 'Jane Smith', lastMessage: 'Can you provide more details about your experience?', time: '11:45 AM', unread: 0 },
  { id: '3', sender: 'Mike Johnson', lastMessage: 'Your portfolio looks great!', time: '2:15 PM', unread: 1 },
];

const MessagesScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.messageItem}
      onPress={() => navigation.navigate('ChatScreen', { sender: item.sender })}
    >
      <View style={styles.avatarContainer}>
        <Text style={styles.avatarText}>{item.sender[0]}</Text>
      </View>
      <View style={styles.messageContent}>
        <View style={styles.messageHeader}>
          <Text style={styles.sender}>{item.sender}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
        <Text style={styles.lastMessage} numberOfLines={1}>
          {item.lastMessage}
        </Text>
      </View>
      {item.unread > 0 && (
        <View style={styles.unreadBadge}>
          <Text style={styles.unreadText}>{item.unread}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  const filteredMessages = dummyMessages.filter(message =>
    message.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
    message.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Messages</Text>
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color={colors.textLight} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search messages..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <FlatList
        data={filteredMessages}
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: colors.text,
  },
  messageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  avatarText: {
    color: colors.background,
    fontSize: 20,
    fontWeight: 'bold',
  },
  messageContent: {
    flex: 1,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  sender: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
  },
  time: {
    fontSize: 12,
    color: colors.textLight,
  },
  lastMessage: {
    fontSize: 14,
    color: colors.textLight,
  },
  unreadBadge: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadText: {
    color: colors.background,
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default MessagesScreen;