import {createContext, useState, useContext, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {meditation, yoga, breathing} from '../data/cards';

export const PracticeContext = createContext({
  isMusicEnable: () => {},
  setIsMusicEnable: () => {},
});

export const PracticeProvider = ({children}) => {
  const [isMusicEnable, setIsMusicEnable] = useState(true);
  const [practices, setPractices] = useState({
    meditation: [],
    yoga: [],
    breathing: [],
  });
  const [moodNotes, setMoodNotes] = useState([]);
  console.log(practices.meditation.length, 'context');

  const initializeData = async () => {
    try {
      // Try to get saved practices
      const savedMeditation = await AsyncStorage.getItem('meditation');
      const savedYoga = await AsyncStorage.getItem('yoga');
      const savedBreathing = await AsyncStorage.getItem('breathing');

      // If no saved data, use initial data from cards.js
      // For static images, we store the require path
      if (!savedMeditation) {
        const initialMeditation = meditation.map(item => ({
          ...item,
          // If image is a number (from require), keep it as is
          image: typeof item.image === 'number' ? item.image : null,
        }));
        await AsyncStorage.setItem(
          'meditation',
          JSON.stringify(initialMeditation),
        );
        practices.meditation = initialMeditation;
      }

      if (!savedYoga) {
        const initialYoga = yoga.map(item => ({
          ...item,
          image: typeof item.image === 'number' ? item.image : null,
        }));
        await AsyncStorage.setItem('yoga', JSON.stringify(initialYoga));
        practices.yoga = initialYoga;
      }

      if (!savedBreathing) {
        const initialBreathing = breathing.map(item => ({
          ...item,
          image: typeof item.image === 'number' ? item.image : null,
        }));
        await AsyncStorage.setItem(
          'breathing',
          JSON.stringify(initialBreathing),
        );
        practices.breathing = initialBreathing;
      }

      // Set the practices state
      setPractices({
        meditation: savedMeditation
          ? JSON.parse(savedMeditation)
          : practices.meditation,
        yoga: savedYoga ? JSON.parse(savedYoga) : practices.yoga,
        breathing: savedBreathing
          ? JSON.parse(savedBreathing)
          : practices.breathing,
      });
    } catch (error) {
      console.error('Error initializing data:', error);
    }
  };

  const addPractice = async newPractice => {
    try {
      const practiceType = newPractice.type;

      // For new practices with picked images, we'll need to handle them differently
      // since they can't use require() dynamically
      const practiceToSave = {
        ...newPractice,
        // Store the URI for picked images
        image: newPractice.image,
      };

      const updatedPractices = {
        ...practices,
        [practiceType]: [...practices[practiceType], practiceToSave],
      };

      await AsyncStorage.setItem(
        practiceType,
        JSON.stringify(updatedPractices[practiceType]),
      );
      setPractices(updatedPractices);
    } catch (error) {
      console.error('Error adding practice:', error);
    }
  };

  const addMoodNote = async newMoodNote => {
    try {
      const updatedMoodNotes = [...moodNotes, newMoodNote];
      await AsyncStorage.setItem('moodNotes', JSON.stringify(updatedMoodNotes));
      setMoodNotes(updatedMoodNotes);
    } catch (error) {
      console.error('Error adding mood note:', error);
    }
  };

  const initializeMoodNotes = async () => {
    try {
      const savedMoodNotes = await AsyncStorage.getItem('moodNotes');
      if (savedMoodNotes) {
        setMoodNotes(JSON.parse(savedMoodNotes));
      }
    } catch (error) {
      console.error('Error initializing mood notes:', error);
    }
  };

  const deleteMoodNote = async date => {
    try {
      const updatedMoodNotes = moodNotes.filter(note => note.date !== date);
      await AsyncStorage.setItem('moodNotes', JSON.stringify(updatedMoodNotes));
      setMoodNotes(updatedMoodNotes);
    } catch (error) {
      console.error('Error deleting mood note:', error);
    }
  };

  useEffect(() => {
    initializeData();
    initializeMoodNotes();
  }, []);

  const togglePracticeCompletion = async (type, id) => {
    try {
      const updatedPractices = {
        ...practices,
        [type]: practices[type].map(practice =>
          practice.id === id
            ? {...practice, isCompleted: !practice.isCompleted}
            : practice,
        ),
      };
      await AsyncStorage.setItem(type, JSON.stringify(updatedPractices[type]));
      setPractices(updatedPractices);
    } catch (error) {
      console.error('Error updating practice:', error);
    }
  };

  const completePractice = async (type, id) => {
    try {
      const updatedPractices = {
        ...practices,
        [type]: practices[type].map(practice =>
          practice.id === id ? {...practice, isCompleted: true} : practice,
        ),
      };
      await AsyncStorage.setItem(type, JSON.stringify(updatedPractices[type]));
      setPractices(updatedPractices);
    } catch (error) {
      console.error('Error completing practice:', error);
    }
  };

  return (
    <PracticeContext.Provider
      value={{
        practices,
        togglePracticeCompletion,
        completePractice,
        addMoodNote,
        moodNotes,
        deleteMoodNote,
        addPractice,
        isMusicEnable,
        setIsMusicEnable,
      }}>
      {children}
    </PracticeContext.Provider>
  );
};

export const usePracticeContext = () => useContext(PracticeContext);
