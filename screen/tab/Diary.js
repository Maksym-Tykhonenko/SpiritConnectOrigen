import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import {usePracticeContext} from '../../store/context';
import LinearGradient from 'react-native-linear-gradient';
import {Image} from 'react-native';
import LayoutTab from '../../components/layout/LayoutTab';

const Diary = ({navigation}) => {
  const {moodNotes, deleteMoodNote} = usePracticeContext();
  console.log(moodNotes);

  // Function to format the date to "D Month"
  const formatDate = dateString => {
    const [day, month] = dateString.split('.'); // Split the date string
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    return `${parseInt(day)} ${monthNames[parseInt(month) - 1]}`; // Format to "D Month"
  };

  return (
    <LayoutTab>
      <View style={styles.container}>
        <Text style={styles.title}>Mood tracker</Text>
        {moodNotes.length === 0 ? (
          <View style={styles.placeholderContainer}>
            <Image
              source={require('../../assets/images/icons/sadMood.png')}
              style={styles.icon}
            />
            <Text style={styles.message}>
              There aren’t any mood notes yet, please add something
            </Text>
          </View>
        ) : (
          <ScrollView style={styles.scrollView}>
            {moodNotes.map((note, index) => (
              <TouchableOpacity
                key={index}
                style={styles.card}
                onPress={() =>
                  navigation.navigate('MoodState', {
                    item: note,
                  })
                }>
                <Text style={styles.cardDate}>{formatDate(note.date)}</Text>
                <View style={styles.cardHeadingContainer}>
                  <Text style={styles.cardHeading}>{note.heading}</Text>
                  <Text style={styles.cardDescription}>{note.description}</Text>

                  <View style={styles.gradientContainer}>
                    <LinearGradient
                      colors={['#E50FE4', '#3493FC']}
                      start={{x: 0, y: 0}}
                      end={{x: 1, y: 0}}
                      style={[
                        styles.gradient,
                        {width: `${note.moodLevel * 100}%`},
                      ]}
                    />
                  </View>
                  <View style={styles.moodTextContainer}>
                    <Text style={styles.moodText}>Sadness</Text>
                    <Text style={styles.moodText}>Happiness</Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => deleteMoodNote(note.date)}
                  style={styles.deleteButton}>
                  <Image
                    source={require('../../assets/images/icons/mdi_delete.png')}
                  />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('CreateMood')}>
          <Text style={styles.addButtonText}>Add a mood note</Text>
        </TouchableOpacity>
        <View style={{height: 110}} />
      </View>
    </LayoutTab>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    borderRadius: 10,
    // padding: 10,
    backgroundColor: '#393158',
    height: 20,
    marginVertical: 6,
  },
  cardHeadingContainer: {
    // flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
    backgroundColor: 'red',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#231D37',
  },
  container: {
    flex: 1,
    // backgroundColor: '#100E1B',
    padding: 10,
    paddingTop: 100,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 100,
    height: 110,
    marginBottom: 20,
  },
  message: {
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  scrollView: {
    flex: 1,
    paddingTop: 30,
  },
  card: {
    // backgroundColor: '#231D37',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    position: 'relative',
    // backgroundColor:'white'
  },
  cardDate: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    // top: -50,
    // left: -15,
  },
  cardHeading: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 6,
    fontWeight: 'bold',
  },
  cardDescription: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 10,
  },
  gradient: {
    height: 20,
    borderRadius: 5,
    marginBottom: 5,
    // backgroundColor: 'white',
    // width: 400,
  },
  moodTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  moodText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  deleteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  deleteIcon: {
    width: 30,
    height: 40,
    // top: -40,
    // right: -15,
  },
  addButton: {
    backgroundColor: '#00FF7F',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  addButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Diary;
