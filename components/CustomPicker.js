import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';

const CustomPicker = ({ items, selectedValue, onValueChange, style }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity 
        style={styles.selectedValueContainer}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.selectedValueText}>
          {items.find(item => item.value === selectedValue)?.label || 'Selecione...'}
        </Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.pickerContainer}>
            {items.map((item) => (
              <TouchableOpacity
                key={item.value}
                style={styles.option}
                onPress={() => {
                  onValueChange(item.value);
                  setModalVisible(false);
                }}
              >
                <Text style={styles.optionText}>{item.label}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  selectedValueContainer: {
    backgroundColor: '#2a2a2a',
    padding: 15,
    borderRadius: 10,
  },
  selectedValueText: {
    color: '#ffffff',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  pickerContainer: {
    backgroundColor: '#1a1a1a',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '50%',
  },
  option: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a2a',
  },
  optionText: {
    color: '#ffffff',
    fontSize: 16,
  },
  cancelButton: {
    marginTop: 10,
    padding: 15,
    alignItems: 'center',
    backgroundColor: '#4a6da7',
    borderRadius: 10,
  },
  cancelButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default CustomPicker;