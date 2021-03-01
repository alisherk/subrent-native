import React from 'react';
import { ListItem, Text, Left, Body, Thumbnail } from 'native-base';
import { getEnvVariables } from 'env';

interface MessageItemProps {
  author: string;
  text: string;
}

export const MessageItem = ({ author, text }: MessageItemProps) => {
  return (
    <ListItem thumbnail>
      <Left>
        <Thumbnail square source={{ uri: getEnvVariables().emptyAvatar, cache: 'only-if-cached' }} />
      </Left>
      <Body>
        <Text>{author}</Text>
        <Text note numberOfLines={1}>
          {text}
        </Text>
      </Body>
    </ListItem>
  );
};
