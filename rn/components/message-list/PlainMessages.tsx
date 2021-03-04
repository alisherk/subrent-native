import React from 'react';
import { ListItem, Text, Left, Body, Thumbnail } from 'native-base';
import { getEnvVariables } from 'env';
import { Message } from 'common';

interface PlainMessageProps {
  messages: Message[];
}

export const PlainMessages = ({ messages }: PlainMessageProps) => {
  return (
    <>
      {messages.map(({ id, author, text }) => (
        <ListItem key={id} thumbnail>
          <Left>
            <Thumbnail
              square
              source={{
                uri: getEnvVariables().emptyAvatar,
                cache: 'default',
              }}
            />
          </Left>
          <Body>
            <Text>{author}</Text>
            <Text note numberOfLines={1}>
              {text}
            </Text>
          </Body>
        </ListItem>
      ))}
    </>
  );
};
