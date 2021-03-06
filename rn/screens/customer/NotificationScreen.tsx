import React from 'react';
import { View } from 'react-native';
import { ListItem, Text } from 'react-native-elements';
import { NotificationsScreenNavigationProp } from 'navigation';

interface Props {
  navigation: NotificationsScreenNavigationProp;
  route: NotificationsScreenNavigationProp;
};

export const NotificationScreen = ({ route, navigation }: Props) => {
  return (
    <View>
      <ListItem>
        <Text>Simon Mignolet</Text>
      </ListItem>
      <ListItem>
        <Text>Nathaniel Clyne</Text>
      </ListItem>
      <ListItem>
        <Text>Dejan Lovren</Text>
      </ListItem>
    </View>
  );
};

