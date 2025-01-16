import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

const DurationPicker = ({ value, onChange }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const durations = [5, 10, 15, 20, 25, 30, 45, 60];

  return (
    <>
      <TouchableOpacity
        style={styles.durationButton}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.durationButtonText}>
          {value ? `${value} minutes` : 'Select duration'}
        </Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Duration</Text>
            
            <ScrollView style={styles.durationList}>
              {durations.map((duration) => (
                <TouchableOpacity
                  key={duration}
                  style={[
                    styles.durationOption,
                    value === duration && styles.selectedDuration,
                  ]}
                  onPress={() => {
                    onChange(duration);
                    setModalVisible(false);
                  }}>
                  <Text
                    style={[
                      styles.durationOptionText,
                      value === duration && styles.selectedDurationText,
                    ]}>
                    {duration} minutes
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  durationButton: {
    backgroundColor: '#231D37',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  durationButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 20,
    width: '80%',
    maxHeight: '70%',
  },
  modalTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  durationList: {
    marginBottom: 20,
  },
  durationOption: {
    padding: 15,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: '#231D37',
  },
  selectedDuration: {
    backgroundColor: '#00FF7F',
  },
  durationOptionText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  selectedDurationText: {
    color: '#000',
    fontWeight: 'bold',
  },
  cancelButton: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#FF0000',
    fontSize: 16,
  },
});

export default DurationPicker;