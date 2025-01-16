import {StyleSheet, Text, View, ImageBackground, Image} from 'react-native';
import React from 'react';

const LayoutTab = ({children}) => {
  return (
    <ImageBackground
      style={styles.container}
      source={require('../../assets/images/ui/Spiritbg.png')}>
      {children}
    </ImageBackground>
  );
};

export default LayoutTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
