import React from 'react';
import { Card, Text } from 'react-native-elements';
import { FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { StoreScreenProps, Screens } from 'navigation';

type CardItem = {
  id: number;
  title: string;
  screen: Screens;
};

const menu: CardItem[] = [
  { id: 1, title: 'Manage rentals', screen: 'My Rentals' },
  { id: 2, title: 'Post rental', screen: 'Post Rental' },
  { id: 3, title: 'Messages', screen: 'Messages' },
];

export const StoreScreen = ({ navigation }: StoreScreenProps): JSX.Element => {
  const handleSelect = (screen: Screens): void => navigation.navigate(screen);

  const renderItem = ({ item }: { item: CardItem }) => (
    <TouchableOpacity onPress={() => handleSelect(item.screen)}>
      <Card>
        <Text> {item.title} </Text>
      </Card>
    </TouchableOpacity>
  );

  return (
    <FlatList
      contentContainerStyle={styles.contentContainer}
      numColumns={2}
      data={menu}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  contentContainer: { alignItems: 'center', margin: 10 },
  card: {
    width: 180,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
