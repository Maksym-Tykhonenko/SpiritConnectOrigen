import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const MoodState = ({navigation, route}) => {
  const {item} = route.params; // Get the mood data from navigation params
  console.log(item);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>{' < '}Back</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container}>
        {/* Title */}
        <Text style={styles.title}>{item.heading}</Text>

        {/* Image Container */}
        {item.image && (
          <View style={styles.imageContainer}>
            <Image source={{uri: item.image}} style={styles.image} />
          </View>
        )}

        {/* Date */}
        <View style={styles.dateContainer}>
          <Image
            source={require('../../assets/images/icons/calendar.png')}
            style={styles.calendarIcon}
          />
          <Text style={styles.dateText}>{item.date}</Text>
        </View>

        {/* Description */}
        <Text style={styles.description}>{item.description}</Text>

        {/* Mood Section */}
        <View style={styles.moodSection}>
          <Text style={styles.moodLabel}>Mood</Text>
          <View style={styles.gradientContainer}>
            <LinearGradient
              colors={['#E50FE4', '#3493FC']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={[styles.gradient, {width: `${item.mood * 100}%`}]}
            />
          </View>
        </View>

        {/* Action Buttons */}
      </ScrollView>
      <View style={styles.actionButtons}>
        {/* <TouchableOpacity
          style={styles.editButton}
          onPress={() => {
            // Handle edit functionality
          }}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity> */}
        {/* <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => {
            // Handle delete functionality
          }}>
          <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity> */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#100E1B',
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  backButton: {
    color: '#fff',
    fontSize: 18,
    marginVertical: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  imageContainer: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#231D37',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  calendarIcon: {
    width: 30,
    height: 30,
    marginRight: 8,
    tintColor: '#E50FE4',
  },
  dateText: {
    color: '#fff',
    fontSize: 16,
    
  },
  description: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 30,
  },
  moodSection: {
    marginBottom: 40,
  },
  moodLabel: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 10,
  },
  gradientContainer: {
    borderRadius: 10,
    // padding: 10,
    backgroundColor: '#393158',
    height: 20,
    marginVertical: 6,
    width: '100%',
  },
  gradient: {
    height: '100%',
  },
  gradient: {
    height: 20,
    borderRadius: 5,
    marginBottom: 5,
    // backgroundColor: 'white',
    // width: 400,
    
  },
  actionButtons: {
    marginTop: 'auto',
    gap: 10,
    marginBottom: 30,
    width: '80%',
    alignSelf: 'center',
  },
  editButton: {
    backgroundColor: '#00FF7F',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#FF0000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MoodState;
