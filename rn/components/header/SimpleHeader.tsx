import React from 'react';
import { StackHeaderProps } from '@react-navigation/stack';
import { Header, Body, Title } from 'native-base';

export const SimpleHeader = ({ scene }: StackHeaderProps) => {
  return (
    <Header>
      <Body>
        <Title> {scene.route.name} </Title>
      </Body>
    </Header>
  );
};
