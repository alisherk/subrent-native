import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';

export const Spinner = (): JSX.Element => {
  return (
    <View style={{ alignItems: 'center' }}>
      <Text> Spinning </Text>
    </View>
  );
};
