import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {usePracticeContext} from '../../store/context';
import Slider from '@react-native-community/slider';
import {launchImageLibrary} from 'react-native-image-picker';
import CalendarModal from '../../components/ui/CalendarModal';

const CreateMood = ({navigation}) => {
  const {addMoodNote} = usePracticeContext(); // Get the function to add mood notes
  const [heading, setHeading] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [mood, setMood] = useState(0); // Mood slider value
  const [image, setImage] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);

  // Function to handle image picking
  const handleImagePick = async () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    try {
      const result = await launchImageLibrary(options);
      if (result.assets && result.assets[0]) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  const handleSave = () => {
    const moodText = getMoodText(mood);
    const newMoodNote = {
      heading,
      description,
      date,
      mood,
      moodText,
      image,
    };
    addMoodNote(newMoodNote);
    navigation.goBack();
  };
  const getMoodText = value => {
    if (value <= 0.2) return 'Sadness';
    if (value <= 0.4) return 'Sad';
    if (value <= 0.6) return 'Neutral';
    if (value <= 0.8) return 'Happiness';
    return 'Happiness';
  };
  const handleDateSelect = selectedDate => {
    // Convert YYYY-MM-DD to DD.MM.YYYY
    const [year, month, day] = selectedDate.split('-');
    setDate(`${day}.${month}.${year}`);
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>{'<'} Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Mood of the day</Text>

      <Text style={styles.moodLabel}>Heading</Text>
      <TextInput
        style={styles.input}
        placeholder="Task name"
        value={heading}
        onChangeText={setHeading}
        placeholderTextColor={'#FFFFFF' + 90}
      />

      <Text style={styles.moodLabel}>Description</Text>
      <TextInput
        style={styles.input}
        placeholder="Task description"
        value={description}
        onChangeText={setDescription}
        placeholderTextColor={'#FFFFFF' + 90}
      />

      <Text style={styles.dateLabel}>Date</Text>
      <TouchableOpacity
        style={styles.dateInput}
        onPress={() => setShowCalendar(true)}>
        <Text style={styles.calendarIcon}>📅</Text>
        <Text style={styles.dateText}>{date || 'Select date'}</Text>
      </TouchableOpacity>

      <Text style={styles.moodLabel}>Mood</Text>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={1}
        minimumTrackTintColor="#8B5CF6"
        maximumTrackTintColor="#393158"
        value={mood}
        onValueChange={setMood}
        thumbTintColor="#4D81F9"
        // trackThickness={5}
        // thumbSize={52}
      />
      <Text style={styles.moodText}>{getMoodText(mood)}</Text>

      <TouchableOpacity style={styles.imageButton} onPress={handleImagePick}>
        <Text style={styles.imageButtonText}>Add Image</Text>
      </TouchableOpacity>

      {image && (
        <View style={styles.imageContainer}>
          <Image source={{uri: image}} style={styles.selectedImage} />
          <TouchableOpacity
            onPress={() => setImage(null)}
            style={styles.removeImageButton}>
            <Text style={styles.removeImageText}>✕</Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
      <CalendarModal
        visible={showCalendar}
        onClose={() => setShowCalendar(false)}
        onSelectDate={handleDateSelect}
        selectedDate={date ? date.split('.').reverse().join('-') : ''}
      />
      <View style={{height: 100}} />
    </ScrollView>
  );
};

export default CreateMood;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#100E1B',
    padding: 20,
    paddingTop: 50,
  },
  backButton: {
    marginVertical: 20,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#231D37',
    color: '#FFFFFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  dateLabel: {
    color: '#fff',
    marginBottom: 5,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  moodLabel: {
    color: '#fff',
    marginTop: 20,
    marginBottom: 5,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  slider: {
    width: '100%',
    height: 60,
    marginTop: 20,
    marginBottom: 20,
  },
  moodText: {
    color: '#fff',
    textAlign: 'center',
    marginVertical: 10,
  },
  imageButton: {
    backgroundColor: '#1A1A1A',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  imageButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  imageContainer: {
    position: 'relative',
    marginVertical: 10,
  },
  selectedImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  removeImageButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeImageText: {
    color: '#fff',
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#00FF7F',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: '10%',
  },
  saveButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dateText: {
    color: '#fff',
    fontSize: 16,
  },
  calendarIcon: {
    fontSize: 20,
  },
  dateInput: {
    backgroundColor: '#231D37',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    gap: 20,
  },
});
