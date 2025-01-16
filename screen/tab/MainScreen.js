import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {usePracticeContext} from '../../store/context';
import {meditation, yoga, breathing} from '../../data/cards'; // Import static data
import LayoutTab from '../../components/layout/LayoutTab';

const PracticeCard = ({item, type, onToggleComplete, navigation}) => {
  // Find the matching static card to get the correct image
  const getStaticImage = (id, type) => {
    let staticData;
    switch (type) {
      case 'meditation':
        staticData = meditation;
        break;
      case 'yoga':
        staticData = yoga;
        break;
      case 'breathing':
        staticData = breathing;
        break;
      default:
        return null;
    }
    const staticCard = staticData.find(card => card.id === id);
    return staticCard ? staticCard.image : null;
  };

  const renderImage = item => {
    // First try to get static image
    const staticImage = getStaticImage(item.id, type);
    if (staticImage) {
      return staticImage; // This will be the require() number
    }

    // If no static image, handle user-added practice images
    if (typeof item.image === 'string' && item.image.startsWith('file://')) {
      return {uri: item.image};
    }

    return null;
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate('PracticeDetail', {item, practiceType: type})
      }>
      <Image
        source={renderImage(item)}
        style={styles.cardImage}
        // defaultSource={require('../../assets/images/placeholder.png')} // Add a placeholder image
      />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Text style={styles.cardDescription} numberOfLines={1}>
          {item.text}
        </Text>
      </View>
      <TouchableOpacity
        disabled
        style={styles.checkButton}
        onPress={() => onToggleComplete(type, item.id)}>
        <View
          style={[
            styles.checkCircle,
            item.isCompleted && styles.checkCircleCompleted,
          ]}>
          {item.isCompleted && <Text style={styles.checkMark}>✓</Text>}
        </View>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};
const SectionHeader = ({title, onPress}) => (
  <TouchableOpacity style={styles.sectionHeader} onPress={onPress}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <Text style={styles.sectionArrow}>{'>'}</Text>
  </TouchableOpacity>
);

const MainScreen = ({navigation}) => {
  const {practices, togglePracticeCompletion} = usePracticeContext();
  console.log(
    practices.meditation.map(item => item.image),
    'screen',
  );

  const handleSectionPress = (type, title) => {
    console.log(type, 'type');
    navigation.navigate('PracticeScreen', {
      practiceType: type,
      practices: practices[type],
      title: title,
    });
  };

  return (
    <LayoutTab>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Spirit Yoga</Text>
          <TouchableOpacity style={styles.notificationButton} disabled>
            <LinearGradient
              colors={['#8B5CF6', '#EC4899']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              style={styles.notificationGradient}>
              {/* <Text style={styles.notificationIcon}>🔔</Text> */}
              <Image source={require('../../assets/images/icons/bell.png')} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <SectionHeader
          title="Meditations"
          onPress={() => handleSectionPress('meditation', 'Meditations')}
        />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.cardsContainer}>
          {practices.meditation.map(item => (
            <PracticeCard
              key={item.id}
              item={item}
              type="meditation"
              onToggleComplete={togglePracticeCompletion}
              navigation={navigation}
            />
          ))}
        </ScrollView>

        <SectionHeader
          title="Yoga"
          onPress={() => handleSectionPress('yoga', 'Yoga')}
        />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.cardsContainer}>
          {practices.yoga.map(item => (
            <PracticeCard
              key={item.id}
              item={item}
              type="yoga"
              onToggleComplete={togglePracticeCompletion}
              navigation={navigation}
            />
          ))}
        </ScrollView>

        <SectionHeader
          title="Breath practice"
          onPress={() => handleSectionPress('breathing', 'Breath Practice')}
        />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.cardsContainer}>
          {practices.breathing.map(item => (
            <PracticeCard
              key={item.id}
              item={item}
              type="breathing"
              onToggleComplete={togglePracticeCompletion}
              navigation={navigation}
            />
          ))}
        </ScrollView>
        <View style={{height: 120}} />
      </ScrollView>
    </LayoutTab>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#100E1B',
    padding: 20,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  notificationGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationIcon: {
    fontSize: 20,
  },
  createButton: {
    backgroundColor: '#00FF7F',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 30,
  },
  createButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
    gap: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  sectionArrow: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  cardsContainer: {
    marginBottom: 30,
  },
  card: {
    width: 280,
    height: 180,
    marginRight: 15,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  cardContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 15,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  cardTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardDescription: {
    color: '#ccc',
    fontSize: 14,
  },
  checkButton: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkCircleCompleted: {
    backgroundColor: '#00FF7F',
    borderColor: '#00FF7F',
  },
  checkMark: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
