import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../styles/colors';

const dummyMessages = [
  { id: '1', sender: 'John Doe', message: "Hi, I'm interested in your proposal.", time: '10:30 AM' },
  { id: '2', sender: 'Me', message: 'Thank you for your interest! What would you like to know?', time: '10:35 AM' },
  { id: '3', sender: 'John Doe', message: 'Can you tell me more about your experience with React Native?', time: '10:40 AM' },
];

const ChatScreen = ({ route }) => {
  const { sender } = route.params;
  const [messages, setMessages] = useState(dummyMessages);
  const [newMessage, setNewMessage] = useState('');

  const renderMessage = ({ item }) => (
    <View style={[styles.messageContainer, item.sender === 'Me' ? styles.myMessage : styles.theirMessage]}>
      <Text style={styles.messageText}>{item.message}</Text>
      <Text style={styles.messageTime}>{item.time}</Text>
    </View>
  );

  const sendMessage = () => {
    if (newMessage.trim() === '') return;

    const message = {
      id: String(messages.length + 1),
      sender: 'Me',
      message: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <Text style={styles.header}>{sender}</Text>
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.messageList}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Type a message..."
          placeholderTextColor={colors.textLight}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Icon name="send" size={24} color={colors.background} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  messageList: {
    padding: 15,
  },
  messageContainer: {
    maxWidth: '80%',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: colors.primary,
  },
  theirMessage: {
    alignSelf: 'flex-start',
    backgroundColor: colors.border,
  },
  messageText: {
    color: colors.text,
    fontSize: 16,
  },
  messageTime: {
    color: colors.textLight,
    fontSize: 12,
    marginTop: 5,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  input: {
    flex: 1,
    backgroundColor: colors.background,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: colors.border,
    color: colors.text,
  },
  sendButton: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ChatScreen;