import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';

const NoItems = () => {
  return (
    <View style={styles.placeholderContainer}>
      <Image
        source={require('../../assets/images/icons/sadMood.png')}
        style={styles.icon}
      />
      <Text style={styles.message}>
        There aren’t any mood notes yet, please add something
      </Text>
    </View>
  );
};

export default NoItems;

const styles = StyleSheet.create({
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 140,
    height: 155,
    marginBottom: 20,
  },
  message: {
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
});
