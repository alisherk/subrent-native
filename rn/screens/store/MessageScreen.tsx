import React from 'react';
import {
  Content,
  List,
  ListItem,
  Thumbnail,
  Text,
  Left,
  Body,
  Right,
  Button,
} from 'native-base';

export const MessageScreen = (): JSX.Element => {
  return (
    <Content>
      <List>
        <ListItem thumbnail>
          <Left>
            <Thumbnail square source={{ uri: 'Image URL' }} />
          </Left>
          <Body>
            <Text>Sankhadeep</Text>
            <Text note numberOfLines={1}>
              Its time to build a difference . .
            </Text>
          </Body>
          <Right>
            <Button transparent>
              <Text>View</Text>
            </Button>
          </Right>
        </ListItem>
      </List>
    </Content>
  );
};
