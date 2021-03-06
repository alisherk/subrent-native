import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { FlatList } from 'react-native';
import { firebase } from 'gateway';
import { usePaginateQuery } from 'hooks';
import { populateRental } from 'redux/actions';
import { Rental } from 'common';
import { CategoryScreenProps } from 'navigation';
import { Card } from 'components/card';

export const CategoryScreen = ({
  route,
  navigation,
}: CategoryScreenProps): JSX.Element => {
  const queryRef = useRef(
    firebase.db
      .collection('rentals')
      .where('category', '==', route.params.category)
  );
  const dispatch = useDispatch();
  const { rentals, hasMore, loadMore, resetLoad, reloading } = usePaginateQuery(
    queryRef.current
  );

  const handleSelect = (item: Rental): void => {
    dispatch(populateRental(item));
    navigation.navigate('Rental');
  };

  const renderItem = ({ item }: { item: Rental }) => (
    <Card {...item} btnName='View' onSelect={() => handleSelect(item)} />
  );

  const handleLoadMore = (): void => {
    if (hasMore) loadMore();
  };

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
