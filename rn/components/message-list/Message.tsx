import React from 'react';
import { ListItem, Text, Left, Body, Thumbnail } from 'native-base';
import { getEnvVariables } from 'env';

interface MessageProps {
  author: string;
  text: string;
}

export const Message = ({ author, text }: MessageProps) => {
  return (
    <ListItem thumbnail>
      <Left>
        <Thumbnail square source={{ uri: getEnvVariables().emptyAvatar }} />
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
