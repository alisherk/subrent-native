import React from 'react';
import { List, ListItem, Text } from 'native-base';
import { NotificationsScreenNavigationProp } from 'navigation';

interface Props {
  navigation: NotificationsScreenNavigationProp;
  route: NotificationsScreenNavigationProp;
};

export const NotificationScreen = ({ route, navigation }: Props) => {
  return (
    <List>
      <ListItem>
        <Text>Simon Mignolet</Text>
      </ListItem>
      <ListItem>
        <Text>Nathaniel Clyne</Text>
      </ListItem>
      <ListItem>
        <Text>Dejan Lovren</Text>
      </ListItem>
    </List>
  );
};

