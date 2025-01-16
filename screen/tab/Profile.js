import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Switch,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchImageLibrary} from 'react-native-image-picker';
import {usePracticeContext} from '../../store/context';
import {
  pauseBackgroundMusic,
  playBackgroundMusic,
} from '../../components/Music/SoundConfig';
import LayoutTab from '../../components/layout/LayoutTab';

const Profile = () => {
  const {isMusicEnable, setIsMusicEnable} = usePracticeContext();
  const [userData, setUserData] = useState({
    name: '',
    about: '',
    notifications: false,
    profileImage: null,
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const savedData = await AsyncStorage.getItem('userData');
      if (savedData) {
        setUserData(JSON.parse(savedData));
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const saveUserData = async () => {
    try {
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  const handleImagePick = async () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    try {
      const result = await launchImageLibrary(options);
      if (result.assets && result.assets[0]) {
        setUserData(prev => ({
          ...prev,
          profileImage: result.assets[0].uri,
        }));
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  const handleMusicToggle = async value => {
    setIsMusicEnable(value);
    if (value) {
      await playBackgroundMusic();
    } else {
      pauseBackgroundMusic();
    }
  };
  const renderViewMode = () => (
    <LayoutTab>
      <View style={styles.container}>
        <View style={styles.profileSection}>
          <TouchableOpacity
            style={styles.profileImage}
            onPress={handleImagePick}>
            {userData.profileImage ? (
              <Image
                source={{uri: userData.profileImage}}
                style={styles.profileImageContent}
              />
            ) : (
              <Text style={styles.profileIcon}>👤</Text>
            )}
          </TouchableOpacity>
          <Text style={styles.userName}>
            {userData.name || 'Add your name'}
          </Text>
          <Text style={styles.userAbout}>
            {userData.about || 'Add something about yourself'}
          </Text>
        </View>

        <View style={styles.settingsSection}>
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Background Sound</Text>
            <Switch
              // value={userData.notifications}
              // onValueChange={value =>
              //   setUserData(prev => ({...prev, notifications: value}))
              // }
              value={isMusicEnable}
              onValueChange={handleMusicToggle}
              trackColor={{false: '#333', true: '#00FF7F'}}
              thumbColor={'#fff'}
            />
          </View>
        </View>

        <TouchableOpacity
          style={styles.editButton}
          onPress={() => setIsEditing(true)}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
    </LayoutTab>
  );

  const renderEditMode = () => (
    <LayoutTab>
      <ScrollView style={styles.container}>
        <View style={styles.imageContainer}>
          <TouchableOpacity
            style={styles.profileImage}
            onPress={handleImagePick}>
            {userData.profileImage ? (
              <Image
                source={{uri: userData.profileImage}}
                style={styles.profileImageContent}
              />
            ) : (
              <Text style={styles.profileIcon}>👤</Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.label}>Your name</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={userData.name}
              onChangeText={text =>
                setUserData(prev => ({...prev, name: text}))
              }
              placeholder="Enter your name"
              placeholderTextColor="#666"
            />
          </View>

          <Text style={styles.label}>About you</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={userData.about}
              onChangeText={text =>
                setUserData(prev => ({...prev, about: text}))
              }
              placeholder="Tell something about yourself"
              placeholderTextColor="#666"
              multiline
            />
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={saveUserData}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => setIsEditing(false)}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LayoutTab>
  );

  return isEditing ? renderEditMode() : renderViewMode();
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#100E1B',
    paddingTop: 50,
    paddingHorizontal: 10,
  },
  profileSection: {
    alignItems: 'center',
    marginVertical: 20,
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#231D37',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    overflow: 'hidden',
  },
  profileImageContent: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  profileIcon: {
    fontSize: 50,
    color: '#666',
  },
  userName: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  userAbout: {
    color: '#666',
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  settingsSection: {
    marginBottom: 30,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#231D37',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  settingLabel: {
    color: '#fff',
    fontSize: 16,
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
  // Edit mode styles
  formContainer: {
    marginTop: 20,
  },
  label: {
    color: '#fff',
    marginBottom: 8,
    fontSize: 16,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#231D37',
    color: '#fff',
    padding: 15,
    borderRadius: 12,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: '#00FF7F',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  saveButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#FF0000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Profile;
