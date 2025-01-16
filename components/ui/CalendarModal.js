import React from 'react';
import {Modal, View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {Calendar} from 'react-native-calendars';

const CalendarModal = ({visible, onClose, onSelectDate, selectedDate}) => {
  const handleDayPress = day => {
    onSelectDate(day.dateString);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.calendarContainer}>
          <Calendar
            onDayPress={handleDayPress}
            markedDates={{
              [selectedDate]: {selected: true, selectedColor: '#8B5CF6'},
            }}
            theme={{
              backgroundColor: '#1A1A1A',
              calendarBackground: '#1A1A1A',
              textSectionTitleColor: '#fff',
              selectedDayBackgroundColor: '#8B5CF6',
              selectedDayTextColor: '#fff',
              todayTextColor: '#8B5CF6',
              dayTextColor: '#fff',
              textDisabledColor: '#444',
              monthTextColor: '#fff',
              arrowColor: '#8B5CF6',
            }}
          />
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  calendarContainer: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 20,
    width: '90%',
  },
  closeButton: {
    marginTop: 15,
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#2A2A2A',
    borderRadius: 8,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default CalendarModal;
