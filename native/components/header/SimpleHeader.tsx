import React from 'react';
import { StackHeaderProps } from '@react-navigation/stack';
import { Header, Body, Title } from 'native-base';

export const SimpleHeader: React.ComponentType<StackHeaderProps> = ({ scene }) => {
  return (
    <Header>
      <Body>
        <Title> {scene.route.name} </Title>
      </Body>
    </Header>
  );
};


