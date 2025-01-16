import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React from 'react';
import {usePracticeContext} from '../../store/context';
import LayoutTab from '../../components/layout/LayoutTab';

const PracticeItem = ({item, type, onToggleComplete, navigation}) => {
  const renderImage = imageSource => {
    if (typeof imageSource === 'number') {
      // Handle static images (from require)
      return imageSource;
    } else if (
      typeof imageSource === 'string' &&
      imageSource.startsWith('file://')
    ) {
      // Handle local file URLs
      return {uri: imageSource};
    }
    return null; // Return null or a default image source
  };

  return (
    <TouchableOpacity
      style={styles.practiceItem}
      onPress={() =>
        navigation.navigate('PracticeDetail', {item, practiceType: type})
      }>
      <Image source={renderImage(item.image)} style={styles.practiceImage} />
      <View style={styles.practiceContent}>
        <Text style={styles.practiceTitle}>{item.name}</Text>
        <Text style={styles.practiceDescription} numberOfLines={2}>
          {item.text}
        </Text>
      </View>
      <TouchableOpacity
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

const PracticeScreen = ({route, navigation}) => {
  const {practiceType, title} = route.params;
  const {practices, togglePracticeCompletion} = usePracticeContext();

  return (
    <LayoutTab>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{title}</Text>
        </View>

        <ScrollView
          style={styles.practiceList}
          showsVerticalScrollIndicator={false}>
          {practices[practiceType].map(item => (
            <PracticeItem
              key={item.id}
              item={item}
              type={practiceType}
              onToggleComplete={togglePracticeCompletion}
              navigation={navigation}
            />
          ))}
        </ScrollView>
      </View>
    </LayoutTab>
  );
};

export default PracticeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#100E1B',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  backButton: {
    // marginBottom: 15,
    marginVertical: 20,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
  practiceList: {
    paddingHorizontal: 20,
  },
  practiceItem: {
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#1A1A1A',
  },
  practiceImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  practiceContent: {
    padding: 15,
  },
  practiceTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  practiceDescription: {
    color: '#999',
    fontSize: 14,
    lineHeight: 20,
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
    backgroundColor: 'transparent',
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
