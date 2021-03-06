import React from 'react';
import { StackHeaderProps } from '@react-navigation/stack';
import { Header, Text } from 'react-native-elements';

export const SimpleHeader = ({ scene }: StackHeaderProps) => {
  return (
    <Header>
      <Text> {scene.route.name} </Text>
    </Header>
  );
};
