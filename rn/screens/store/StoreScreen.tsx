import React from 'react';
import { Card, H3 } from 'native-base';
import { FlatList, TouchableOpacity } from 'react-native';
import { StoreScreenProps, Screens } from 'navigation';

type CardItem = {
  id: number;
  title: string;
  screen: Screens;
};

const menu: CardItem[] = [
  { id: 1, title: 'Manage rentals', screen: 'My Rentals' },
  { id: 2, title: 'Post rental', screen: 'Post Rental' },
];

export const StoreScreen = ({ navigation }: StoreScreenProps): JSX.Element => {
  
 const handleSelect = (screen: Screens): void => navigation.navigate(screen);

  const renderItem = ({ item }: { item: CardItem }) => (
    <TouchableOpacity onPress={() => handleSelect(item.screen)}>
      <Card
        style={{
          width: 180,
          height: 100,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <H3> {item.title} </H3>
      </Card>
    </TouchableOpacity>
  );

  return (
    <FlatList
      contentContainerStyle={{ alignItems: 'center', margin: 10 }}
      numColumns={2}
      data={menu}
      renderItem={renderItem}
    />
  );
};
