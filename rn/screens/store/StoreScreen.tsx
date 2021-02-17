import React from 'react';
import { Card, H3 } from 'native-base';
import { FlatList } from 'react-native';
import { Touchable } from '../../components/touchable';
import { StoreScreenProps } from '../../navigation';

type Screen = 'My Rentals' | 'Post Rental';

type CardItem = {
  id: number;
  title: string;
  screen: Screen;
};

const menu: CardItem[] = [
  { id: 1, title: 'Manage rentals', screen: 'My Rentals' },
  { id: 2, title: 'Post rental', screen: 'Post Rental' },
];

export const StoreScreen = ({ navigation }: StoreScreenProps): JSX.Element => {
  const handleSelect = (screen: Screen): void => navigation.navigate(screen);

  const renderItem = ({ item }: { item: CardItem }) => (
    <Touchable onPress={() => handleSelect(item.screen)}>
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
    </Touchable>
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
