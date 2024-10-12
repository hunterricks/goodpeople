import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../app new/GoodPeople/styles/colors';

const PaymentScreen = () => {
  const [transactions, setTransactions] = useState([
    { id: '1', type: 'Received', amount: 500, date: '2023-05-15', status: 'Completed' },
    { id: '2', type: 'Sent', amount: 200, date: '2023-05-10', status: 'Pending' },
  ]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newAmount, setNewAmount] = useState('');
  const [newType, setNewType] = useState('Sent');

  const renderTransaction = ({ item }) => (
    <View style={styles.transactionItem}>
      <Icon
        name={item.type === 'Received' ? 'arrow-down-circle' : 'arrow-up-circle'}
        size={24}
        color={item.type === 'Received' ? colors.success : colors.primary}
      />
      <View style={styles.transactionDetails}>
        <Text style={styles.transactionType}>{item.type}</Text>
        <Text style={styles.transactionDate}>{item.date}</Text>
      </View>
      <Text style={styles.transactionAmount}>
        ${item.amount}
      </Text>
      <Text style={[
        styles.transactionStatus,
        item.status === 'Completed' ? styles.statusCompleted : styles.statusPending
      ]}>
        {item.status}
      </Text>
    </View>
  );

  const addTransaction = () => {
    if (newAmount.trim() === '') return;
    const newTransaction = {
      id: String(transactions.length + 1),
      type: newType,
      amount: parseFloat(newAmount),
      date: new Date().toISOString().split('T')[0],
      status: 'Pending',
    };
    setTransactions([newTransaction, ...transactions]);
    setNewAmount('');
    setShowAddModal(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Payments</Text>
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceLabel}>Current Balance:</Text>
        <Text style={styles.balanceAmount}>$1,500.00</Text>
      </View>
      <FlatList
        data={transactions}
        renderItem={renderTransaction}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => setShowAddModal(true)}>
        <Icon name="add" size={24} color={colors.background} />
        <Text style={styles.addButtonText}>Add Transaction</Text>
      </TouchableOpacity>

      <Modal
        visible={showAddModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowAddModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Transaction</Text>
            <TextInput
              style={styles.input}
              value={newAmount}
              onChangeText={setNewAmount}
              placeholder="Amount"
              keyboardType="numeric"
            />
            <View style={styles.typeSelector}>
              <TouchableOpacity
                style={[styles.typeButton, newType === 'Sent' && styles.selectedType]}
                onPress={() => setNewType('Sent')}
              >
                <Text style={[styles.typeButtonText, newType === 'Sent' && styles.selectedTypeText]}>Send</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.typeButton, newType === 'Received' && styles.selectedType]}
                onPress={() => setNewType('Received')}
              >
                <Text style={[styles.typeButtonText, newType === 'Received' && styles.selectedTypeText]}>Receive</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.addTransactionButton} onPress={addTransaction}>
              <Text style={styles.addTransactionButtonText}>Add Transaction</Text>
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
  balanceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.primary,
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  balanceLabel: {
    fontSize: 18,
    color: colors.background,
  },
  balanceAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.background,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  transactionDetails: {
    flex: 1,
    marginLeft: 10,
  },
  transactionType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
  },
  transactionDate: {
    fontSize: 12,
    color: colors.textLight,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
  },
  transactionStatus: {
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  statusCompleted: {
    color: colors.success,
  },
  statusPending: {
    color: colors.warning,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  addButtonText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
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
  typeSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  typeButton: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    alignItems: 'center',
  },
  selectedType: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  typeButtonText: {
    color: colors.text,
  },
  selectedTypeText: {
    color: colors.background,
  },
  addTransactionButton: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  addTransactionButtonText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PaymentScreen;