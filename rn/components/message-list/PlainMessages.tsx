import React from 'react';
import { View, Image } from 'react-native';
import { ListItem, Text } from 'react-native-elements';
import { getEnvVariables } from 'env';
import { Message } from 'common';

interface PlainMessageProps {
  messages: Message[];
}

export const PlainMessages = ({ messages }: PlainMessageProps) => {
  return (
    <>
      {messages.map(({ id, author, text }) => (
        <ListItem key={id}>
          <Image
            source={{
              uri: getEnvVariables().emptyAvatar,
              cache: 'default',
            }}
          />
          <View>
            <Text>{author}</Text>
            <Text >
              {text}
            </Text>
          </View>
        </ListItem>
      ))}
    </>
  );
};
