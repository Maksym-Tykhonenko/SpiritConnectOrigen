import React, { useRef } from 'react';
import { View, PanResponder, StyleSheet, Text } from 'react-native';

const CustomSlider = ({ value, onValueChange, minimumValue, maximumValue }) => {
  const sliderWidth = 300; // Set your desired slider width
  const thumbSize = 40; // Size of the thumb

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        const newValue = Math.min(
          Math.max(minimumValue, (gestureState.moveX / sliderWidth) * maximumValue),
          maximumValue
        );
        onValueChange(newValue);
      },
    })
  ).current;

  return (
    <View style={styles.container}>
      <View style={styles.track}>
        <View
          style={[
            styles.thumb,
            {
              left: (value / maximumValue) * (sliderWidth - thumbSize),
            },
          ]}
          {...panResponder.panHandlers}
        />
      </View>
      <Text style={styles.valueText}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  track: {
    width: 300,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 5,
    position: 'relative',
    marginVertical: 20,
  },
  thumb: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#8B5CF6',
  },
  valueText: {
    color: '#fff',
    marginTop: 10,
  },
});

export default CustomSlider;