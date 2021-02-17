import React from 'react';
import { useDispatch } from 'react-redux';
import { FlatList } from 'react-native';
import { firebase } from 'gateway';
import { usePaginateQuery } from 'hooks';
import { populateRental } from 'redux/actions';
import { Rental } from 'types';
import { CategoryScreenProps } from 'navigation';
import { Card } from 'components/card';

export const CategoryScreen = ({
  route,
  navigation,
}: CategoryScreenProps): JSX.Element => {

  const dispatch = useDispatch();
  const {
    rentals,
    hasMore,
    loadMore,
    resetLoad,
    reloading,
  } = usePaginateQuery(
    firebase.db.collection('rentals').where('category', '==', route.params.category)
  );

  const handleSelect = (item: Rental): void => {
    dispatch(populateRental(item));
    navigation.navigate('Rental');
  };

  const handleLoadMore = (): void => {    
    if (hasMore) loadMore();
  };

  const renderItem = ({ item }: { item: Rental }) => (
    <Card {...item} btnName='View' onSelect={() => handleSelect(item)} />
  );

  return (
    <FlatList
      refreshing={reloading}
      onRefresh={resetLoad}
      data={rentals}
      renderItem={renderItem}
      onEndReachedThreshold={0.2}
      onEndReached={handleLoadMore}
      initialNumToRender={2}
    />
  );
};
