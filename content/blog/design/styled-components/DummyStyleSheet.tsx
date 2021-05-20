import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Dummy = () => {
  return (
    <View style={[styles.container, styles.rounded]}>
      <Text>Hello World</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: 'black',
    borderStyle: 'solid',
  },
  rounded: {
    borderRadius: 10,
  },
});

export default Dummy;
